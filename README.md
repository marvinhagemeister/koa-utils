# Koa Utils

Slim Boilerplate for TypeScript based projects.

## Installation

```bash
# npm
npm install --save koa-utils

# yarn
yarn add koa-utils
```

## Usage

```js
const Koa = require("koa");
const { handleErrors } = require("koa-utils");

// Create server with error handler
const server = new Koa()
  .use(handleErrors());

server.listen(8080, () => console.log("Server started"));
```

### `handleErrors`

Generic error handler for rest apis. Creates a response with the following
structure:

```ts
ErrorResponse {
  result: null,
  messages: ["A user friendly message"];
  success: false;
  errors: [{ code: 123, "Something is wrong" }];
}
```

## License

`MIT`, see [LICENSE](LICENSE.md).
