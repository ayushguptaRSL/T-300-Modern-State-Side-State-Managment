import { memo } from 'react';
import { useSetAtom } from 'jotai';
import type { Product } from '../../types';
import { addItemAtom } from '../../atoms';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const addItem = useSetAtom(addItemAtom);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product);
    }
  };

  return (
    <div className="product-list-item">
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="add-to-cart-btn"
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
});
