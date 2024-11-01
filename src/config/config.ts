import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    app: {
        port: Number(process.env.PORT ?? 80),
        stage: process.env.STAGE ?? 'test',
    },

    bot : {
        bot_token: process.env.BOT_TOKEN,
        // bot_url: process.env.BOT_URL,
    },

    grpc: {
        self: {
            url: process.env.GRPC_URL ?? 'localhost:50050',
        },
        microservice_01: {
            url: process.env.MICROSERVICE_01_GRPC_URL ?? 'localhost:50050',
        },
    },

    database: {
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dbPort: Number(process.env.DB_PORT),
        dialect: process.env.DIALECT,
        replica: {
            host: process.env.DB_HOST_REPLICA,
        },
    },

    limitEntityPerPage: Number(process.env.LIMIT_ENTITY_PER_PAGE ?? 100),

    rpcHttpServer: {
        port: Number(process.env.RPC_HTTP_SERVER_PORT ?? 3333),
    },

    rpcHttpClient: {
        url: process.env.RPC_HTTP_CLIENT_URL ?? 'http://localhost:3333',
    },
};
