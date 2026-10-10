# Balsas Experience API

## 1. Sobre o projeto

A Balsas Experience API é uma API REST desenvolvida como projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas. Seu objetivo é disponibilizar informações sobre atrações turísticas do município de Balsas, no Maranhão.

A aplicação permite cadastrar, listar, consultar, atualizar e excluir atrações turísticas.

## 2. Tecnologias utilizadas

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JavaScript
* Thunder Client para testes das requisições HTTP

## 3. Funcionalidades

* Listar todas as atrações turísticas.
* Consultar uma atração pelo ID.
* Cadastrar uma nova atração.
* Atualizar os dados de uma atração.
* Excluir uma atração.
* Validar os dados enviados nas requisições.
* Retornar códigos HTTP de sucesso e de erro.

## 4. Modelo de dados

A entidade `Atracao` possui os seguintes campos:

| Campo     | Tipo            | Descrição                  |
| --------- | --------------- | -------------------------- |
| id        | Int             | Identificador único        |
| nome      | String          | Nome da atração            |
| descricao | String          | Descrição da atração       |
| endereco  | String          | Endereço ou localização    |
| categoria | String          | Categoria da atração       |
| horario   | String opcional | Horário de funcionamento   |
| preco     | String opcional | Informação sobre preço     |
| createdAt | DateTime        | Data de criação            |
| updatedAt | DateTime        | Data da última atualização |

## 5. Endpoints

| Método | Endpoint        | Descrição                    | Resposta esperada |
| ------ | --------------- | ---------------------------- | ----------------- |
| GET    | `/`             | Apresenta informações da API | 200 OK            |
| GET    | `/atracoes`     | Lista as atrações            | 200 OK            |
| GET    | `/atracoes/:id` | Consulta uma atração pelo ID | 200 OK            |
| POST   | `/atracoes`     | Cadastra uma atração         | 201 Created       |
| PUT    | `/atracoes/:id` | Atualiza uma atração         | 200 OK            |
| DELETE | `/atracoes/:id` | Exclui uma atração           | 204 No Content    |

Quando uma atração não é encontrada, a API retorna `404 Not Found`.

## 6. Como executar o projeto

### Pré-requisitos

* Node.js instalado.
* PostgreSQL instalado e em execução.
* Banco de dados PostgreSQL criado.
* Git instalado, caso deseje clonar o repositório.

### Instalação

Clone o repositório ou abra a pasta do projeto e instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` na raiz do projeto com a variável `DATABASE_URL`, apontando para o banco PostgreSQL.

Exemplo de formato:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/balsas_experience?schema=public"
```

Substitua `USUARIO` e `SENHA` pelas credenciais locais do PostgreSQL. Não publique suas credenciais.

Aplique as migrações do banco:

```bash
npx prisma migrate deploy
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie a aplicação:

```bash
npm start
```

Por padrão, a API ficará disponível em `http://localhost:3000`.

## 7. Testes

As requisições foram testadas com o Thunder Client, incluindo:

* Listagem de atrações.
* Cadastro de atração.
* Consulta por ID.
* Atualização de dados.
* Exclusão de atração.
* Consulta de ID inexistente.

Os resultados observados nos testes locais incluíram os códigos HTTP `200`, `201`, `204` e `404`.

## 8. Observações

A aplicação utiliza PostgreSQL para armazenar os dados e Prisma ORM para realizar as operações no banco de dados.

A publicação em um serviço de hospedagem e o endereço da API serão adicionados após a implantação.

## 9. Autor

Projeto acadêmico desenvolvido individualmente.

**Estudante:** Priscila Ferreira Dias Santos
**Curso:** Análise e Desenvolvimento de Sistemas
**Instituição:** Centro Universitário de Balsas
