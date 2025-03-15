import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import logger from '../config/loggerConfig.js';
import { CustomError } from './helper.js';

const publicKeyPath = path.resolve(process.cwd(), 'public.pem');
const privateKeyPath = path.resolve(process.cwd(), 'private.pem');

const loadKeys = async () => {
    try {
        const publicKey = await fs.readFile(publicKeyPath, { encoding: 'utf8' });
        const privateKey = await fs.readFile(privateKeyPath, { encoding: 'utf8' });
        return [privateKey, publicKey];
    } catch (error) {
        logger.error(`Error loading keys: ${error.message}`);
        throw new CustomError("Failed to load RSA keys", 500);
    }
};

export const encryptChatKey = async (chatKey) => {
    const [_, publicKey] = await loadKeys();
    if (!publicKey) throw new CustomError("Public key not loaded", 400);
    return crypto.publicEncrypt(publicKey, Buffer.from(chatKey, 'hex')).toString('base64');
};

export const decryptKey = async (encryptedKey) => {
    const [privateKey, _] = await loadKeys();
    if (!privateKey) throw new CustomError("Private key not loaded", 400);
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, 'base64')).toString('hex');
};

export const generateChatEncryptedKey = async () => {
    const key = crypto.randomBytes(32).toString('hex');
    return await encryptChatKey(key);
};
