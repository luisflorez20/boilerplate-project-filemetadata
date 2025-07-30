const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
require('dotenv').config();

//Configurar multer (almacenamiento en memoria)
const upload = multer ({ storage: multer.memoryStorage()});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) =>{
    res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta para subir el archivo
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error:'No file uploaded'});

    res.json({
        name: req.file.originalname,
        type:req.file.mimetype,
        size: req.file.size
    });
});

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port)
});