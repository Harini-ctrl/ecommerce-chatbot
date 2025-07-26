 const express = require('express');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chatbot', chatbotRoutes);

module.exports = app;
