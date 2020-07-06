window.onload = function () // EXECUTA O JS QUANDO A PÁGINA INCIAR
{

    if (window.location.hostname != "localhost") {
        window.location.href = `${window.location.protocol}//localhost:${window.location.port}/linhas.html`;
    }

    var buscatarifaurl = "https://cors-anywhere.herokuapp.com/https://openbhbus.herokuapp.com/linhas/BuscarTarifa";

    // LISTA AS LINHAS BHBUS
    var bhbus = new XMLHttpRequest();
    bhbus.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (i = 0; i < myObj.result.length; i++) {
                document.getElementById("listLines").innerHTML += "<li class='bhbus'><a href='/quadroHorario.html?0&" + 
                myObj.result[i].COD_LINH + "'>" + myObj.result[i].COD_LINH + "</a></li>";
            }
        }
    };
    bhbus.open("GET", buscatarifaurl, true);
    bhbus.send();

    // LISTA AS LINHAS TRANSCON
    var otimo = new XMLHttpRequest();
    otimo.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            for (i = 0; i < obj.result.length; i++) {
                document.getElementById("listLines").innerHTML += "<li class='otimo'><a href='/quadroHorario.html?1&" + 
                obj.result[i].COD_LINH + "'>" + obj.result[i].COD_LINH + "</a></li>";
            }
        }
    };
    otimo.open("GET", "../otimo.json", true);
    otimo.send();
}

function buscaLinha() // FILTRA AS LINHAS DE ACORDO COM OQUE O USUÁRIO DIGITOU
{
    var input, filter, ul, li, a, i, txtValue, empresa;
    empresa = document.getElementById('empresas').value;
    input = document.getElementById("linha");
    filter = input.value.toUpperCase();
    ul = document.getElementById("listLines");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;

        if (empresa == 'otimo' && txtValue.toUpperCase().indexOf(filter) > -1) {
            if (li[i].classList.contains("otimo")) {
                li[i].style.display = "";
            } else if (li[i].classList.contains("bhbus")) {
                li[i].style.display = "none";
            }
        } else if (empresa == 'bhbus' && txtValue.toUpperCase().indexOf(filter) > -1) {
            if (li[i].classList.contains("bhbus")) {
                li[i].style.display = "";
            } else if (li[i].classList.contains("otimo")) {
                li[i].style.display = "none";
            }
        } else if (empresa == 'all' && txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }else {
            li[i].style.display = "none";
        }
    }
}