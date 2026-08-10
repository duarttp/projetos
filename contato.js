const form = document.getElementById("contactForm")
const status = document.getElementById("status")
const button = document.getElementById("btnSend")

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disable = true;
    button.innerText = "Enviando...";

    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),

    }
    try {
        const response = await fetch("api/contact", {
            method: "POST",
            headers: {
                "Contect-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            status.style.color = "green";
            status.innerText = result.message;
            form.reset();
        } else {
            status.style.color = "red";
            status.innerText = result.message;

        }

    } catch (error) {
        status.style.color = "red";
        status.innerText = "Erro ao enviar a mensagem.";
    }
    button.disabled = false;
    button.innerText = "Enviar";
}
);