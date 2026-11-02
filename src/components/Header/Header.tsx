import { Toolbar } from './Toolbar';

interface HeaderProps {
  cartCount?: number;
  onOpenCart: () => void;
  onOpenPayment?: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenPayment,
}: HeaderProps) {
  return (
    <header className="header">
      <Toolbar
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenPayment={onOpenPayment}
      />
    </header>
  );
}
