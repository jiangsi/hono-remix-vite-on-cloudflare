interface Env {
    DEFAULT_DOMAIN: string | undefined;
    MY_VAR: string;
    DB: D1Database;
    R2: R2Client;
    kv: KVNamespace;
    MY_API_KEY: string;
    CALLBACK_BASEURL: string;
    DATABASE_URL: string;
  }