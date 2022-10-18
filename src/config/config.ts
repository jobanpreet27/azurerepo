import dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@ef-backend-v1.meslnul.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1992;

const JWT_SECRET = process.env.JWT_SECRET || '';

export const config = {
    mongo: {
        url: DB_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        secrect: JWT_SECRET
    }
}