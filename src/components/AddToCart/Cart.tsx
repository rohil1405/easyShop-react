import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearCart,
  removeFromCart,
  setCartItems,
  updateQuantity,
} from "../store/CartSlice";
import { RootState } from "../store/store";
import { saveCartToFirebase, loadCartFromFirebase } from "../../utils/firebase";
import DeleteIcon from "../../assets/delete icon.png";
import emptyCart from "../../assets/empty-cart.png";
import "./Cart.scss";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const user = useSelector((state: RootState) => state.user.user) as {
    email: string;
  } | null;

  useEffect(() => {
    const syncCartWithFirebase = async () => {
      if (user) {
        try {
          const firebaseCartItems = await loadCartFromFirebase(user.email);
          if (Array.isArray(firebaseCartItems)) {
            dispatch(setCartItems(firebaseCartItems));
          } else {
            console.error(
              "Invalid data format from Firebase:",
              firebaseCartItems
            );
          }
        } catch (error) {
          console.error("Error syncing cart with Firebase:", error);
        }
      }
    };
    syncCartWithFirebase();
  }, [dispatch, user]);

  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        try {
          await saveCartToFirebase(user.email, cartItems);
        } catch (error) {
          console.error("Failed to save cart to Firebase:", error);
        }
      }
    };
    saveCart();
  }, [cartItems, user]);

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleIncrement = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: Math.max(quantity - 1, 1) }));
  };

  const handleVisitStore = () => {
    navigate("/Home");
  };

  const handleCheckOut = async () => {
    if (!user) return;

    try {
      dispatch(clearCart());
      await saveCartToFirebase(user.email, []); 
      localStorage.removeItem("cartItems");
      toast.success("Successfully checked out!");
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container">
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <img src={emptyCart} alt="empty cart" />
            <p>There are no products in the cart</p>
          </>
        ) : (
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.images.slice(0, 1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product ${item.id} - ${index}`}
                          className="cart-item-image"
                        />
                      ))}
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleDecrement(item.id, item.quantity)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => handleIncrement(item.id, item.quantity)}
                      >
                        +
                      </button>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <img
                        src={DeleteIcon}
                        alt="delete"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <div className="cta-btn" onClick={handleCheckOut}>
              <button>Checkout</button>
            </div>
          </div>
        )}
        <button onClick={handleVisitStore}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
