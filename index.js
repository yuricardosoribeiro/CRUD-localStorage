window.onload = carregaCadastro;

document.addEventListener('click', (e) => {
    const elemento = e.target;

    if(elemento.classList.contains('cadastro')) {
        cadastrarCliente();
    }
    if(elemento.classList.contains('botao-cancelar') || elemento.classList.contains('close')) {
        fecharJanela();
    }
    if(elemento.classList.contains('botao-salvar')) {
        salvarCadastro();
    }
    if(elemento.classList.contains('botao-apagar')) {
        excluirCadastro(elemento);
    }
    if(elemento.classList.contains('botao-editar')) {
        editarCadastro(elemento);
    }
})

function geraID() {
    return String(Math.floor(Math.random() * (999999 - 0) + 0));
}

function carregaCadastro() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros'));
    const table = document.querySelector('.tabela');

    if(cadastros === null) localStorage.setItem('cadastros',  JSON.stringify([]));
    if(cadastros.length === 0) return;

    const itens = document.querySelectorAll('tr');

    for(elemento of itens) {
        if(elemento.classList.contains('item-tabela')) {
            elemento.remove();
        }
    }

    for(elemento of cadastros) {
        table.innerHTML += `<tr class="item-tabela">
        <td class="nome">${elemento.nome}</td>
        <td class="email">${elemento.email}</td>
        <td class="celular">${elemento.celular}</td>
        <td class="cidade">${elemento.cidade}</td>
        <td class="acao">
            <div class="botao-editar">Editar</div>
            <div class="botao-apagar">Excluir</div>
        </td>
        <td class="id" style="display: none;">${elemento.id}</td>
        </tr>`
    }
}

function cadastrarCliente() {
    const texto = document.querySelector('.novo-cliente');
    texto.innerText = "Novo Cliente"

    const telaCadastro = document.querySelector('.tela-cadastro');
    telaCadastro.style = 'z-index: 2;'
    const elementos = document.querySelectorAll('.elemento');

    for (let elemento of elementos) {
        // pointer-events: visiblePainted (default)
        elemento.style = "pointer-events: none; opacity: 0.4;"
    }
}

function fecharJanela() {
    const telaCadastro = document.querySelector('.tela-cadastro');
    telaCadastro.style = 'z-index: -1;'
    const elementos = document.querySelectorAll('.elemento');

    for (let elemento of elementos) {
        // pointer-events: visiblePainted (default)
        elemento.style = "pointer-events: visiblePainted; opacity: 1.0;"
    }
}

function salvarCadastro() {
    const nome = document.querySelector('.input-nome');
    const email = document.querySelector('.input-email');
    const celular = document.querySelector('.input-celular');
    const cidade = document.querySelector('.input-cidade');
    const id = geraID();
    const cadastros = JSON.parse(localStorage.getItem('cadastros'));

    const texto = document.querySelector('.novo-cliente');
    if(texto.innerText === "Novo Cliente") {
        cadastros.push({nome: nome.value, email: email.value, celular: celular.value, cidade: cidade.value, id: id});
    
        localStorage.setItem('cadastros', JSON.stringify(cadastros));

        nome.value = "";
        email.value = "";
        celular.value = "";
        cidade.value = "";
    
        fecharJanela();
        carregaCadastro();
    } 

    if(texto.innerText !== "Novo Cliente") {
        const inputID = document.querySelector('.input-id');

        for(let i = 0; i < cadastros.length; i++) {
            if(inputID.value === String(cadastros[i].id)) {
                cadastros[i].nome = nome.value;
                cadastros[i].email = email.value;
                cadastros[i].celular = celular.value;
                cadastros[i].cidade = cidade.value;
                
                localStorage.setItem('cadastros', JSON.stringify(cadastros));

                nome.value = "";
                email.value = "";
                celular.value = "";
                cidade.value = "";

                fecharJanela();
                carregaCadastro();
            }
        }
    }
}

function excluirCadastro(elemento) {
    const itemFilhos = elemento.parentNode.parentNode.children;
    const item = elemento.parentNode.parentNode;
    const cadastros = JSON.parse(localStorage.getItem('cadastros'));

    for(let i = 0; i < cadastros.length; i++) {
        if(itemFilhos[1].innerText === cadastros[i].email) {
            item.remove();
            cadastros.splice(i, 1);
            
            localStorage.setItem('cadastros', JSON.stringify(cadastros));
        }
    }
}

function editarCadastro(elemento) {
    const telaCadastro = document.querySelector('.tela-cadastro');
    telaCadastro.style = 'z-index: 2;'
    const elementos = document.querySelectorAll('.elemento');
    const texto = document.querySelector('.novo-cliente');
    texto.innerText = "Editar Cadastro"

    for (let elemento of elementos) {
        // pointer-events: visiblePainted (default)
        elemento.style = "pointer-events: none; opacity: 0.4;"
    }

    const nome = document.querySelector('.input-nome');
    nome.value = elemento.parentNode.parentNode.children[0].innerText;
    const email = document.querySelector('.input-email');
    email.value = elemento.parentNode.parentNode.children[1].innerText;
    const celular = document.querySelector('.input-celular');
    celular.value = elemento.parentNode.parentNode.children[2].innerText;
    const cidade = document.querySelector('.input-cidade');
    cidade.value = elemento.parentNode.parentNode.children[3].innerText;
    const id = document.querySelector('.input-id');
    id.value = elemento.parentNode.parentNode.children[5].innerText;
}