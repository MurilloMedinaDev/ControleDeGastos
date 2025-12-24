# MyFinance 💰

Sistema de controle financeiro pessoal com cadastro e validação de login, registro de entradas e saídas, cálculo de saldo e visualização de extrato.

Projeto desenvolvido para fins de estudo, utilizando **HTML, CSS, JavaScript, Node.js, API REST e SQLite**.

---

## 🚀 Funcionalidades

* Cadastro e login de usuários
* Registro de **entradas** e **saídas** financeiras
* Cálculo automático de saldo
* Extrato com histórico de movimentações
* Exclusão de movimentações
* Persistência de dados com SQLite

---

## 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* SQLite
* API REST

---

## 📋 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

* [Node.js](https://nodejs.org/) (versão 16 ou superior)
* Navegador web (Chrome, Edge, Firefox)

---

## 📦 Como rodar o projeto localmente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/MurilloMedinaDev/MyFinance.git
```

Acesse a pasta do projeto:

```bash
cd MyFinance
```

---

### 2️⃣ Instalar as dependências

As dependências do backend estão no arquivo `JS/package.json`.

Execute:

```bash
cd JS
npm install
```

---

### 3️⃣ Banco de dados

O projeto utiliza **SQLite**, portanto **não é necessário instalar banco externo**.

* O arquivo `banco.db` já está incluído no projeto
* Caso não exista, ele será criado automaticamente pelo servidor

---

### 4️⃣ Iniciar o servidor

Ainda dentro da pasta `JS`, execute:

```bash
node server.js
```

O servidor será iniciado localmente (normalmente em `http://localhost:3000`).

---

### 5️⃣ Executar o frontend

Após iniciar o servidor:

* Abra o arquivo `index.html` no navegador
* Ou utilize a extensão **Live Server** no VS Code para melhor experiência

---

## 📂 Estrutura do projeto

```
MyFinance/
├── CSS/
│   ├── styleCadastro.css
│   ├── styleEntrada.css
│   ├── styleExtrato.css
│   ├── styleHome.css
│   ├── styleIndex.css
│   └── styleSaida.css
│
├── HTML/
│   ├── MyFinance.html
│   ├── NovaEntrada.html
│   ├── NovaSaida.html
│   ├── cadastro.html
│   └── extrato.html
│
├── JS/
│   ├── BD.js
│   ├── dash.js
│   ├── extrato.js
│   ├── scriptCadastro.js
│   ├── scriptEntrada.js
│   ├── scriptIndex.js
│   ├── scriptSaida.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── banco.db
├── index.html
├── MyFinance.png
├── fotoPerfil.png
├── logo2.png
└── README.md
```

---

## 🔐 Observações

* Os dados de autenticação no frontend utilizam `localStorage`
* Projeto com foco **educacional**, não indicado para produção sem melhorias de segurança

---

## 📌 Melhorias futuras

* Criptografia de senhas
* Paginação no extrato
* Validações mais robustas no backend
* Deploy em ambiente cloud

---

## 👨‍💻 Autor

Desenvolvido por **Murillo Medina** como projeto de estudo em desenvolvimento web e backend.
