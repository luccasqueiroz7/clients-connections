# CLIENTS CONNECTIONS

A aplicação consiste na criação de um cadastro de clientes, que após o login efetuado com username e password mostra o cliente e seus emails, telefones e contatos vinculados, sendo possível adicionar, editar e remover todos esses elementos.

# Instruções de configuração:

1. Abra o terminal e entre na pasta backend:

```bash
cd backend/
```

2. Instale todas as dependências:

```bash
yarn
```

3. Crie um arquivo .env, copiando o arquivo .env.example:

```bash
cp .env.example .env
```

4. Crie o seu banco de dados e complete o .env com as informações corretas, exemplo:

```bash
DB_HOST=localhost
DB_PASSWORD=123456
DB=clients_connections
DB_USER=jorge
SECRET_KEY=chave_secreta
```

5. Rode as migrações:

```bash
yarn typeorm migration:run -d src/data-source
```

6. Inicie o backend:

```bash
yarn dev
```

7. abra outro terminal e entre na pasta frontend:

```bash
cd frontend/
```

8. Instale todas as dependências:

```bash
yarn
```

9. Inicie o frontend:

```bash
yarn start
```

O frontend roda na porta 3000, enquanto o backend roda na porta 3001;

frontend: http://localhost:3000;

backend: http://localhost:3001;

# Testes:

Essa aplicação conta com uma grande cobertura de testes.

1. Abra o terminal e entre na pasta backend:

```bash
cd backend/
```

2. rode os testes:

```bash
yarn test
```
