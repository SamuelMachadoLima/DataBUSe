var fullName = document.getElementById('fullName');
var email = document.getElementById('emailC');
var tel = document.getElementById('telefoneC');
var cpf = document.getElementById('cpfC');
var pass = document.getElementById('senhaC');


function store() {
    let userData = {
        nome: fullName.value,
        email: email.value,
        tel: tel.value,
        cpf: cpf.value,
        pass: pass.value
    }
    let extrato = {
        "results": [
            {
                "valor": "50.00",
                "data": "29/03/2020",
                "operacao": 1,
                "onibus": "-"
            }
        ]
    }

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('extrato', JSON.stringify(extrato));
    localStorage.setItem('autorizado', "0");

    alert("Cadastro realizado!");
}

function check() {
    let user = JSON.parse(localStorage.getItem('user'));

    var userName = document.getElementById('cpfL');
    var userPass = document.getElementById('senhaL');

    if (userName.value == user['cpf'] && userPass.value == user['pass']) {
        localStorage.setItem('autorizado', "1");
        location.href = "extrato.html";
    } else {
        localStorage.setItem('autorizado', "0");
        alert('CPF não encontrado ou senha incorreta.');
        return false;
    }
}