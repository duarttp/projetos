const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Método não permitido."
        });
    }

    // Garante que o body seja tratado corretamente caso venha como string
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { name, email, message } = body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Todos os campos são obrigatórios."
        });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Variáveis de ambiente EMAIL_USER ou EMAIL_PASS não configuradas.");
        return res.status(500).json({
            message: "Configuração do servidor incompleta (variáveis de ambiente faltando)."
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Contato Portfolio" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nova mensagem de ${name}`,
            html: `
                <h2>Nova mensagem recebida do Portfolio</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        return res.status(200).json({
            message: "Mensagem enviada com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return res.status(500).json({
            message: "Erro ao enviar o e-mail. Verifique as credenciais do servidor."
        });
    }
};