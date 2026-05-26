Tasks:

As a BA, create user-story-generator agent which will generate user stories for this EPIC @udemy_epic.txt.

1. The agent should be generic means not specific for udemy registration epic.
2. Use skills to help agent educate about the domain and story creation
3. Use Instructions and prompts
4. Use hooks to check about the JIRA story name pattern. 

## Node.js Registration API

This workspace now includes a generated Node.js API for the registration flow.

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template:

```bash
cp .env.example .env
```

3. Start the API:

```bash
npm start
```

To run without MongoDB (in-memory mode):

```bash
DB_PROVIDER=memory npm run dev
```

Detailed guide: [docs/in-memory-mode.md](docs/in-memory-mode.md)

The server starts on port `3000` by default.

### Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Swagger Docs

- `GET /api-docs` - Swagger UI
- `GET /api-docs.json` - OpenAPI JSON

Full endpoint documentation: [docs/api-reference.md](docs/api-reference.md)
OpenAPI spec file: [docs/openapi.json](docs/openapi.json)

#### Registration payload

```json
{
	"email": "user@example.com",
	"password": "StrongPass1!",
	"confirmPassword": "StrongPass1!"
}
```

#### Registration rules

- Email format must be valid.
- Email must be unique (case-insensitive).
- Password must have at least 8 characters, including uppercase, lowercase, number, and special character.
- `password` and `confirmPassword` must match.

#### Simulate confirmation email failure

Use query parameter `simulateEmailFailure=true`:

- `POST /api/auth/register?simulateEmailFailure=true`

Registration still succeeds, and the response includes a warning.

### Tech choices

- MongoDB + Mongoose for persistence
- bcryptjs for password hashing
- JWT for auth token generation
- Jest + Supertest + mongodb-memory-server for tests

### Run tests

```bash
npm test
```


