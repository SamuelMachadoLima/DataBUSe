$(".show-more a").on("click", function () {
    var $this = $(this);
    var $content = $this.parent().prev().prev("div.novidade");
    var linkText = $this.text().toUpperCase();

    if (linkText === "LER MAIS") {
        linkText = "Ler menos";
        $content.switchClass("hideContent", "showContent", 400);
    } else {
        linkText = "Ler mais";
        $content.switchClass("showContent", "hideContent", 400);
    };

    $this.text(linkText);
    return false;
});


function verificaCampos() {
    let pass = $("#senhaC").val();
    let confirmPass = $("#confirmaSenhaC").val();
    let fullName = $("#fullName").val();
    let email = $("#emailC").val();
    let tel = $("#telefoneC").val();
    let cpf = $("#cpfC").val();

    let btn = $("#cadastrar");
    let msg = $("#verifyPass");

    msg.css("color", "gray");

    if (pass == "") {
        msg.html("Digite uma senha!");
    }
    else if (confirmPass != pass) {
        msg.html("As senhas estão diferentes");
        $(btn).prop('disabled', true);
    } else {
        msg.html("Tudo ok!");
        $(btn).prop('disabled', false);
    }

    if (cpf.trim().length < 14) {
        msg.html("O número de cpf deve conter 9 dígitos!;");
        $(btn).prop('disabled', true);
    }

    if (fullName.trim() == "" || email.trim() == "" || tel.trim() == "") {
        msg.html("Preencha todos os campos");
        $(btn).prop('disabled', true);
    } else {
        $(btn).prop('disabled', false);
    }
}


$(document).on("input", "#cad input", function () {
    verificaCampos();
});

$(document).ready(function () {
    $('.cpf').mask('000.000.000-00');

    verificaCampos();
});

$(document).on("input", ".tel", function () {
    if ($(this).val().length <= 14) {
        $('.tel').mask('(00) 0000-00009');
    } else {
        $('.tel').mask('(00) 00000-0000');
    }
});