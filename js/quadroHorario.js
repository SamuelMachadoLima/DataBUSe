onload = () =>{
    var query = location.search.slice(1);
    var partes = query.split('&');
    var empresa = partes[0];
    var linha = partes[1];
    document.getElementById("linhaDesc").innerHTML += linha + (empresa == 0 ? " - BHBus":" - Ótimo");



    // Descrição da linha
    var descricao = new XMLHttpRequest();
    descricao.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (var i = 0; i < myObj.result.length; i++) {
                if (myObj.result[i].COD_LINH == linha){
                    document.getElementById("sentido").innerHTML += myObj.result[i].NOM_LINH;
                    document.getElementById("tarifa").innerHTML += myObj.result[i].VAL_TARI;
                }
            }
        }
    };
    descricao.open("GET", "../buscatarifa_bhbus.json", true);
    descricao.send();



    //Quadro de horários - Dia Útil
    var horarioUtil = new XMLHttpRequest();
    horarioUtil.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (var i = 0; i < myObj.result.length; i++) {
                if (myObj.result[i].COD_LINH == linha){
                    var hora = myObj.result[i].HOR_SAID_VIAG;
                    var min = myObj.result[i].MIN_SAID_VIAG;
                    document.getElementById("diaUtil").innerHTML +=`<td>${hora}h ${min}min</td>`;
                }
            }
        }
    };
    horarioUtil.open("GET", "../diaUtil.json", true);
    horarioUtil.send();



    //Itinerário
    var iti = new XMLHttpRequest();
    iti.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (var i = 0; i < myObj.result.length; i++) {
                if (myObj.result[i].COD_LINH == linha){
                    document.getElementById("itinerario").innerHTML += `<tr><td>${myObj.result[i].TIP_LOGR} ${myObj.result[i].NOM_LOGR}</td></tr>`;
                }
            }
        }
    };
    iti.open("GET", "../itinerario.json", true);
    iti.send();
}