import dotenv from "dotenv"
dotenv.config({path: './config.env'})

export const FRIEND_REQUEST_STATUS = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    CANCELLED: "cancelled"
}

export const EMAIL_HOST_NAME = process.env.EMAIL_HOST_NAME;
export const EMAIL_HOST_PORT = process.env.EMAIL_HOST_PORT;
export const EMAIL_HOST_USERNAME = process.env.EMAIL_HOST_USERNAME;
export const EMAIL_HOST_PASSWORD = process.env.EMAIL_HOST_PASSWORD;

export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''

export const MONGO_CONNECTION_STRING = process.env.CONNECTION_STR;

export const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];


export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const PORT = process.env.PORT || 5000;
export const HOST = process.env.HOST || '0.0.0.0';