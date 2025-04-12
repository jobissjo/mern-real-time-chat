import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import logger from '../config/loggerConfig.js';
import { CustomError } from './helper.js';
import { PRIVATE_KEY, PUBLIC_KEY } from '../config/constants.js';



const loadKeys = async () => {
    try {
        const privateKey = PRIVATE_KEY;
        const publicKey = PUBLIC_KEY;
        if(!privateKey || !publicKey){
            throw new Error("Missing RSA keys in environment variables");
        }
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
    const decryptedHex = crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, 'base64')).toString('hex');
    const decryptedBase64 = Buffer.from(decryptedHex, 'hex').toString('base64');
    return decryptedBase64;
};

export const generateChatEncryptedKey = async () => {
    const key = crypto.randomBytes(32).toString('hex');
    return await encryptChatKey(key);
};
