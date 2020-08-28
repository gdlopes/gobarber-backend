<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Back-end GoBarber
</h3>

---

## :rocket: Sobre

O GoBarber é uma aplicação desenvolvida durante o bootcamp da [Rocketseat](https://rocketseat.com.br/).

## :computer: Tecnologias utilizadas

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [typescript](https://www.typescriptlang.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [uuidv4](https://www.npmjs.com/package/uuidv4)
- [jest](https://jestjs.io/docs/en/getting-started.html)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [handlebars](https://handlebarsjs.com/)
- [redis](https://redis.io/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://nodemailer.com/about/)
- [tsyringe](https://github.com/microsoft/tsyringe)
- [typeorm](https://typeorm.io/#/)

## :warning: Pré-requisitos

- [git](https://git-scm.com/)
- [insomnia](https://insomnia.rest/)
- [docker](https://www.docker.com/)

## :information_source: Instruções para rodar o projeto

Primeiramente é necessário criar os bancos de dados para conseguir utilizar a aplicação, você pode fazer isso usando o docker, desta forma:

```bash
# Criando postgres
$ docker run --name gostack_gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Criando mongo
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Criando redis
$ docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

Você pode usar outros nomes e credenciais para os bancos, lembre-se sempre de conferir isso aqui :point_right: [arquivo de configuração do typeorm](https://github.com/gdlopes/gobarber-backend/blob/master/ormconfig.json) e nas [variáveis de ambiente](https://github.com/gdlopes/gobarber-backend/blob/master/.env.example).

:warning: Aqui está disponível um aquivo chamado `.env.example` é necessário criar uma cópia deste arquivo, porém com o nome `.env` para as variáveis de ambiente funcionarem.

Feito isso, podemos seguir.

:warning: Lembre-se também de deixar rodando todas imagens do docker.

```bash
# Clonando o repositório
$ git clone https://github.com/gdlopes/gobarber-backend.git

# Navegando para a pasta do projeto
$ cd gobarber-backend

# Instalando as dependências
$ yarn

# Rodando as migrations
$ yarn typeorm migration:run

# Rodando a aplicação
$ yarn dev:server
```

### :fire: Para rodar os testes, basta utilizar o seguinte comando:

```bash
  # Rodando os testes
  $ yarn test
```

## :eyes: Agora, utilize o [Insomnia](https://insomnia.rest/) para ver tudo funcionando

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Back-end%20GoBarber&uri=https%3A%2F%2Fgithub.com%2Fgdlopes%2Fgobarber-backend%2Fblob%2Fmaster%2FInsomnia_2020-08-27.json)

### Thats it ! :coffee:

---

by Gustavo Lopes :tada:
