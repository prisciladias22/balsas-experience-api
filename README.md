# Balsas Experience API

## 1. Nome e descrição do projeto

A Balsas Experience API é uma API REST desenvolvida como projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas. Seu objetivo é disponibilizar informações sobre atrações turísticas do município de Balsas, no Maranhão.
A aplicação permite cadastrar, listar, consultar, atualizar e excluir atrações turísticas por meio de requisições HTTP, utilizando um banco de dados PostgreSQL para armazenar as informações.

## 2. Equipe

Projeto desenvolvido individualmente por:

- **Priscila Ferreira Dias Santos** — desenvolvimento da API, implementação dos endpoints, integração com o banco de dados, testes e publicação da aplicação.

## 3. Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript.
- **Express:** framework utilizado para criar o servidor e gerenciar as rotas.
- **JavaScript:** linguagem utilizada no desenvolvimento.
- **PostgreSQL:** banco de dados relacional.
- **Prisma ORM:** ferramenta utilizada para acessar e manipular os dados do banco.
- **Thunder Client:** ferramenta utilizada para testar as requisições HTTP.
- **Git e GitHub:** controle de versão e hospedagem do código-fonte.
- **Render:** plataforma utilizada para publicar a API.
- **Neon:** serviço utilizado para hospedar o banco de dados PostgreSQL.

## 4. Pré-requisitos

Para executar o projeto localmente, é necessário ter:
- Node.js e npm instalados.
- Git instalado para clonar o repositório.
- Um banco de dados PostgreSQL disponível.
- As credenciais de conexão com o banco de dados.

## 5. Como instalar e configurar

### 5.1. Clonar o repositório

Execute os comandos no terminal:

```bash
git clone https://github.com/prisciladias22/balsas-experience-api.git
cd balsas-experience-api
```
### 5.2. Instalar as dependências

```bash
npm install
```
### 5.3. Configurar a variável DATABASE_URL

Crie um arquivo `.env` na raiz do projeto e configure a variável `DATABASE_URL` com os dados de conexão do PostgreSQL.

Exemplo de configuração, sem credenciais reais:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/balsas_experience?schema=public"
```

**Observação:** Substitua `USUARIO`, `SENHA` e os demais parâmetros pelos dados correspondentes ao seu banco de dados.

## 6. Como executar as migrações, popular o banco e iniciar o servidor

### 6.1. Executar as migrações

Para aplicar as migrações existentes no banco de dados, execute:

```bash
npx prisma migrate deploy
```
### 6.2. Gerar o Prisma Client

```bash
npx prisma generate
```
### 6.3. Popular o banco de dados

Se o projeto possuir uma rotina de seed configurada, execute:

```bash
npx prisma db seed
```
Caso não exista uma rotina de seed, cadastre as atrações por meio do endpoint `POST /atracoes`.

### 6.4. Iniciar o servidor

Se o arquivo `package.json` possuir o script `start`, execute:

```bash
npm start
```
Utilize o comando definido nos scripts do projeto. Caso a aplicação esteja configurada para utilizar a porta 3000, poderá ser acessada localmente pelo endereço:

```text
http://localhost:3000
```

## 7. Lista de endpoints e exemplos de requisição

A API disponibiliza os seguintes endpoints para gerenciar as atrações turísticas.

| Método HTTP | Endpoint | Descrição | Status esperado |
|---|---|---|---|
| GET | `/` | Verifica o funcionamento da API. | `200 OK` |
| GET | `/atracoes` | Lista todas as atrações cadastradas. | `200 OK` |
| GET | `/atracoes/:id` | Consulta uma atração pelo ID. | `200 OK` ou `404 Not Found` |
| POST | `/atracoes` | Cadastra uma nova atração. | `201 Created` |
| PUT | `/atracoes/:id` | Atualiza uma atração existente. | `200 OK` ou `404 Not Found` |
| DELETE | `/atracoes/:id` | Exclui uma atração pelo ID. | `204 No Content` ou `404 Not Found` |

### 7.1. Listar atrações

Requisição:

```http
GET http://localhost:3000/atracoes
```
Essa operação retorna a lista de atrações cadastradas no banco de dados.

### 7.2. Consultar uma atração pelo ID

Requisição:

```http
GET http://localhost:3000/atracoes/1
```
O identificador `1` é apenas um exemplo. Se a atração não existir, a API deverá retornar `404 Not Found`, conforme a implementação.

### 7.3. Cadastrar uma atração

Requisição:

```http
POST http://localhost:3000/atracoes
Content-Type: application/json
```

Corpo da requisição:

```json
{
  "nome": "Praça da Matriz",
  "descricao": "Espaço público de convivência e lazer.",
  "endereco": "Centro, Balsas - MA",
  "categoria": "Praça",
  "horario": "Livre",
  "preco": "Gratuito"
}
```
Em caso de sucesso, a API deverá retornar `201 Created`, acompanhado dos dados da atração cadastrada, conforme a resposta implementada.

### 7.4. Atualizar uma atração

Requisição:

```http
PUT http://localhost:3000/atracoes/1
Content-Type: application/json
```
Corpo da requisição:

```json
{
  "nome": "Praça da Matriz",
  "descricao": "Espaço de convivência e lazer.",
  "endereco": "Centro, Balsas - MA",
  "categoria": "Praça",
  "horario": "Livre",
  "preco": "Gratuito"
}
```
Essa operação atualiza os dados da atração identificada pelo ID informado.

### 7.5. Excluir uma atração

Requisição:

```http
DELETE http://localhost:3000/atracoes/1
```

Quando a exclusão for realizada com sucesso, o status esperado é `204 No Content`.

Os exemplos utilizam dados ilustrativos. Os campos, as respostas e os códigos HTTP devem corresponder ao comportamento efetivamente implementado na API.

## 8. Link da API publicada

A aplicação está publicada na plataforma Render, e o banco de dados PostgreSQL utiliza o serviço Neon.

- **API publicada:** https://balsas-experience-api.onrender.com/
- **Listagem de atrações:** https://balsas-experience-api.onrender.com/atracoes
- **Repositório GitHub:** https://github.com/prisciladias22/balsas-experience-api
