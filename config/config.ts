import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    app: {
        port: Number(process.env.PORT) ?? 80,
        stage: process.env.STAGE ?? 'test',
    },

    grpc: {
        self: {
            url: process.env.GRPC_URL ?? 'localhost:50050',
        },
        training_journal: {
            url: process.env.TRAINING_JOURNAL_GRPC_URL ?? 'localhost:50050',
        },
        food_journal: {
            url: process.env.FOOD_JOURNAL_GRPC_URL ?? 'localhost:50050',
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
};
