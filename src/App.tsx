import { useState } from 'react';
import { CartProvider } from './context';
import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';
import { CartDrawer } from './components/CartDrawer/CartDrawer';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app-container">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className="main-content">
        <Catalog />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          alert('Proceeding to checkout...');
        }}
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
