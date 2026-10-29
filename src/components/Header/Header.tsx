import { Toolbar } from './Toolbar';

interface HeaderProps {
  cartCount?: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="header">
      <Toolbar cartCount={cartCount} onOpenCart={onOpenCart} />
    </header>
  );
}
