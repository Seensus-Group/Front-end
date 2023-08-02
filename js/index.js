const btnLogin = document.getElementById("btnLogin");
const txtuser = document.getElementById("txtemail");
const senha = document.getElementById("txtsenha");
const txtbuscar = document.getElementById("txtBuscar");
const btnbuscar = document.getElementById("btnBuscar");
let autenticado;
let token;
let key;

btnLogin.onclick = () => {
    if (txtuser.value.trim() == "" || senha.value.trim() == "") {
        return alert(`Todos os campos devem ser preenchidos`)
    }
    else {
        fetch("http://127.0.0.1:5062/store/login", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: txtuser.value,
                senha: senha.value
            })
        }).then((response) => response.json()).then((dado) => {
            if (dado.output == "Authenticated") {
                autenticado = true;
                token = dado.token;
                txtuser.value = "";
                senha.value = "";
                window.location.replace(`index.html?key+${token}`);
            }
            else {
                txtuser.value = "";
                senha.value = "";
                return alert(`Usuário ou senha incorretos`);
            }
        }).catch((error) => {
            console.error(`Não foi possível requisitar a API -> ${error}`);
        });
    };
};

document.getElementById("login").onclick = () => {
    document.getElementById("shadow").style.zIndex = "200";
    document.getElementById("shadow").style.opacity = "1";
}
document.getElementById("fechar").onclick = () => {
    document.getElementById("shadow").style.zIndex = "-100";
    document.getElementById("shadow").style.opacity = "0";
}


btnbuscar.onclick = () => {
    const searchTerm = txtbuscar.value.trim();

    if (searchTerm === "") {
        alert("Digite algo para fazer a pesquisa.");
        return;
    }
    realizarPesquisa(searchTerm);
};


function realizarPesquisa(termo) {
    console.log("Realizando pesquisa com o termo:", termo);
    fetch("http://127.0.0.1:5062/store/listbyname/" + encodeURIComponent(termo))
        .then((response) => response.json())
        .then((data) => {
            window.location.href=`listar.html?term=${txtbuscar}`;
            let divList = document.createElement("div");
            divList.style.height = "150px"; 
            divList.setAttribute("class", "card m-3");
            divList.innerHTML = `
            <a href="" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
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
        }).catch((error) => console.log(`Erro ao executar API -> ${error}`));
}



// btnbuscar.onclick = () => {
//     if (txtbuscar.value.trim() == "") {
//         return alert(`Não digitou nada`)
//     }
//     else {
//         fetch("http://127.0.0.1:5062/store/listbyname/"+txtbuscar, {
//             method: "GET",
//             headers: {
//                 "accept": "application/json",
//                 "content-type": "application/json"
//             }
//         }).then((response) => response.json()).then((result) => {
//             result.data.map((item, index) => {
//                 window.location.href=`listar.html?pag=${txtbuscar}`;
//                 let divList = document.createElement("div");
//                 divList.style.height = "150px"; 
//                 divList.setAttribute("class", "card m-3");
//                 divList.innerHTML = `
//                 <a href="" class="nav-link">
//                     <div class="row">
//                         <div class="col-md-4">
//                             <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
//                         </div>
//                         <div class="col-md-8">
//                             <div class="card-body">
//                                 <h5 class="card-title">${item.nome}</h5>
//                                 <p class="card-text">${item.descricao}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </a>
//                 `;
//                 estrutura.appendChild(divList);
//             })
//         }).catch((error) => console.log(`Erro ao executar API -> ${error}`));
//     };
// }


function carregarCategoria() {
    key = window.location.search.substring(5, window.location.search.length);

    const estrutura = document.getElementById("estrutura");

    let url1 = "http://127.0.0.1:5062/store/listbycategory/"+key;
    let url2 = "http://127.0.0.1:5062/store/listbycategory/"+key

    fetch("http://127.0.0.1:5062/store/listbycategory/"+key, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        }
    }).then((response) => response.json()).then((result) => {
        result.data.map((item, index) => {
            let divList = document.createElement("div");
            divList.style.height = "150px";
            divList.setAttribute("class", "card m-3");
            divList.innerHTML = `
            <a href="" class="nav-link">
                <div class="row">
                    <div class="col-md-4">
                        <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
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
        })
    }).catch((error) => console.log(`Erro ao executar API -> ${error}`));
};


function carregarLojas() {

    const estrutura2 = document.getElementById("dadosLojas");
    map((item, index) => {
        let divList = document.createElement("div");
        divList.style.height = "150px";
        divList.setAttribute("class", "card m-3");
        divList.innerHTML = `
        <a href="" class="nav-link">
            <div class="row">
                <div class="col-md-4">
                    <img src="assets/logo-sem-fundo.png" class="img-fluid rounded" style="height: 150px;width:400px;object-fit:contain" alt="...">
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
        estrutura2.appendChild(divList);
    })
}