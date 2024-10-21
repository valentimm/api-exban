# Housing Finance API - Exban Challenge

## Descrição
Esta API REST foi desenvolvida utilizando **Node.js** e **TypeScript** para gerenciar um sistema básico de registro de clientes, imóveis e financiamentos habitacionais. Ela permite realizar operações de **CRUD** (criar, ler, atualizar e excluir) em três entidades: **clientes**, **imóveis** e **financiamentos**.

## Funcionalidades
- **Clientes**: Criar, listar, atualizar e excluir clientes.
- **Imóveis**: Registrar, listar, atualizar e excluir imóveis. (a ser implementado)
- **Financiamentos**: Criar, listar, atualizar e excluir financiamentos vinculados a clientes e imóveis. (a ser implementado)

## Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **PostgreSQL** com **Docker**
- **Prisma ORM**
- **Jest** para testes unitários e de integração

## Requisitos
- **Node.js** (versão 14.x ou superior)
- **Docker**
- **Docker Compose**

## Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/housing-finance-api.git
cd housing-finance-api

```

### 2. Instalar as Dependências
```bash

npm install
```

### 3. Configurar o Banco de Dados
```bash

docker-compose up -d
```

### 4. Configurar as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/housing_finance"
```

### 5. Migrar o Banco de Dados
```bash

npx prisma migrate dev
```

### 6. Iniciar o Servidor
```bash

npm run dev
```
A API estará disponível em http://localhost:3000
