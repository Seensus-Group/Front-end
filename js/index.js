const btnLogin = document.getElementById("btnLogin");
const txtuser = document.getElementById("txtuser");
const senha = document.getElementById("txtsenha");
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
