var fullName = document.getElementById('fullName');
var email = document.getElementById('emailC');
var tel = document.getElementById('telefoneC');
var numeroCartao = document.getElementById('numeroCartaoC');
var pass = document.getElementById('senhaC');

onload = () => {
    if (!(localStorage.getItem('user'))) {
        let user = [{
            nome: "ADMIN",
            email: "ADMIN@ADMIN.com",
            tel: "(00) 0000-0000",
            numeroCartao: "123",
            pass: "123"
        }];
        localStorage.setItem('user', JSON.stringify(user));
    }

    if (!(localStorage.getItem('extrato'))) {
        let extrato = {
            "results": [
                {
                    "user_id": 0,
                    "valor": "100000.00",
                    "data": getActualDate(),
                    "operacao": 1,
                    "onibus": "-"
                }
            ]
        }
        localStorage.setItem('extrato', JSON.stringify(extrato));
    }
}

function store() {
    let user = JSON.parse(localStorage.getItem('user'));

    user.push({
        "nome": fullName.value,
        "email": email.value,
        "tel": tel.value,
        "numeroCartao": numeroCartao.value,
        "pass": pass.value
    });
    localStorage.setItem('user', JSON.stringify(user));

    localStorage.setItem('autorizado', "0");

    alert("Cadastro realizado!");
}

function check() {
    let user = JSON.parse(localStorage.getItem('user'));

    var contador = 0;

    var userName = document.getElementById('numeroCartaoL');
    var userPass = document.getElementById('senhaL');

    console.log(user.length)

    for (let i = 0; i < user.length; i++) {
        if (userName.value == user[i].numeroCartao && userPass.value == user[i].pass) {
            localStorage.setItem('autorizado', `1?${i}`);

            if (localStorage.getItem('extrato')) {
                let extrato = JSON.parse(localStorage.getItem('extrato'));
                for (let j = 0; j < extrato.results.length; j++) {
                    if (extrato.results[j].user_id == i) {
                        contador++;
                    }
                }
            }

            if (contador == 0) {
                let extrato = {
                    "results": [
                        {
                            "user_id": i,
                            "valor": "50.00",
                            "data": getActualDate(),
                            "operacao": 1,
                            "onibus": "-"
                        }
                    ]
                }
                localStorage.setItem('extrato', JSON.stringify(extrato));
            }
            location.href = "extrato.html";
            return false;
        }
    }
    localStorage.setItem('autorizado', "0");
    alert('Número do cartão não encontrado ou senha incorreta.');
}

function getActualDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}