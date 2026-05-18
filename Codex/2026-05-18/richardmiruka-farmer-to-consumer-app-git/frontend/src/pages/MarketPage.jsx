import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { http } from "../api/http";
import { ProductCard } from "../components/ProductCard";

export function MarketPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (category) params.set("category", category);

    setLoading(true);
    http
      .get(`/products?${params.toString()}`)
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [query, category]);

  return (
    <main>
      <section className="market-hero">
        <div>
          <p className="eyebrow">Fresh from nearby farms</p>
          <h1>Buy produce directly from farmers.</h1>
          <p>
            Browse local harvests, compare prices, and place orders without a middleman.
          </p>
        </div>
      </section>

      <section className="toolbar">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search produce"
          />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Tubers">Tubers</option>
          <option value="Grains">Grains</option>
        </select>
      </section>

      {loading ? (
        <p className="empty-state">Loading produce...</p>
      ) : (
        <section className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
