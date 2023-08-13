const btnLogin = document.getElementById("btnLogin");
const txtuser = document.getElementById("txtemail");
const senha = document.getElementById("txtsenha");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtTelefone = document.getElementById("txtTelefone");
const txtCep = document.getElementById("txtCep");
const txtNumero = document.getElementById("txtNumero");
const txtLogradouro = document.getElementById("txtLogradouro");
const txtComplemento = document.getElementById("txtComplemento");
const txtPassword = document.getElementById("txtPasswd");
const txtDescricao = document.getElementById("txtDescricao");
const btnEditar = document.getElementById("btnEditar");
const txtbuscar = document.getElementById("txtBuscar");
const btnbuscar = document.getElementById("btnBuscar");
let autenticado;
let token;
let key = "";

btnLogin.onclick = () => {
  if (txtuser.value.trim() == "" || senha.value.trim() == "") {
    return alert(`Todos os campos devem ser preenchidos`);
  } else {
    fetch("http://127.0.0.1:5062/store/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: txtuser.value,
        senha: senha.value,
      }),
    })
      .then((response) => response.json())
      .then((dado) => {
        if (dado.output == "Authenticated") {
          autenticado = true;
          id = dado.id;
          token = dado.token;
          txtuser.value = "";
          senha.value = "";
          window.location.replace(`area-exclusiva.html?pag=${id}key+${token}`);
          // window.location.replace(`area-exclusiva.html?key+${token}`);
        } else {
          txtuser.value = "";
          senha.value = "";
          return alert(`Usuário ou senha incorretos`);
        }
      })
      .catch((error) => {
        console.error(`Não foi possível requisitar a API -> ${error}`);
      });
  }
};

document.getElementById("login").onclick = () => {
  document.getElementById("shadow").style.zIndex = "200";
  document.getElementById("shadow").style.opacity = "1";
};

document.getElementById("fechar").onclick = () => {
  document.getElementById("shadow").style.zIndex = "-100";
  document.getElementById("shadow").style.opacity = "0";
};

function carregarDados() {
  key = window.location.search.substring(5, window.location.search.length);
  const estrutura = document.getElementById("estrutura");

  let url1 = `http://127.0.0.1:5062/store/list`;
  let url2 = `http://127.0.0.1:5062/store/listbyname/${key}`;
  let url = "";
  if (key == "" || key == null || !key) {
    url = url1;
  } else {
    url = url2;
  }

  estrutura.innerHTML = "";

  fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      result.data.map((item, index) => {
        let divList = document.createElement("div");
        divList.style.height = "150px";
        divList.setAttribute("class", "card m-3");
        divList.innerHTML = `
                <a href="lojas.html?pag=${item.idloja}" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${item.foto}" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body ">
                            <h5 class="card-title">${item.nome}</h5>
                            <p class="card-text">${item.descricao}</p>
                        </div>
                    </div>
                </div>
            </a>
                `;
        estrutura.appendChild(divList);
      });
    })
    .catch((error) => console.log(`Erro ao executar API -> ${error}`));
}

btnbuscar.onclick = () => {
  window.location.replace(`listar.html?pag=${txtbuscar.value}`);
};

function carregarCategoria() {
  key = window.location.search.substring(5, window.location.search.length);

  const estrutura = document.getElementById("estrutura");

  fetch("http://127.0.0.1:5062/store/listbycategory/" + key, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      result.data.map((item, index) => {
        let divList = document.createElement("div");
        divList.style.height = "150px";
        divList.setAttribute("class", "card m-3");
        divList.innerHTML = `
            <a href="lojas.html?pag=${item.idloja}" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${item.foto}" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.nome}</h5>
                            <p class="card-text">${item.descricao}</p>
                        </div>
                    </div>
                </div>
            </a>
            `;
        estrutura.appendChild(divList);
      });
    })
    .catch((error) => console.log(`Erro ao executar API -> ${error}`));
}

