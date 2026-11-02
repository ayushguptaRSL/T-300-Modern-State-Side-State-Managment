import { useState } from 'react';
import { CheckoutContext } from './context/CheckoutContext';
import { CartSynchronizer } from './components/bridges/CartSynchronizer';
import { OrderCompletionBridge } from './components/bridges/OrderCompletionBridge';
import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { PaymentPanel } from './components/PaymentPanel/PaymentPanel';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleOpenPayment = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handleBackToCart = () => {
    setIsPaymentOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="app-container">
      <CartSynchronizer />
      <OrderCompletionBridge />
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPayment={() => setIsPaymentOpen(true)}
      />
      <main className="main-content">
        <Catalog />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleOpenPayment}
      />
      <PaymentPanel
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onBackToCart={handleBackToCart}
      />
    </div>
  );
}

function App() {
  return (
    <CheckoutContext.Provider>
      <AppContent />
    </CheckoutContext.Provider>
  );
}

export default App;
