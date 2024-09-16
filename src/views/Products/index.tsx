import React, { useEffect, useState } from "react";
import MenuList from "src/components/Navbar";
import ProductCard from "src/components/ProductCard";
import "./style.scss";

const Products: React.FC = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [searchProduct, setSearchProduct] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };

  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProductData(data.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="product-page">
      <MenuList />
      <div className="search">
        <p>You can find your product: </p>
        <input
          className="search-input"
          value={searchProduct}
          onChange={handleSearch}
          placeholder="Search ..."
        />
      </div>
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
