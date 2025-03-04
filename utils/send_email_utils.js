import fs from 'fs/promises';
import transporter from '../config/emailConfig.js';
import { EMAIL_HOST_USERNAME } from '../config/constants.js';
import logger from '../config/loggerConfig.js';


const getTemplate = async (templateName, replacements)=> {
    const templatePath = new URL(`../views/${templateName}.html`, import.meta.url);
    const template = await fs.readFile(templatePath, 'utf8')
    return template.replace(/{{(\w+)}}/g, (_, key)=> replacements[key] || "")
}


const sendTemplateMail = async (toEmail, subject, templateName, payload) => {

    const emailHtml = await getTemplate(templateName, payload);

    let info = await transporter.sendMail({
        from: `"Jobi" <${EMAIL_HOST_USERNAME}>`,
        to: toEmail,
        subject: subject,
        html: emailHtml
    })
    logger.info(`Email sent: ${info.response}`);
}

export {sendTemplateMail};