const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require("express");
const app = new express();

var botIsReady = false;

const client = new Client({
    authStrategy: new LocalAuth(),

});
client.on('authenticated', (session) => {
    // Save the session object however you prefer.
    // Convert it to json, save it to a file, store it in a database...
    console.log("> User Logged In");
});
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('> Client is ready!');
    botIsReady = true;
});
client.initialize();
client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});



// EXPRESS

app.use(express.urlencoded({ extended: true }));

app.post('/api/sendmessage', async (req, res) => {

    if (!botIsReady) return res.json({ error: "Bot is offline" });

    let to = req.body.to;
    let message = req.body.message;

    const chatId = to.substring(1) + "@c.us";


    if (to == undefined || message == undefined) {
        res.send({ status: "error", message: "Please enter valid phone number and message" })
    } else {
        client.sendMessage(chatId, message).then((response) => {
            if (response.id.fromMe) {
                res.send({ status: 'success', message: `Message successfully sent to ${to}` })
            }
        }).catch(error => {
            res.json({ error })
        });
    }
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`> Express Server started at Port: ${PORT}`))



