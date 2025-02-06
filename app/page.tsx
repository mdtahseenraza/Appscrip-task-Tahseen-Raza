'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [customizable, setCustomizable] = useState(false);
  const [filters, setFilters] = useState({
    idealFor: 'all',
    occasion: 'all',
    fabric: 'all',
  });

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const sortProducts = (products: Product[]) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filteredProducts = sortProducts(products);

  return (
    <>
      <div className="developer-credit">
        Developed by Tahseen Raza
      </div>
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">
            TAHSEEN FASHION STORE
          </a>
          <nav className="nav">
            <a href="#" className="nav-link">SHOP</a>
            <a href="#" className="nav-link">FREE</a>
            <a href="#" className="nav-link">STORIES</a>
            <a href="#" className="nav-link">ABOUT</a>
            <a href="#" className="nav-link">CONTACT</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="products-header">
          <h1>Our Fake Products 😂</h1>
          <div className="products-count">{products.length} ITEMS</div>
          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <aside className="sidebar">
            <div className="filter-section">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={customizable}
                  onChange={(e) => setCustomizable(e.target.checked)}
                />
                CUSTOMIZABLE
              </label>
            </div>

            <div className="filter-section">
              <div className="filter-title">
                IDEAL FOR
                <span>▼</span>
              </div>
              <select
                value={filters.idealFor}
                onChange={(e) =>
                  setFilters({ ...filters, idealFor: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div className="filter-section">
              <div className="filter-title">
                OCCASION
                <span>▼</span>
              </div>
              <select
                value={filters.occasion}
                onChange={(e) =>
                  setFilters({ ...filters, occasion: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div className="filter-section">
              <div className="filter-title">
                FABRIC
                <span>▼</span>
              </div>
              <select
                value={filters.fabric}
                onChange={(e) =>
                  setFilters({ ...filters, fabric: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="cotton">Cotton</option>
                <option value="polyester">Polyester</option>
              </select>
            </div>
          </aside>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={`Image of ${product.title}`}
                  title={`Product: ${product.title} | Price: $${product.price} | Category: ${product.category}`}
                  className="product-image"
                  loading="lazy"
                />
                <button className="wishlist-button" aria-label="Add to wishlist">
                  <Heart size={20} />
                </button>
                <div className="product-info">
                  <h2 className="product-title">{product.title}</h2>
                  <div className="product-category">{product.category}</div>
                  <div className="product-price">${product.price}</div>
                </div>
                <div className="product-tooltip">
                  <strong>{product.title}</strong><br />
                  Price: ${product.price}<br />
                  Category: {product.category}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="developer-info">
            Developed by Tahseen Raza
            <div>
              <a href="https://github.com/mdtahseenraza" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {' | '}
              <a href="https://www.linkedin.com/in/md-tahseen-raza/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              {' | '}
              <a href="mailto:tahseenraza12803@gmail.com">
                tahseenraza12803@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