function infoLojas() {
  key = window.location.search.substring(5, window.location.search.length);
  const estruturaLojas = document.getElementById("dadosLojas");

  fetch("http://127.0.0.1:5062/store/listbyid/" + key, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      result.data.map((item, index) => {
        let divList = document.createElement("div");
        divList.innerHTML = `
            <div class="card m-3">
                <div class="row p-2">
                    <div class="col">
                        <img src="${item.foto}" class="img-fluid rounded" style="height: 200px;width:400px;object-fit:contain" alt="...">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h5 class="card-title text-center">${item.nome}</h5>
                            <p class="card-text"><strong>Sobre a loja: </strong>${item.descricao}</p>
                            <p class="card-text"><strong>Telefone: </strong>${item.telefone} <strong>CNPJ da loja: </strong>${item.cnpj}</p>
                            <p class="card-text"><strong>Logradouro: </strong>${item.logradouro} <strong>CEP: </strong>${item.cep}</p>
                            <p class="card-text"><strong>Departamento: </strong>${item.categoria}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        estruturaLojas.appendChild(divList);
      });
    })
    .catch((error) => console.log(`Erro ao executar API -> ${error}`));
}

function infoLojaEditar() {
  const url = window.location.search;
  let params = new URLSearchParams(url);
  let id = parseInt(params.get("pag"));
  const estruturaLojas = document.getElementById("dadosLojas");

  fetch("http://127.0.0.1:5062/store/listbyid/" + id, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      result.data.map((item, index) => {
        let divList = document.createElement("div");
        divList.innerHTML = `
        <div class="card m-3">
        <div class="row p-2">
            <div class="col-md-4">
                <img src="${item.foto}" class="img-fluid rounded" style="height: 200px;width:400px;object-fit:contain" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="d-flex justify-content-around">
                        <h5 class="card-title"  >${item.nome}</h5>
                        <a href="javascript:void" id="login">
                            <i class="bi bi-pencil-square">Editar dados</i>
                        </a>
                    </div>
                    <p class="card-text"><strong>Sobre a loja: </strong>${item.descricao}</p>
                    <p class="card-text"><strong>Telefone: </strong>${item.telefone} <strong>CNPJ da loja: </strong>${item.cnpj}</p>
                    <p class="card-text"><strong>Logradouro: </strong>${item.logradouro} <strong>CEP: </strong>${item.cep}</p>
                    <p class="card-text"><strong>Departamento: </strong>${item.categoria}</p>
                  </div>
                </div>
            </div>
            </div>
            `;
        estruturaLojas.appendChild(divList);
      });
    })
    .catch((error) => console.log(`Erro ao executar API -> ${error}`));
}

// btnEditar.onclick = () => {
//   key = window.location.search.substring(5, window.location.search.length);
//   const estruturaEditar = document.getElementById("editarLojas");
//   // Pegando o id da url
//   // const url = window.location.search;
//   // let params = new URLSearchParams(url);
//   // let id = parseInt(params.get("id"));
//   // alert(id);
//   fetch(`http://127.0.0.1:5062/store/update/${id}`, {
//     method: "PUT",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       token: key,
//     },
//     body: JSON.stringify({
//       nome: txtNome.value,
//       email: txtEmail.value,
//       telefone: txtTelefone.value,
//       cep: txtCep.value,
//       numero: txtNumero.value,
//       logradouro: txtLogradouro,
//       complemento: txtComplemento,
//       senha: txtPassword.value,
//       descricao: txtDescricao.value,
//     }),
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       result.data.map(() => {
//         if ((txtPassword = "")) {
//           alert("Os dados da loja foram atualizados");
//         } else {
//           txtuser.value = "";
//           senha.value = "";
//           return alert(`Usuário ou senha incorretos`);
//         }
//       });
//     })
//     .catch((error) => console.log(`Erro ao executar API -> ${error}`));
// };
