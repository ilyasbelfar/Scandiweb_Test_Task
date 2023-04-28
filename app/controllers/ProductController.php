<?php

class ProductController extends Controller
{
    public function __construct()
    {
        $this->productModel = $this->model('ProductModel');
    }
    public function index()
    {
        $data = [
            "products" => $this->productModel->getProducts(),
        ];
        echo json_encode($data["products"]);
        header("HTTP/1.1 200 OK");
        die();
    }

    public function delete()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $selectedProducts = json_decode(file_get_contents('php://input'));
            if (is_array($selectedProducts) && count($selectedProducts) > 0) {

                $skuString = "'" . implode("', '", $selectedProducts) . "'";
                if ($this->productModel->deleteProductsBySKUs($selectedProducts)) {
                    echo json_encode(["status" => "success", "message" => "Product(s) with SKU(s): " . $skuString . " deleted successfully."]);
                    header("HTTP/1.1 200 OK");
                    die();
                } else {
                    echo json_encode(["status" => "error", "message" => "Product(s) with SKU(s): " . $skuString . " could not be deleted."]);
                    header("HTTP/1.1 400 Bad Request");
                    die();
                }
            } else {
                echo json_encode(["status" => "error", "message" => "No product selected."]);
                header("HTTP/1.1 400 Bad Request");
                die();
            }
        }
    }

    public function add()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $productBody = json_decode(file_get_contents('php://input'));
            if (
                !isset($productBody->sku) || $productBody->sku == "" ||
                !isset($productBody->name) || $productBody->name == "" ||
                !isset($productBody->price) || $productBody->price == "" ||
                !isset($productBody->productType) || $productBody->productType == "" ||
                !isset($productBody->attribute_value) || $productBody->attribute_value == ""
            ) {
                echo json_encode(["status" => "error", "message" => "Some required fields are missing!"]);
                header("HTTP/1.1 400 Bad Request");
                die();
            }
            if (!is_numeric($productBody->price)) {
                echo json_encode(["status" => "error", "message" => "Price must be a number!"]);
                header("HTTP/1.1 400 Bad Request");
                die();
            }
            if ($productBody->price < 0) {
                echo json_encode(["status" => "error", "message" => "Price must be a positive number!"]);
                header("HTTP/1.1 400 Bad Request");
                die();
            }
            if ($this->productModel->checkProductExists($productBody->sku)) {
                echo json_encode(["status" => "error", "message" => "Product with SKU: " . $productBody->sku . " already exists, please use a different SKU."]);
                header("HTTP/1.1 400 Bad Request");
                die();
            } else {
                $classname = $productBody->productType;
                $class_path = dirname(__DIR__) . '/models/' . str_replace('\\', '/', $classname) . '.php';
                unset($productBody->productType);
                if (file_exists($class_path)) $product = new $classname($productBody->sku, $productBody->name, $productBody->price, $productBody->attribute_value);
                else {
                    echo json_encode(["status" => "error", "message" => "Product type not found, please use a valid product type."]);
                    header("HTTP/1.1 404 Not Found");
                    die();
                }
                unset($productBody);
                if ($this->productModel->addProduct($product)) {
                    echo json_encode(["status" => "success", "message" => "Product with SKU: " . $product->getSku() . " added successfully."]);
                    header("HTTP/1.1 201 Created");
                    die();
                } else {
                    echo json_encode(["status" => "error", "message" => "Product with SKU: " . $product->getSku() . " could not be added."]);
                    header("HTTP/1.1 400 Bad Request");
                    die();
                }
            }
        }
    }

    public function notFound()
    {
        echo json_encode(["status" => "error", "message" => "Page not found."]);
        header("HTTP/1.1 404 Not Found");
        die();
    }
}
