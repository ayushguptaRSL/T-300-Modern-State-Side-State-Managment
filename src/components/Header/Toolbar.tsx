import { CartBadge } from './CartBadge';

interface ToolbarProps {
  cartCount?: number;
  onOpenCart: () => void;
}

export function Toolbar({ cartCount, onOpenCart }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-brand">
        <h2 className="brand-title">TechStore</h2>
      </div>
      <div className="toolbar-actions">
        <CartBadge count={cartCount} onClick={onOpenCart} />
      </div>
    </div>
  );
}
