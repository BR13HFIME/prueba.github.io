const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const cors = require("cors");

const app = express();
const upload = multer();
const filePath = "usuarios.xlsx";

app.use(cors());  // Permite peticiones desde otros dominios

// Ruta para recibir los datos del formulario
app.post("/save-data", upload.none(), (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).send("Faltan datos");

    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
        workbook.SheetNames.push("Usuarios");
        workbook.Sheets["Usuarios"] = xlsx.utils.aoa_to_sheet([["Nombre", "Correo", "Fecha"]]);
    }

    // Obtener la hoja de cálculo
    const sheet = workbook.Sheets["Usuarios"];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Agregar los nuevos datos
    const date = new Date().toISOString();
    data.push([name, email, date]);

    // Guardar los cambios en el archivo Excel
    const newSheet = xlsx.utils.aoa_to_sheet(data);
    workbook.Sheets["Usuarios"] = newSheet;
    xlsx.writeFile(workbook, filePath);

    res.send("Datos guardados correctamente.");
});

// Ruta para descargar el archivo Excel
app.get("/download", (req, res) => {
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send("No hay datos aún.");
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
