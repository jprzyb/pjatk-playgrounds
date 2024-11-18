const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages/index.html'));
});

app.post('/send-to-spring', async (req, res) => {
    const springEndpoint = 'http://localhost:8080/data'; // Endpoint Spring
    const { data } = req.body; // Pobiera dane z formularza

    const payload = { data };

    try {
        const response = await axios.post(springEndpoint, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(`Response from Spring: ${response.data}`);
        res.send(`Response from Spring: ${response.data}`);
    } catch (error) {
        console.error('Error sending data to Spring:', error.message);
        if (error.response) {
            res.status(error.response.status).send(`Error from Spring: ${error.response.data}`);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Express app running on http://localhost:${PORT}`);
});
