var stripe = Stripe('pk_test_hJz5vbcdMzNe2hhaNf9XaXyt00BgZGiw8J');

var buttonCheckOut = document.querySelector('#buttonCheckOut');


buttonCheckOut.addEventListener('click', function(){

    console.log("click")

    stripe.redirectToCheckout({
        lineItems: [
          // Replace with the ID of your price
          {price: 'price_HKzIhChTtlvKRV', quantity: 1}
        ],
        mode: 'payment',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'https://example.com/cancel',
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });

})