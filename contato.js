const form = document.getElementById("contactForm");
const status = document.getElementById("status");
const button = document.getElementById("btnSend");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.innerText = "Enviando...";

    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
    };

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            status.style.color = "green";
            status.innerText = result.message || "Mensagem enviada com sucesso!";
            form.reset();
        } else {
            status.style.color = "red";
            status.innerText = result.message || "Erro ao enviar mensagem.";
        }
    } catch (error) {
        console.error("Erro no envio:", error);
        status.style.color = "red";
        status.innerText = "Erro ao enviar a mensagem.";
    } finally {
        button.disabled = false;
        button.innerText = "Enviar";
    }
});