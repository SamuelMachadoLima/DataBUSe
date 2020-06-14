onload = () => {
    $('.data').mask('00/00/0000');
    $('.money').mask('#0.00', { reverse: true });

    //Mensagem de olá para o usuário
    let user = JSON.parse(localStorage.getItem('user'));
    let firstName = user.nome.trim().split(" ")[0];

    msgUser.innerHTML = `Seja bem vindo(a), <u>${firstName}</u>.`;

    //Cálculo do saldo atual
    let extrato = JSON.parse(localStorage.getItem('extrato'));
    let saldo = 0;
    for (i = 0; i < extrato.results.length; i++) {
        if (extrato.results[i].operacao == 0)
            saldo -= parseFloat(extrato.results[i].valor);
        else
            saldo += parseFloat(extrato.results[i].valor);
    }

    saldoAtual.innerHTML = `R$ ${saldo}`;
    saldoAtual.style.color = saldo > 0 ? 'green' : saldo == 0 ? 'gray' : 'red';

    for (i = 0; i < extrato.results.length; i++) {
        corpoTabela.innerHTML += `<tr>` +
            `<td>${extrato.results[i].data}</td>` +
            `<td>${extrato.results[i].onibus}</td>` +
            `<td>R$ ${extrato.results[i].valor}</td>` +
            `<td>${extrato.results[i].operacao == 1 ? 'Recarga' : 'Gasto'}</td>` +
            `</tr>`;
    }

    busOption();
    sortByDate()
}

logout.onclick = () => {
    localStorage.setItem('autorizado', '0');
    location.href = "/"
}
operacao.onchange = () => {
    busOption();
}

var busOption = () => {
    if (operacao.value == 1) {
        busOP.value = '-';
        busOP.parentElement.classList.add("hide");
    } else {
        busOP.value = '';
        busOP.parentElement.classList.remove("hide");
    }
}

var addExtrato = () => {
    let extrato = JSON.parse(localStorage.getItem('extrato'));

    msgtext.style.color = "grey";

    if (coust.value.trim() == "") {
        msgtext.innerHTML = "Digite o valor da operação"
        return false;
    }
    else if (busOP.value.trim() == "") {
        msgtext.innerHTML = "Digite a linha de ônibus utilizada"
        return false;
    }
    else if (dataOP.value.trim() == "") {
        msgtext.innerHTML = "Digite a data da operação"
        return false;
    }

    extrato.results.push({
        "valor": coust.value,
        "data": dataOP.value,
        "operacao": operacao.value,
        "onibus": busOP.value
    });

    console.log(extrato.results)

    localStorage.setItem('extrato', JSON.stringify(extrato));

    location.href = "/extrato.html"
}

function convertDate(d) {
    var p = d.split("/");
    return +(p[2] + p[1] + p[0]);
}

function sortByDate() {
    var tbody = document.querySelector("#tabelaExtrato tbody");
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"));

    rows.sort(function (a, b) {
        return convertDate(a.cells[0].innerHTML) - convertDate(b.cells[0].innerHTML);
    });

    rows.forEach(function (v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
    });
}