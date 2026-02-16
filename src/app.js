import express from 'express'
import path from 'path';
import url from 'url';

const_filename=url.fileURLToPath(import.meta.url)
const_dirname=path.dirname(__filename);
 
const app=express();

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(express.json())

const PORT=3000;

app.listen(PORT, () => {
    console.log("Server is running on port" + PORT)
});