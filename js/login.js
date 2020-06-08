var fullName = document.getElementById('fullName');
var email = document.getElementById('emailC');
var tel = document.getElementById('telefoneC');
var cpf = document.getElementById('cpfC');
var pass = document.getElementById('senhaC');


function store() {
    localStorage.setItem('fullName', fullName.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('tel', tel.value);
    localStorage.setItem('cpf', cpf.value);
    localStorage.setItem('pass', pass.value);

    alert("Cadastro realizado!");
}

function check() {
    // stored data from the register-form
    var storedPass = localStorage.getItem('pass');
    var storedName = localStorage.getItem('cpf');
    var name = localStorage.getItem('fullName');

    // entered data from the login-form
    var userName = document.getElementById('cpfL');
    var userPass = document.getElementById('senhaL');

    // check if stored data from register-form is equal to data from login form
    if (userName.value == storedName && userPass.value == storedPass) {
        alert('Bem vindo ' + name);
    } else {
        alert('CPF não encontrado ou senha incorreta.');
        return false;
    }
}