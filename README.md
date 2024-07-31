Instalar as dependências necessárias:

npm install --save-dev jest supertest

Configurar o jest adicionando a seguinte linha ao seu package.json:

"scripts": {
  "test": "jest"
}

Criar um arquivo chamado app.js para separar a configuração do servidor da lógica de aplicação. Facilita o teste do aplicativo sem precisar iniciar o servidor.



# Delivery API

API para gerenciar pedidos e rotas de entrega usando Node.js e Express.

## Configuração

### Pré-requisitos

- Node.js instalado
- npm (gerenciador de pacotes do Node.js)

### Instalação

1. Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd delivery-api
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

## Executando a Aplicação

Para iniciar o servidor da API, execute o seguinte comando:
```bash
npm start

Testes
Para executar os testes, use o comando:

npm test



Estrutura do Projeto

├── app.js              # Configuração e rotas da aplicação
├── index.js            # Ponto de entrada para iniciar o servidor
├── app.test.js         # Testes da aplicação
├── package.json        # Configurações do npm e dependências
└── README.md           # Instruções e documentação do projeto




Endpoints da API

GET /pedidos
Exemplo de Resposta:

[
    {
        "id": 1,
        "endereco": {
            "latitude": -23.5505,
            "longitude": -46.6333
        },
        "produto": "Produto A",
        "quantidade": 10
    }
]


POST /pedidos
Exemplo de Requisição:

{
    "endereco": {
        "latitude": -23.5505,
        "longitude": -46.6333
    },
    "produto": "Produto A",
    "quantidade": 10
}

Exemplo de Resposta:

{
    "id": 1,
    "endereco": {
        "latitude": -23.5505,
        "longitude": -46.6333
    },
    "produto": "Produto A",
    "quantidade": 10
}


GET /rotas
Exemplo de Resposta:

[
    {
        "id": 1,
        "latitude": -23.5505,
        "longitude": -46.6333
    }
]

POST /rotas
Exemplo de Requisição:

{
    "latitude": -23.5505,
    "longitude": -46.6333
}

Exemplo de Resposta

{
    "id": 1,
    "latitude": -23.5505,
    "longitude": -46.6333
}

GET /melhor-rota/
Exemplo de Resposta:

[
    {
        "id": 1,
        "endereco": {
            "latitude": -23.5510,
            "longitude": -46.6340
        },
        "produto": "Produto B",
        "quantidade": 5,
        "distancia": 0.1
    }
]
