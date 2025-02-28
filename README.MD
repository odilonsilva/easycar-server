# Easy Car Server

Este é o servidor do projeto Easy Car, uma aplicação para gerenciamento de caronas.

## Tecnologias Utilizadas

- Node.js
- Express
- Cors
- express-validator
- SQLite

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/easy-car.git
```

2. Navegue até o diretório do servidor

```bash
cd easycar-server
```

3. Instale as dependências do projeto:

```bash
npm install
```

## Uso

1. Inicie o servidor

```bash
npm start
```

## Rotas

### Usuários

`POST /users/create` - Cria um novo usuário.

`POST /users/login` - Faz login de um usuário.

### Caronas

`GET /rides` - Lista todas as caronas.

`POST /rides` - Cria uma nova carona.

`GET /rides/:rideId` - Obtém detalhes de uma carona específica.

`DELETE /rides/:rideId` - Cancela uma carona.

`PUT /rides/:rideId/accept` - Aceita uma carona.

`PUT /rides/:rideId/finish` - Finaliza uma carona.

`PUT /rides/:rideId/cancel` - Cancela uma carona pelo motorista.

`GET /rides/drivers/:driverId` - Lista todas as caronas de um motorista específico.

## Estrutura do Projeto

<pre>
easycar-server/
├── src/
│ ├── controllers/
│ │ ├── userController.js
│ │ └── rideController.js
│ ├── database/
│ │ ├── database.db
│ │ └── sqlite.js
│ ├── repositories/
│ │ ├── rideRepository.js
│ │ └── userRepository.js
│ ├── routes/
│ │ ├── userRoutes.js
│ │ └── rideRoutes.js
│ ├── services/
│ │ ├── userService.js
│ │ └── rideService.js
│ ├── validators/
│ │ ├── baseValidator.js
│ │ ├── rideValidator.js
│ │ └── userValidator.js
│ └── index.js
├── package.json
└── README.md
</pre>
