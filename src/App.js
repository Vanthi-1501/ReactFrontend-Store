import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer.js';
import Main from './layouts/Main';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import "./assets/sass/bootstrap.scss";
import "./assets/sass/app.scss";
import "./assets/css/modern-theme.css";


import AIChatWidget from './components/AIChat/AIChatWidget';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <Main />
        <Footer />
        <AIChatWidget />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;