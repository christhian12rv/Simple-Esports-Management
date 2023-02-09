<h1 align="center">Simple-Esports-Management</h1>

<!-- Índice -->
<details>
  <summary>Índice</summary>
  <ol>
        <li><a href="#feito-com">Feito com</a></li>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
        <li><a href="#rodando-o-projeto">Rodando o projeto</a></li>
      </ul>
    </li>
    <li><a href="#ilustrações">Ilustrações</a></li>
    <li><a href="#explicação-do-projeto">Explicação do projeto</a></li>
  </ol>
</details>

### Feito com


-   [Typescript](https://www.typescriptlang.org)
-   [NodeJS v16.18.0](https://nodejs.org/en/download/releases/)
-   [Express](https://expressjs.com/)
-   [Prisma](https://www.prisma.io)
-   [Postgres](https://www.postgresql.org)
-   [ReactJS](https://reactjs.org/)
-   [Material UI](https://mui.com)
-   [Docker](https://www.docker.com)

<!-- Começando -->

## Começando

### Pré requisitos

#### Docker

Se preferir, pode-se rodar o projeto via Docker e Docker-Compose. Para isso, é necessário ter o [Docker](https://www.docker.com) e o [Docker-Compose](https://docs.docker.com/compose/install/) instalado em sua máquina. Basta acessar os sites clicando no link anterior e instalá-los de acordo com seu sistema operacional.

#### Node

Outra maneira é instalar todas as ferramentas necessárias para rodar o projeto. A primeira a ser instalada é o [NodeJS](https://nodejs.org/en/). <ins>**OBS: Lembre-se de instalar a versão v16.18.0, pois é mais garantida de o projeto funcionar**</ins>.

-   #### Instalação do Node no Windows

    Basta acessar o [site oficial do Node.js](https://nodejs.org/) e baixar o instalador.
    Além disso, certifique-se de ter o `git` disponível em seu PATH, `npm` pode precisar dele (você pode encontrar o git [aqui](https://git-scm.com/)).

-   ##### Instalação do Node no Ubuntu

    Você pode instalar o nodejs e o npm facilmente com o apt install, basta executar os seguintes comandos.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   ##### Outros sistemas operacionais
    Você pode encontrar mais informações sobre a instalação no [site oficial do Node.js](https://nodejs.org/) e no [site oficial do NPM](https://npmjs.org/).

    Se a instalação foi bem-sucedida, você poderá executar o seguinte comando.

        $ node --version
        v16.3.0
    
        $ npm --version
        7.24.0

    Se você precisar atualizar o `npm`, você pode fazê-lo usando o `npm`! Legal, certo? Após executar o seguinte comando,    basta abrir novamente a linha de comando e ser feliz.
    
        $ npm install npm -g



### Instalação

1. Clone o repositório
    ```sh
    $ git clone https://github.com/christhian12rv/Simple-Esports-Management.git
    ```
    
#### Docker

2. Faça o build do projeto
    ```sh
    $ docker-compose build
    ```
    
#### Sem Docker

2. Vá para a pasta /server e instale os pacotes npm
    ```sh
    $ npm install
    ```
3. Vá para a pasta /client e instale os pacotes npm
    ```sh
    $ npm install
    ```

### Rodando o projeto

#### Docker

1. Rode o projeto. Se preferir, pode-se adicionar o comando "-d" para rodar em background.
    ```sh
    $ docker-compose up
    ```
2. Será necessário rodar as migrations no banco de dados na primeira vez que subir o projeto.
    Para isso, abra outro terminal e execute o seguinte comando
    ```sh
    $ docker exec esports-management-server npx prisma migrate dev
    ```
3. Para finalizar os containeres, rode o seguinte comando
    ```sh
    $ docker-compose down
    ```

#### Sem Docker

1. Crie um arquivo .env em /server/src. Em seguida, altere o arquivo .env
    ```sh
    PORT=PORTA_DO_SEU_SERVIDOR
    DATABASE_URL=postgresql://{USUARIO}:{SENHA}@{HOST}:{PORTA}/esports-management?schema=public&connect_timeout=300
    ```

2. Na primeira vez que for rodar o projeto, vá para a pasta /server e rode os 2 seguintes comandos
    ```sh
    $ npx prisma generate
    $ npx prisma migrate dev
    ```
    
3. Na primeira vez que for rodar o projeto, vá para a pasta /client, acesse o arquivo package.json e no final altere a seguinte linha:
    ```sh
    "proxy": "http://localhost:{PORTA_DO_SEU_SERVIDOR}"
    ```

Para executar o front-end e o back-end juntos, vá para a pasta /server e execute

    $ npm start

Para executar o backend, vá para a pasta /server e execute

    $ npm run server

Para rodar o frontend, vá até a pasta /client e execute

    $ npm start

Ou vá para a pasta /server e execute

    $ npm run client
    
<!-- USAGE EXAMPLES -->

## Ilustrações

<p align="center">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/main.png" alt="Tela Inicial">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/playerCreate.png" alt="Criação de Jogadores">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/teamCreate.png" alt="Criação de Times">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/playerUpdate.png" alt="Atualização de Jogadores">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/teamUpdate.png" alt="Atualização de Times">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/playersList.png" alt="Listagem de Jogadores">
  <img width="100%" src="https://github.com/christhian12rv/Simple-Esports-Management/blob/master/img/teamsList.png" alt="Listagem de Times">
</p>

## Explicação do projeto
O projeto consiste em um sistema web de gerenciamento de times de E-sports.

Como nas ilustrações acima, você pode ver os times e jogadores registrados, criar, atualizar e deletar os times e jogadores.

O projeto é responsivo e totalmente utilizável em dispositivos mobile.