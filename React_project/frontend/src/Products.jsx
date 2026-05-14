import { useEffect, useState } from "react";

import API from "../services/api";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await API.get(
        "/products"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <h1>Fresh Products</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;