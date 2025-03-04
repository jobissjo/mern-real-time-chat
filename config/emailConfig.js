import nodemailer from 'nodemailer';
import { EMAIL_HOST_NAME, EMAIL_HOST_PASSWORD, EMAIL_HOST_PORT, EMAIL_HOST_USERNAME } from './constants.js';

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST_NAME,
    port: EMAIL_HOST_PORT,
    secure: false,
    auth: {
        user: EMAIL_HOST_USERNAME,
        pass: EMAIL_HOST_PASSWORD,
    }
})

export default transporter;