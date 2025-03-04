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