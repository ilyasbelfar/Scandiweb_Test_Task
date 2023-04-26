import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container-fluid p-0">
                <ProductsList />
              </div>
            }
          />
          <Route
            path="/add-product"
            element={
              <div className="container-fluid p-0">
                <AddProduct />
              </div>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
