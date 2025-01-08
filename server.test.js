// Import necessary modules
const http = require('http');
const socketIo = require('socket.io');
const Client = require('socket.io-client');
const express = require('express');

// Initialize Express app and create HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('clientMessage', (msg) => {
        console.log(`Message from client: ${msg}`);
        socket.emit('serverMessage', `Server Echo: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

describe('Socket.IO Server Tests', () => {
    let clientSocket1, clientSocket2;
    let testServer;

    // Start server before tests
    beforeAll((done) => {
        testServer = server.listen(() => {
            const port = server.address().port;
            clientSocket1 = Client(`http://localhost:${port}`);
            clientSocket2 = Client(`http://localhost:${port}`);

            let connectedClients = 0;

            clientSocket1.on('connect', () => {
                connectedClients++;
                if (connectedClients === 2) done();
            });

            clientSocket2.on('connect', () => {
                connectedClients++;
                if (connectedClients === 2) done();
            });
        });
    });

    // Close sockets and server after tests
    afterAll((done) => {
        clientSocket1.close();
        clientSocket2.close();
        testServer.close(done);
    });

    /*** TEST CASE 1: CLIENT-SERVER CONNECTION ***/
    test('Client should connect to the server', (done) => {
        expect(clientSocket1.connected).toBe(true);
        done();
    }, 10000); // Increased timeout

    /*** TEST CASE 2: MESSAGE EXCHANGE ***/
    test('Client should send and receive a message from the server', (done) => {
        clientSocket1.emit('clientMessage', 'Hello from Client');

        clientSocket1.on('serverMessage', (msg) => {
            expect(msg).toBe('Server Echo: Hello from Client');
            done();
        });
    }, 10000); // Increased timeout

    

    /*** TEST CASE 3: DISCONNECTION HANDLING ***/
    test('Client should disconnect gracefully', (done) => {
        clientSocket1.on('disconnect', () => {
            expect(clientSocket1.connected).toBe(false);
            done();
        });
        clientSocket1.close();
    }, 10000); // Increased timeout
});
