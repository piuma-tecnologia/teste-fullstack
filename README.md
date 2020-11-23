
<img src="logo.png" alt="PIUMA" style="width:150px">
<h3 style="text-align:right">Limeira, 22 de Novembro de 2020</h3>

# Fullstack Teste
Olá, somos a Piuma Soluções em tecnologia, somos especialistas em tecnologia personalizada para novos negócios. 
Este é o nosso Teste para desenvolvedores fullstack. Após concluir o teste, favor enviar um pull request neste repositório seguindo as recomendações. Agradecemos o empenho e esperamos poder incluir seu talento às nossas equipes.

<br>

### Conteúdo
---
O teste contempla habilidades necessárias para o cargo de desenvolvedor fullstack, com ênfase à integração entre APIs, desenvolvimento de interfaces frontend e git.


<br>

### O Desafio
---

Atenção: 
  - Todos os passos do desafio são obrigatórios
  - Todos os links para apis externas, documentações dos frameworks a serem utilizados e outras informações importantes estão listadas neste documento

---  

Overview do desafio:

  O sistema servirá para controle de clientes. O sistema deve exibir uma listagem de clientes cadastrados e permitir:
  - Listagem de todos os clientes com paginação e ordenação por ordem alfabética no campo nome
  - Busca de clientes por nome, id, apelido ou documento
  - Exclusão de um cliente informando o id
  - Cadastro de um novo cliente
  - Alteração de um cliente já cadastrado

Regras: 
  - Clientes do tipo "pessoa física" devem informar o CPF como documento
  - Clientes do tipo "pessoa jurídica" devem informar o CNPJ como documento
  - Para clientes do tipo "pessoa jurídica" o sistema deve buscar as informações da empresa pelo documento informado no webservice da receita federal (listado neste documento).
  - Sempre que o campo precisar de máscara, o front deve aplicar máscara.
  - A API deve tratar os campos que tem máscara, gravando somente os números.

<br>

### Passos
---

  1. Dados
     - Os dados devem ser armazenados em um arquivo "client.json" no diretório "database" no diretório raiz do projeto
     - Objeto cliente:
       - id: gerado automaticamente com Math.floor(Math.random() * 100) + Date.now()
       - nome: Utilizado para salvar tanto nome quanto razão social
       - apelido: Utilizado para salvar tanto apelido quanto nomeFantasia
       - documento: Utilizado para salvar tanto CPF quanto CNPJ

  2. API:
      - Criar a API utilizando NodeJS ( versão LTS vigente ), Fastify e Axios 
      
      - A API será responsável por entregar endpoints para:
        - Listagem de todos os clientes com paginação e ordenação por ordem alfabética no campo nome
        - Busca de clientes por nome, id, apelido ou documento
        - Exclusão definitiva de um cliente
        - Cadastro de um novo cliente
        - Alteração de um cliente já cadastrado

  3. Frontend
      - Criar o projeto de frontend utilizando VueJS e Quasar Framework
      
      - Implementar a listagem e o formulário de inclusão/alteração separadamente, podendo ser duas páginas distintas ou uma página para a listagem e um dialog para edição e inclusão de clientes.
      
      - O projeto deve ser responsivo, componentes que não se adaptem bem ao mobile podem ser substituídos.
  
  4. Diferenciais
        - Cuidados com a experiência do usuário nos ambientes desktop e mobile serão pontuados.
        
        - Cuidados com a aparência da aplicação também será mais valorizada, como por exemplo logotipo e cores na aplicação, nomes, imagens...
        
        - Código bem escrito, com reutilização de código, princípios de S.O.L.I.D, clean code e programação funcional serão avaliados positivamente. Lembre-se de que não é porque funciona que está correto.
        
<br>

### Dicas
---
  - Feito é melhor que perfeito, aqui na Piuma levamos essa máxima, entendemos que não exista e perfeição e que é muito mais importante entregar uma primeira versão e aperfeiçoa-la em novas releases do que tentar entregar uma versão cheia de complexidade e falhar antes da conclusão. Portanto, nossa sugestão é que você entregue o melhor trabalho possível, mas que só comece as refatorações quando houver uma primeira versão concluída.
  
  - Se para ganhar poucos milissegundos de performance o código precisar perder legibilidade, escolhemos por manter um código relativamente menos performático e mais legível com manutenção mais fácil, tenha isso em mente.
  
<br>

### Entrega
---

  - Para entregar seu teste basta abrir um merge request neste repositório. A mensagem do commit deve seguir o padrão: 
    - "Entrega: seuemail@mail.com"
  
  - lembre-se de não enviar a pasta node_modules


<br>

### Links úteis
---

  - [Quasar Framework](https://quasar.dev/quasar-cli/installation)
  - [Fastify](https://www.fastify.io/)
  - [Receita WS (Busca de informações de empresa via CNPJ)](https://receitaws.com.br/api)



<br>

### Agradecimentos
---
  Nossos sinceros agradecimentos por compartilhar parte de seu valioso tempo conosco, esperamos que em breve possamos utilizar seu talento em nossos projetos. Somos uma empresa em constante evolução, será uma honra compartilhar isto com você.
