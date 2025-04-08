const express = require('express');
const fs = require('fs');
const path = require('path'); 
const app = express();     

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.redirect('/slike');
});

app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file => file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  res.render('slike', { images });
});


app.listen(3000, () => {
    console.log('Server pokrenut na http://localhost:3000');
  });