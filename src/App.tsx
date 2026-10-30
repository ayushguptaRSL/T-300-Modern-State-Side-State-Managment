import { useState } from 'react';
import { CartProvider } from './context';
import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { useCartStore } from './store/cartStore';
import { useShallow } from 'zustand/react/shallow';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { checkout, clearCart } = useCartStore(
    useShallow(({ checkout, clearCart }) => ({ checkout, clearCart })),
  );

  const handleCheckout = async () => {
    try {
      await checkout();
      clearCart();
      setIsCartOpen(false);
      alert('Order placed successfully.');
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Checkout failed. Please try again.',
      );
    }
  };

  return (
    <div className="app-container">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className="main-content">
        <Catalog />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => void handleCheckout()}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
