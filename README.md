# Welcome to Numbrik's Server Repository

## Getting Started

To set up the project, follow these steps:

1. Install all package dependencies:

    ```sh
    npm install
    ```

2. Start the debug build with the required environment variables:
    ```sh
    npm run fast
    ```

## Configuration

Ensure you have the following configuration in your `nodemon.json` file (keys are not revealed for security reasons):

```json
{
    "env": {
        "NODE_ENV": "value",
        "PORT": "value",
        "JWT_SECRET": "value",
        "ADMIN_KEY": "value",
        "AZURE_PS_CONN_STR": "value",
        "AZURE_PS_HUB": "value",
        "DB_HOST": "value",
        "DB_AUTH_KEY": "value"
    }
}
```

## Endpoints

### User Registration

-   **Endpoint:** `POST /api/<user or container>/<operagtion>`
-   **Description:** Register a new user.
