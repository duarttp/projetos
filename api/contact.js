const nodemailer = require("nodemailer");

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Método não permitido."
        });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {

        return res.status(400).json({
            message: "Todos os campos são obrigatórios."
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

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: `Nova mensagem de ${name}`,

            html: `
                <h2>Nova mensagem recebida</h2>

                <p><strong>Nome:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Mensagem:</strong></p>

                <p>${message}</p>
            `

        });

        return res.status(200).json({
            message: "Mensagem enviada com sucesso!"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro ao enviar o e-mail."
        });

    }

};