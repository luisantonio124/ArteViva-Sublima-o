# ArteViva Sublimação

Projeto inicial utilizando [Next.js 14](https://nextjs.org/), TypeScript, Tailwind CSS e [shadcn/ui](https://ui.shadcn.com/). A camada de dados é gerenciada com [Prisma](https://www.prisma.io/) e PostgreSQL.

## Requisitos

- Node.js 18+
- PostgreSQL

## Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo `.env.example` para `.env` e ajuste a variável de conexão com o banco:
   ```bash
   cp .env.example .env
   # edite .env conforme necessário
   ```
3. Execute as migrações e o seed do banco:
   ```bash
   npx prisma migrate dev
   npm run prisma:seed
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:3000`.
