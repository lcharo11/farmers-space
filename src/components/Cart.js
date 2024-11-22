import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css'; // Import the cart styles

const Cart = () => {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  const totalAmount = cart.length > 0 
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) 
    : 0;

  useEffect(() => {
    const loadPayPalScript = () => {
      if (cart.length === 0) return; // Skip loading if the cart is empty

      if (!window.paypal) {
        const script = document.createElement('script');
        script.src =
          "https://www.paypal.com/sdk/js?client-id=AS2rCXXNjWlGcDtO7b9Y-KBcE1iTR4m5iWomHGziBeLtnRW1fFKdZs3wr87f8wWp59u6GRyGaRTedfq7";
        script.addEventListener('load', () => {
          renderPayPalButton();
        });
        document.body.appendChild(script);
      } else {
        renderPayPalButton();
      }
    };

    const renderPayPalButton = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: totalAmount },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      }).render('#paypal-button-container');
    };

    loadPayPalScript();
  }, [totalAmount, cart]);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Your Shopping Cart</h1>
      </header>
      <div className="cart-container">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty. Add items to proceed to checkout.</p>
        )}
      </div>
      {cart.length > 0 && (
        <footer className="cart-footer">
          <p>Total: ${totalAmount}</p>
          <div id="paypal-button-container"></div>
        </footer>
      )}
    </div>
  );
};

export default Cart;