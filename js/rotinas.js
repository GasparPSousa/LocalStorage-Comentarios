document.addEventListener("onload", executarRotinas() ); //Quando recarregar a página, evoca a função executarRotinas().

// Função God que executa tudo
function executarRotinas() {

    var localStorageKeyName = 'data'; // Declarando a variável localStorageKeyName

    carregarDoLocalStorage(); // Evocando a função carregarDoLocalStorage

    document.querySelector("#btn-add").addEventListener('click', function () {
        var nome = document.getElementById("nome"),  // faz referência ao elemento input com id="nome"
            email = document.getElementById("email"), // faz referência ao elemnto input com id="email"
            idade = document.getElementById("idade");  // faz referência do elemento input com id="idade"

         
        // Faz a validação de dados...
        // Se o campo nome ou o campo email estiverem vazio ou o campo idade não for inteiro gerar um aviso ao usuário
        if (nome.value.length === 0 || email.value.length === 0 || !parseInt(idade.value))  {
            return confirm("Favor não deixar os campos nomes e email em branco e no campo idade inserir um número inteiro")
        };

        // Cria um objeto usuário
        var usuario = {
            nome: nome.value,
            email: email.value,
            idade: idade.value
        };

        // Limpando os dados dos campos 
        nome.value = ''; // Limpando o campo nome
        email.value = ''; // Limpando o campo email
        idade.value = ''; // Limpando o campo idade

        // Adicionar ao localStorage
        adicionarAoLocalStorage(usuario);
    })

    // 
    function adicionarAoLocalStorage(obj) {
        var usuarios = [], // Criando um array vazio

            dadosNoLocalStorage = localStorage.getItem(localStorageKeyName); //Obtendo dados do LocalStorage

        if (dadosNoLocalStorage !== null) { // Se existirem dados no LocalStorage
            usuarios = JSON.parse(dadosNoLocalStorage); // Transforma os dados JSON para JS
        }

        // Vai adicionando cada objeto no Array usuários
        usuarios.push(obj);

        // Setando dados 
        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));

        // Carregando
        carregarDoLocalStorage();
    }

    function carregarDoLocalStorage() {
        var usuarios = [], // Criando um array vazio

            dadosNoLocalStorage = localStorage.getItem(localStorageKeyName), //Obtendo dados do LocalStorage
            gridBody = document.querySelector("#grid tbody"); // Faz referência ao elemnto com id="grid tbody"

        if (dadosNoLocalStorage !== null) { // Se existirem dados no LocalStorage
            usuarios = JSON.parse(dadosNoLocalStorage); // Transforma os dados JSON para JS
        }

        // Draw TR from TBODY
        gridBody.innerHTML = '';

        // 
        usuarios.forEach(function (x, i) {
            var tr = document.createElement("tr"), // Criando o elemento tr
                tdName = document.createElement("td"), // Criando o elemento td
                tdJob = document.createElement("td"), // Criando o elemento td
                tdAge = document.createElement("td"), // Criando o elemento
                tdRemove = document.createElement("td"), // Criando o elemento td
                btnRemove = document.createElement("button"); // Criando o elemento button

            tdName.innerHTML = x.nome; // Adicionado o nome do usuário
            tdJob.innerHTML = x.email; // Adicionando o email do usuário
            tdAge.innerHTML = x.idade; // Adicionando a idade do usuário

            btnRemove.textContent = 'Remove'; // Inserindo o nome remove
            btnRemove.className = 'btn btn-xs btn-danger'; // Inserindo a classe 
            btnRemove.addEventListener('click', function(){ // Esperando o botão remove ser clicado 
                removeFromLocalStorage(i); // Chamando a função para remover
            });


            tdRemove.appendChild(btnRemove); // Adicionando o botão remove na tabela

            tr.appendChild(tdName); // Adicionando Name na tabela
            tr.appendChild(tdJob); // Adicionando Job na tabela
            tr.appendChild(tdAge); // Adicionando Age na tabela
            tr.appendChild(tdRemove); // Adicioando Remove na tabela

            gridBody.appendChild(tr); // Adicionando a tabeça ao gridBody
        });
    }

    // Função para remover
    function removeFromLocalStorage(index){
        var usuarios = [], // Criando um array vazio
            dadosNoLocalStorage = localStorage.getItem(localStorageKeyName); // Obtendo dados do LocalStorage

        usuarios = JSON.parse(dadosNoLocalStorage); // Transforma os dados JSON para JS.

        usuarios.splice(index, 1); // Retirando um elemento referente ao index.

        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios)); // Setando novamente o LocalStorage e transformando os JS em JSON

        carregarDoLocalStorage(); // Carregando os dados.
    }
}