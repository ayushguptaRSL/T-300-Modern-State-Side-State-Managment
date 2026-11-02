import { useState } from 'react';
import { Provider, useSetAtom } from 'jotai';
import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { clearCartAtom } from './atoms';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const clearCart = useSetAtom(clearCartAtom);

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
          clearCart();
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Provider>
      <AppContent />
    </Provider>
  );
}

export default App;
