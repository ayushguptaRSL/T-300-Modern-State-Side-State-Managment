import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { getProducts } from '../../api';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  onAddToCart?: (product: Product) => void;
}

export function Catalog({ onAddToCart }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getProducts()
      .then((data) => {
        if (!ignore) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setLoading(false);
      });
  };

  return (
    <section className="catalog-container">
      <div className="catalog-header">
        <h2 className="catalog-title">Product Catalog</h2>
      </div>

      {loading && (
        <div className="catalog-loading">
          <div className="spinner" />
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="catalog-error">
          <p>Error loading catalog: {error}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="catalog-empty">No products available in the catalog.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
