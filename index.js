const express = require('express');
const bodyParser = require('body-parser');


const http = require('http')
fs = require('fs');
const stripe = require('stripe')('sk_test_Zc3dWNSOjhIYGxGE2PcpkXjg00fzoaVwBV');
const endpointSecret = ' whsec_lLqaHiM1krfTUH9WPPoSDpecBfZ3hs15';


const app = express()
const port = process.env.PORT || 3000

const server = http.createServer(app)

app.use(express.json());
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser({limit: '50mb'}));



app.get('/', function (req, res) {


    res.sendFile(__dirname + `/public/index.html`);
});


app.get('/success', function (req, res) {
	console.log(req);
	console.log("*****************************");
	console.log(res);

    res.sendFile(__dirname + `/public/index.html`);
});



// Match the raw body to content type application/json
app.post('/hooks', bodyParser.raw({ type: 'application/json' }), (request, response) => {
    const sig =''; //request.headers['stripe-signature'];
    console.log(request.headers);
    console.log("======================================<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    let event;
    const payload = JSON.stringify(request.body, null, 2)
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.log('err===>>>',
         err);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Fulfill the purchase...
        handleCheckoutSession(session);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
});


server.listen(port, () => {
    console.log('Server is up on port ' + port)
})