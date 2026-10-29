import { useCartState } from '../../context';

interface CartBadgeProps {
  count?: number;
  onClick: () => void;
}

export function CartBadge({ count, onClick }: CartBadgeProps) {
  const cart = useCartState();
  const totalCount = count ?? cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      type="button"
      className="cart-badge-btn"
      onClick={onClick}
      aria-label={`Open shopping cart with ${totalCount} items`}
    >
      <svg
        className="cart-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="22"
        height="22"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.7 2.4-7.25H5.106m2.394 7.25L6 7.5m1.5 6.75 1.5 3.75m10.5-3.75-1.5 3.75"
        />
        <circle cx="9" cy="20" r="1" fill="currentColor" />
        <circle cx="17" cy="20" r="1" fill="currentColor" />
      </svg>
      <span className="cart-badge-count">{totalCount}</span>
    </button>
  );
}
