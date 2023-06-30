README

# FULLSTACK (2 - 3)

Este documento fornece instruções sobre como utilizar o arquivo `docker-compose.yml` do projeto [bravi-teste](https://github.com/Apollotechme/bravi-teste/).

## Pré-requisitos

Antes de prosseguir, verifique se você possui os seguintes pré-requisitos instalados em seu sistema:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Passos

Siga as etapas abaixo para utilizar o arquivo `docker-compose.yml`:

1.  Clone o repositório do projeto bravi-teste:

    git clone https://github.com/Apollotechme/bravi-teste.git

2.  Crie um arquivo `.env` dentro da pasta `api` do projeto baixado. Você pode usar o editor de texto de sua preferência para criar o arquivo.
3.  No arquivo `.env`, preencha as seguintes informações de acordo com suas necessidades:

    ```shell
    DATABASE_URL="postgresql://usuario_do_db:senha_do_db@database:5432/nome_do_db?schema=public"

    POSTGRES_USER=usuario_do_db
    POSTGRES_PASSWORD=senha_do_db
    POSTGRES_DB=nome_do_db

    SECRET_KEY=sua_chave_secreta_para_gerar_tokens
    ```

    As informações acima são um exemplo, veja o que seria um cenário real:

    ```shell
    DATABASE_URL="postgresql://samuel@persuhn:aiuwdhSUWD**==-@database:5432/mydb?schema=public"

    POSTGRES_USER=samuel@persuhn
    POSTGRES_PASSWORD=aiuwdhSUWD**==-
    POSTGRES_DB=mydb

    SECRET_KEY=aiddjWIEW22!1&^sh
    ```

    Se você preferir, pode usar as informações acima (do que seria o `.env` no cenário real).

4.  Abra um terminal e navegue até a pasta raiz do projeto `bravi-teste`.
5.  Execute o comando a seguir para construir e iniciar os containers Docker usando o arquivo `docker-compose.yml`:

```shell
docker-compose up -d
```

A opção `-d` permite que os contêineres sejam executados em segundo plano (em modo detached).

Após a execução do comando acima, os contêineres serão criados e inicializados com base nas configurações definidas no arquivo `docker-compose.yml`.

7.  Aguarde até que todos os contêineres sejam iniciados corretamente. Isso pode levar alguns minutos, dependendo da velocidade do seu sistema.
8.  Uma vez que os contêineres tenham sido iniciados com sucesso, você poderá acessar o projeto em seu navegador usando o seguinte endereço:

`http://localhost:3000`

Parabéns! Agora você está pronto para começar a utilizar o projeto bravi-teste.

## Testando a API

Os testes automatizados da API estão disponíveis na pasta "api" do projeto. Para executar os testes e verificar o funcionamento correto da API, siga as instruções abaixo:

Pré-requisitos

Antes de prosseguir, verifique se você possui os seguintes pré-requisitos instalados em seu sistema:

    Node.js (versão recomendada: 14.x ou superior)
    npm ou Yarn (gerenciadores de pacotes)

Certifique-se de ter instalado corretamente o Node.js e o gerenciador de pacotes de sua escolha antes de continuar.

### Passos para executar os testes automatizados

Siga os passos abaixo para executar os testes automatizados da API:

1. Navegue até a pasta api do projeto:

   ```shell
   cd api
   ```

2. Certifique-se de que as dependências necessárias estejam instaladas. Para isso, execute o seguinte comando para instalar as dependências:

   ```shell
       npm install
       #ou
       yarn install
   ```

3. Após a instalação das dependências, execute o seguinte comando para iniciar os testes automatizados da API:

   ```shell
   npm run test
   #ou
   yarn test
   ```

   O comando acima irá executar os testes definidos na API e exibirá os resultados no console.

4. Aguarde até que os testes sejam concluídos. O resultado de cada teste será exibido indicando se passou ou falhou.

Os testes automatizados fornecem uma maneira eficaz de garantir que a API esteja funcionando corretamente e que todas as funcionalidades estejam em conformidade com as especificações.

Certifique-se de que todos os testes passem antes de implantar ou fazer modificações na API, pois isso ajuda a manter a integridade e a qualidade do código.

Caso ocorram falhas nos testes, mensagens de erro detalhadas serão exibidas no console, permitindo que você identifique os problemas e faça as correções necessárias.

Espero que estas instruções sejam úteis! Se você tiver mais dúvidas, não hesite em entrar em contato.

## Notas adicionais

- Caso precise modificar alguma configuração do arquivo `docker-compose.yml`, faça as alterações necessárias e reinicie os contêineres usando o comando `docker-compose up -d`.
- Se você deseja parar e remover todos os contêineres e recursos relacionados ao projeto, execute o seguinte comando:

docker-compose down

Isso encerrará os contêineres e removerá todos os volumes e redes associadas ao projeto.

Para obter mais informações sobre como usar o Docker Compose, consulte a documentação oficial em [https://docs.docker.com/compose/](https://docs.docker.com/compose/).

Espero que este guia tenha sido útil. Se você tiver alguma dúvida ou problema, não hesite em entrar em contato.

# Teste de Suporte (1)

O script `index.js` na pasta "support" contém uma função chamada `validateBrackets` que verifica se uma sequência de brackets está corretamente balanceada. O script pode ser executado usando o comando `npm run start` ou `yarn start`. Além disso, os usuários podem adicionar chamadas adicionais à função `validateBrackets` para verificar outras sequências de brackets, se desejarem.

## Passos para execução do script

Siga os passos abaixo para executar o script `index.js` e realizar a verificação dos brackets:

1. Navegue até a pasta "support" do projeto.

   ```shell
   cd support
   ```

2. execute um dos comandos abaixo:

   ```shell
   npm run start
   #ou
   yarn start
   ```

3. O script será executado e o resultado da validação dos brackets será exibido no console.

## Adicionando chamadas da função `validateBrackets`

Se você deseja adicionar chamadas adicionais à função validateBrackets para verificar outras sequências de brackets, siga estas etapas:

1. Abra o arquivo index.js no editor de texto de sua escolha.

2. Logo após as chamadas existentes da função validateBrackets, adicione uma nova linha e escreva sua própria chamada da função, passando a sequência de brackets que deseja verificar. Por exemplo:

   ```javascript
   console.log("[{()}]", validateBrackets("[{()}]"));
   ```

3. Salve o arquivo

4. Execute novamente o script seguindo os passos mencionados anteriormente para ver o resultado da nova chamada da função validateBrackets.

Dessa forma, você pode adicionar quantas chamadas da função validateBrackets forem necessárias para verificar diferentes sequências de brackets.

Espero que essas instruções sejam úteis! Se você tiver mais dúvidas, não hesite em entrar em contato.
