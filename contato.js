// Menu Mobile Toggle
const menuIcon = document.getElementById("menu");
const navLinks = document.querySelector(".links");

if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuIcon.classList.toggle("bx-x");
    });

    document.querySelectorAll(".links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuIcon.classList.remove("bx-x");
        });
    });
}

// Form Envio de Email
const form = document.getElementById("contactForm");
const status = document.getElementById("status");
const button = document.getElementById("btnSend");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        button.disabled = true;
        button.innerHTML = `<span>Enviando...</span> <i class="bx bx-loader-alt bx-spin"></i>`;

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
                status.className = "status-success";
                status.innerText = result.message || "Mensagem enviada com sucesso!";
                form.reset();
            } else {
                status.className = "status-error";
                status.innerText = result.message || "Erro ao enviar mensagem.";
            }
        } catch (error) {
            console.error("Erro no envio:", error);
            status.className = "status-error";
            status.innerText = "Erro ao enviar a mensagem. Verifique a conexão.";
        } finally {
            button.disabled = false;
            button.innerHTML = `<span>Enviar</span> <i class="bx bx-send"></i>`;
        }
    });
}