// Inicio dos dados login
const btnLogin = document.getElementById("btnLogin");
const txtuser = document.getElementById("txtemail");
const senha = document.getElementById("txtsenha");
// Fim dos dados Login

// Inicio dos dados de editar
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
// Fim dos dados de editar

// Inicio dos dados da barra de pesquisa
const txtbuscar = document.getElementById("txtBuscar");
const btnbuscar = document.getElementById("btnBuscar");
// Fim dados da barra de pesquisa

// Inicio dos dados dos token
let autenticado;
let token;
let key = "";
// Fim dos dados dos token

// Inicio da função de login
function login() {
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
}
// Fim da função de login

// Incio abrir Shadow
function showShadow() {
  document.getElementById("shadow").style.zIndex = "200";
  document.getElementById("shadow").style.opacity = "1";
}
// fim do abrir Shadow

// Inicio do fechar shadow
function closedShadow() {
  document.getElementById("shadow").style.zIndex = "-100";
  document.getElementById("shadow").style.opacity = "0";
}
// Fechar o shadow

// Função da barra de pesquisa
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
// Fim da função da barra de pesquisa

// Inicio da função categoria
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
// Fim da função categoria

// Função carregar o id da loja
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
// Fim da função carregar o id da loja

// Função carregar o id da loja e passa os dados
function infoLojaEditar() {
  let url = window.location.search;
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
        document.getElementById("txtNome").value = item.nome;
        document.getElementById("txtNumero").value = item.numero;
        document.getElementById("txtComplemento").value = item.complemento;
        document.getElementById("txtCep").value = item.cep;
        document.getElementById("txtLogradouro").value = item.logradouro;
        document.getElementById("txtDescricao").value = item.descricao;
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
                        <a href="#" id="editar" onclick="showShadow()">
                            <i class="bi bi-pencil-square"></i>Editar dados
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
// Fim da função carregar o id da loja e passa os dados

// Execução para fazer update
function editar() {
  let url = window.location.search;
  let params = new URLSearchParams(url);
  let id = parseInt(params.get("pag"));
  if (
    txtNome == "" ||
    txtNome.value.trim() == "" ||
    txtNome == null ||
    txtPassword.value.trim() == ""
  ) {
    alert("Erro ao atulizar os dados");
  } else {
    alert("atualizou os dados");
    window.location.reload(true);
    fetch(`http://127.0.0.1:5062/store/update/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        token: key,
      },
      body: JSON.stringify({
        nome: txtNome.value,
        cep: txtCep.value,
        numero: txtNumero.value,
        logradouro: txtLogradouro.value,
        complemento: txtComplemento.value,
        senha: txtPassword.value,
        descricao: txtDescricao.value,
      }),
    }).then.catch((error) => console.log(`Erro ao executar API -> ${error}`));
  }
}
// Fim do update

// Inicialização do EmailJS
(function () {
  emailjs.init("1ry49lNnL8dQyP1It");
})();


// Início da função para enviar email
function sendEmail() {
  // Inicio dos dados de cadastro
  let txtEmpresa = document.getElementById("txtEmpresa").value;
  let txtCnpj = document.getElementById("cnpj_form").value;
  // Fim dos dados de cadastro
  if  (txtEmpresa.trim()==""||txtCnpj.trim==""){
    alert("Erro ao enviar os dados");
  }else{
  let categoria = document.getElementById("categoria_form").value;
  let name_categoria = "";
  switch (categoria) {
    case "1":
      name_categoria = "Assistência Técnica";
      break;
    case "2":
      name_categoria = "TI e Hardware";
      break;
    case "3":
      name_categoria = "Games";
      break;
    case "4":
      name_categoria = "Eletrônicos";
      break;
    case "5":
      name_categoria = "Para Casa";
      break;
    case "6":
      name_categoria = "Móveis";
      break;
    case "7":
      name_categoria = "Eletrodomésticos";
      break;
    case "8":
      name_categoria = "Moda";
      break;
    case "9":
      name_categoria = "Pets";
      break;
    case "10":
      name_categoria = "Esportes";
      break;
    case "11":
      name_categoria = "Automotivos";
      break;
    case "12":
      name_categoria = "Construção e ferramentas";
      break;
  }


  var params = {
    mensagem: document.getElementById("des_form").value,
    name: document.getElementById("name_form").value,
    empresa: txtEmpresa,
    cnpj: txtCnpj,
    telefone: document.getElementById("tel_form").value,
    categoria: name_categoria,
    email: document.getElementById("email_Form").value,
  };

  let serviceID = "service_1u4tzto";
  let templateID = "template_iumiumi";
    emailjs.send(serviceID, templateID, params).then(
      function (response) {
        console.log("E-mail enviado com sucesso!", response);
        window.location.replace("obrigado.html");
      },
      function (error) {
        console.error("Erro ao enviar o e-mail:", error);
      }
    );
    }
}
// Fim da função email

// Início da função de contato
function sendContato() {
  // Inicio dos dados de cadastro
  let  nome_contato = document.getElementById("nome_contato").value;
  let email_contato = document.getElementById("email_contato").value;
  // Fim dos dados de cadastro
  if  (nome_contato.trim()==""||email_contato.trim==""){
    alert("Erro ao enviar os dados");
  }else{
  let assunto = document.getElementById("assunto").value;
  let name_assunto = "";
  switch (assunto) {
    case "1":
      name_assunto = "SAC";
      break;
    case "2":
      name_assunto = "Feedback";
      break;
    case "3":
      name_assunto = "Administrativo";
      break;
    case "4":
      name_assunto = "RH";
      break;
    case "5":
      name_assunto = "Outro";
      break;
  }


  var params = {
    mensagem: document.getElementById("message_contato").value,
    name: nome_contato,
    assunto: name_assunto,
    email: email_contato,
  };

  let serviceID = "service_1u4tzto";
  let templateID = "template_flqohf5";
    emailjs.send(serviceID, templateID, params).then(
      function (response) {
        console.log("E-mail enviado com sucesso!", response);
        window.location.replace("obrigado.html");
      },
      function (error) {
        console.error("Erro ao enviar o e-mail:", error);
      }
    );
    }
}
// Fim da função de contato