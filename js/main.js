let listaDeVinil = []; 
let indiceEdicao = -1; // índice usado para validar os campos da função salvar

function limpaCampos() {
    document.getElementById('artista').value = '';
    document.getElementById('album').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('ano').value = '';
}

function salvar() {
    let artista = document.getElementById('artista').value;
    let album = document.getElementById('album').value;
    let quantidade = document.getElementById('quantidade').value;
    let ano = document.getElementById('ano').value;

    // validações de campos

    if (indiceEdicao >= 0) {
        let obj = listaDeVinil[indiceEdicao];
        obj.artista = artista;
        obj.album = album;
        obj.quantidade = quantidade;
        obj.ano = ano;
    } else {
        listaDeVinil.push({
            'artista': artista,
            'album': album,
            'quantidade': quantidade,
            'ano': ano
        });
    }

    limpaCampos();
    atualizarTabela();

    indiceEdicao = -1;
}

function editarDisco(indice) {
    indiceEdicao = indice;
    let obj = listaDeVinil[indice];

    document.getElementById('artista').value = obj.artista;
    document.getElementById('album').value = obj.album;
    document.getElementById('quantidade').value = obj.quantidade;
    document.getElementById('ano').value = obj.ano;
}

function excluirDisco(indice) {
    let obj = listaDeVinil[indice];

    if (confirm(`Tem certeza que deseja excluir o Álbum ${obj.album} do artista ${obj.artista}`)) {
        listaDeVinil.splice(indice, 1);
        atualizarTabela();
    }
}

function somaTotal() {
    return listaDeVinil
        .map(i => Number.parseInt(i.quantidade))
        .reduce((acumulador, quantidadeDisco) => acumulador + quantidadeDisco, 0);
}

function imprimeQuantidade() {
    console.log(somaTotal());

    let quantidadeTotal = document.getElementById('quantidade-total');
    quantidadeTotal.innerHTML = somaTotal();
}

function atualizarTabela() {
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    listaDeVinil.forEach((disco, indice) => {
        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${disco.artista}</td>
        <td>${disco.album}</td>
        <td>${disco.ano}</td>
        <td>${disco.quantidade}</td>
        <td>
            <button type="button" onclick="editarDisco(${indice})" class="material-symbols-outlined btn-icone">edit</button>
            <button type="button" onclick="excluirDisco(${indice})" class="material-symbols-outlined btn-icone">delete</button>
        </td>
        `;

        tableBody.append(tr);
    });

    imprimeQuantidade();
}