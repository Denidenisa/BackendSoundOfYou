const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const server = express();

const { PORT, DB_CONNECTION } = process.env;

server.use(cors({
  origin: [
    'https://sound-of-you-delta.vercel.app',
    'https://sound-of-you-git-main-denidenisas-projects.vercel.app'
  ]
}))

server.use(express.json());


mongoose.connect(DB_CONNECTION)
  .then(() => console.log('💾 Connecté à la base de données !'))
  .catch(err => console.log(`❌ Connexion échouée : ${err}`));

const router = require('./routes');
server.use('/api', router);

server.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});