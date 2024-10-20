import express from 'express';
import cors from 'cors';
import { storeCallBackData } from '../core/controllers/mpesa.controllers.js';

const app = express();
app.use(express.json());
app.use(cors());

const clients = new Set();

const whitelist = [
    '196.201.214.200',
    '196.201.214.206',
    '196.201.213.114',
    '196.201.214.207',
    '196.201.214.208',
    '196.201.213.44',
    '196.201.212.127',
    '196.201.212.138',
    '196.201.212.129',
    '196.201.212.136',
    '196.201.212.74',
    '196.201.212.69'
];

// SSE Endpoint
app.get('/api/v1/mpesa-events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    const client = {
        id: Date.now(),
        res
    };
    clients.add(client);

    req.on('close', () => {
        clients.delete(client);
    });
});

function sendEventToAll(eventData) {
    clients.forEach(client => {
        client.res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });
}

// Callback Routes
app.post('/api/v1/lipa-callback', (req, res) => {
    const clientIp = req.ip;
    if (!whitelist.includes(clientIp)) {
        return res.status(403).json({ error: 'IP not whitelisted' });
    }

    try {
        const data = req.body;
        storeCallBackData(data); // Store data for later retrieval
        sendEventToAll(data); // Send data to connected clients
        res.status(200).send('OK');
    } catch (error) {
        console.log("Error from lipa callback", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/api/v1/c2b-callback', (req, res) => {
    const clientIp = req.ip;
    if (!whitelist.includes(clientIp)) {
        return res.status(403).json({ error: 'IP not whitelisted' });
    }

    try {
        const data = req.body;
        storeCallBackData(data);
        sendEventToAll(data);
        res.status(200).send('OK');
    } catch (error) {
        console.log("Error from c2b callback", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/api/v1/b2b-callback', (req, res) => {
    const clientIp = req.ip;
    if (!whitelist.includes(clientIp)) {
        return res.status(403).json({ error: 'IP not whitelisted' });
    }

    try {
        const data = req.body;
        storeCallBackData(data);
        sendEventToAll(data);
        res.status(200).send('OK');
    } catch (error) {
        console.log("Error from b2b callback", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
