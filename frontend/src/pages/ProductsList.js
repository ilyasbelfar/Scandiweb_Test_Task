import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Product List | Scandiweb Test Task";
    return () => {
      document.title = "Scandiweb Test Task";
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/products");
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      setProducts([]);
      setSelectedProducts([]);
    };
  }, []);

  const handleMassDelete = async () => {
    if (selectedProducts?.length === 0) return;
    try {
      const { data } = await axios.post(
        "/products/delete",
        JSON.stringify(selectedProducts)
      );
      if (data.status === "success") {
        const updatedProducts = products.filter(
          (product) => !selectedProducts.includes(product?.sku)
        );
        setProducts(updatedProducts);
        setSelectedProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center p-4 border-bottom border-2 border-dark justify-content-between"
        style={{
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
        }}
      >
        <h2>Product List</h2>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              marginRight: "10px",
            }}
            onClick={() => navigate("/add-product")}
          >
            ADD
          </button>
          <button
            type="button"
            id="delete-product-btn"
            className="btn btn-info"
            style={{
              border: "none",
              outline: "none",
              cursor: selectedProducts?.length === 0 && "not-allowed",
              userSelect: selectedProducts?.length === 0 && "none",
              backgroundColor: selectedProducts?.length === 0 && "#828282",
            }}
            disabled={selectedProducts?.length === 0}
            onClick={handleMassDelete}
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <div className="container">
        <div
          className="row"
          style={{
            gap: "15px",
          }}
        >
          {!isLoading &&
            products?.length > 0 &&
            products.map((product) => (
              <div
                key={product?.id}
                className="col-6 col-md-3 text-center card p-4"
                style={{
                  width: "250px",
                  border:
                    selectedProducts?.includes(product?.sku) &&
                    "1px solid #0075ff",
                }}
                onClick={() => {
                  if (selectedProducts.includes(product?.sku)) {
                    setSelectedProducts(
                      selectedProducts.filter((sku) => sku !== product?.sku)
                    );
                  } else {
                    setSelectedProducts([...selectedProducts, product?.sku]);
                  }
                }}
              >
                <div
                  className="custom-control custom-checkbox"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input delete-checkbox"
                    checked={selectedProducts.includes(product?.sku)}
                    onChange={() => {
                      if (selectedProducts.includes(product?.sku)) {
                        setSelectedProducts(
                          selectedProducts.filter((sku) => sku !== product?.sku)
                        );
                      } else {
                        setSelectedProducts([
                          ...selectedProducts,
                          product?.sku,
                        ]);
                      }
                    }}
                  />
                </div>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product?.sku}
                </span>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  title={product?.name}
                >
                  {product?.name}
                </span>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  title={`$ ${product?.price}`}
                >
                  $ {product?.price}
                </span>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  title={product?.attribute_value}
                >
                  {product?.attribute_type === "DVD" &&
                    `Size: ${product?.attribute_value}`}
                  {product?.attribute_type === "Book" &&
                    `Weight: ${product?.attribute_value}`}
                  {product?.attribute_type === "Furniture" &&
                    `Dimensions: ${product?.attribute_value}`}
                </span>
              </div>
            ))}
          {!isLoading && products?.length === 0 && (
            <div className="col-12 text-center">
              <h5>No Products Found!</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
