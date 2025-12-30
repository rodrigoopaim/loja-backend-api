# loja-backend-api 🚀

Uma API REST para gerenciamento de estoque e pedido, desenvolvida com **Node.js** e **PostgreSQL**. O projeto foca em operações CRUD essenciais com validações de integridade de dados.

## 🛠 Tecnologias Utilizadas

*   **Runtime:** [Node.js](nodejs.org) (v20+)
*   **Framework:** [Express.js](expressjs.com)
*   **Banco de Dados:** [PostgreSQL](www.postgresql.org)
*   **Driver BD:** [node-postgres (pg)](node-postgres.com)
*   **Variáveis de Ambiente:** [Dotenv](github.com)

## 📋 Funcionalidades (CRUD)

- [x] **Criar Produto:** Adiciona novos itens ao catálogo.
- [x] **Listar Todos:** Recupera a lista completa de produtos.
- [x] **Listar por ID:** Busca os detalhes de um produto específico.
- [x] **Atualizar Produto:** Edição parcial ou total de informações (Nome/Preço).
- [x] **Deletar Produto:** Remove itens do sistema.

## 🚀 Como Executar o Projeto

### Pré-requisitos
*   Possuir o **Node.js** instalado.
*   Instância do **PostgreSQL** em execução.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone github.com
   cd estoque-backend-api

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Ambiente:**
Crie um arquivo .env na raiz do projeto e preencha suas credenciais:
Exemplo base do arquivo .env:


**env**
   ```bash
   CONNECTION_STRING=postgresql://usuario:senha@host:porta/nome_do_banco
   PORT=3000
   ```


5. **Inicie o servidor:**
   ```bash
   npm start
   ```
O servidor iniciará na porta 3000 por padrão.


## 🛣️ Endpoints da API

| Método | Rota            | Descrição                       |
|--------|-----------------|---------------------------------|
| GET    | /produtos       | Lista todos os produtos         |
| GET    | /produtos/:id   | Busca um produto pelo ID        |
| POST   | /produtos       | Cadastra um novo produto        |
| PATCH  | /produtos/:id   | Atualiza um produto existente   |
| DELETE | /produtos/:id   | Remove um produto do sistema    |


Exemplo de Requisição (Atualizar Produto)

PATCH /produtos/1

   ```json
   {
     "nome": "Teclado Mecânico RGB",
     "preco": 299.90
   }
   ```


Desenvolvido por Rodrigo O. Paim
