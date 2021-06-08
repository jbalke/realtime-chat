import dotenv from 'dotenv'
dotenv.config();

export const IS_PROD = process.env.NODE_ENV === 'production';

export const PORT = process.env.PORT;