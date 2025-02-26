function startFakeHack() {
    // Verifica si el navegador soporta notificaciones
    if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones.");
        return;
    }

    // Solicita permiso para mostrar notificaciones
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                startNotifications();
            }
        });
    } else {
        startNotifications();
    }
}

function startNotifications() {
    let count = 0;
    const interval = setInterval(() => {
        if (count >= 10) { // Limita el número de notificaciones
            clearInterval(interval);
            return;
        }

        // Muestra una notificación
        new Notification("¡Alerta de seguridad!", {
            body: `Tu dispositivo ha sido comprometido (${++count}/10)`,
            icon: "https://scontent.fntr7-1.fna.fbcdn.net/v/t1.6435-9/180913578_10159329173588817_3596496305122683978_n.png?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEmxV7x_g7Qgulylq2DZkucBPC1RlDKiUYE8LVGUMqJRvLer4gA3lhVKIAfMi2CqzQG6IgkXWJAsXBrqNj7L8Hi&_nc_ohc=s6y-EOS-tpgQ7kNvgH9xxu5&_nc_oc=Adh5s1eHb0Eea10iVR7ro0b4jh2l6PznEKrIvE8GEtpr-0yLUQC7JdTTHLktjlOyG04&_nc_zt=23&_nc_ht=scontent.fntr7-1.fna&_nc_gid=A72k8do7DxTUHI_6smY2ggX&oh=00_AYAEQ9ASfS5_Puw7tGy4U4eIppuT5JBBQr8q5zj6RCwqPg&oe=67DED3BD"
        });

        // Cambia el fondo de la página para simular un "hackeo"
        document.body.style.backgroundColor = count % 2 === 0 ? "red" : "black";
        document.body.style.color = "white";
        document.body.innerHTML += `<p>¡Advertencia! Sistema comprometido (${count}/10)</p>`;
    }, 2000); // Notificación cada 2 segundos
}

// Inicia el "hackeo" al cargar la página
window.onload = startFakeHack;



