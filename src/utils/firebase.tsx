import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { CartItem } from "../components/ProductData/ProductData"; 

const firebaseConfig = {
  apiKey: "AIzaSyBnJfYZdc-Kn_--7U-dSASzaPStj8_gFWg",
  authDomain: "easyshop-fe29c.firebaseapp.com",
  databaseURL: "https://easyshop-fe29c-default-rtdb.firebaseio.com",
  projectId: "easyshop-fe29c",
  storageBucket: "easyshop-fe29c.appspot.com",
  messagingSenderId: "47074604736",
  appId: "1:47074604736:web:74610ff76808efc7f61f25",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

const findId = (userId: string) => {
  return encodeURIComponent(userId);
};

export const saveCartToFirebase = async (
  userId: string,
  cartItems: CartItem[]
) => {
  try {

    const cartData = {
      items: cartItems,
    };

    const encodedUserId = findId(userId);

    const firebaseURL = `https://easyshop-fe29c-default-rtdb.firebaseio.com/cart.json`;

    const response = await fetch(firebaseURL, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData), 
    });

    if (response.ok) {
      console.log("Cart items added successfully to Firebase.");
    } else {
      const errorDetails = await response.json();
      console.error(
        "Failed to save cart to Firebase:",
        response.statusText,
        errorDetails
      );
    }
  } catch (error) {
    console.error("Error saving cart to Firebase:", error);
  }
};

export const loadCartFromFirebase = async (userId: string) => {
  try {
    const encodedUserId = findId(userId);
    const firebaseURL = `https://easyshop-fe29c-default-rtdb.firebaseio.com/cart.json`;

    const response = await fetch(firebaseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const cartData = await response.json();
      return cartData?.items ? cartData.items : []; 
    } else {
      const errorDetails = await response.json();
      console.error(
        "Failed to load cart from Firebase:",
        response.statusText,
        errorDetails
      );
      return [];
    }
  } catch (error) {
    console.error("Error loading cart from Firebase:", error);
    return [];
  }
};
