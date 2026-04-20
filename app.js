const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const server = express();

const { PORT, DB_CONNECTION } = process.env;
server.use(cors())
server.use(express.json());

// Connexion MongoDB
server.use(async (req, res, next) => {
    try {
        await mongoose.connect(DB_CONNECTION);
        console.log('💾 Successfully connected to the DB !');
        next();
    } catch(err) {
        console.log(`❌ Connection Failed \n[Reason]\n ${err}`);
        res.status(500).json({ 
            statusCode: 500, 
            message: 'Impossible de se connecter à la base de données' 
        });
    }
});

const router = require('./routes');
server.use('/api', router);

server.listen(PORT, () => {
    console.log(`🚀 Express Server started on port ${PORT}`);
});