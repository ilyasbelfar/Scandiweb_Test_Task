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
            if ($this->productModel->checkProductExists($productBody->sku)) {
                echo json_encode(["status" => "error", "message" => "Product with SKU: " . $productBody->sku . " already exists, please use a different SKU."]);
                header("HTTP/1.1 400 Bad Request");
                die();
            } else {
                if (strtolower($productBody->productType) == "book") {
                    $product = new Book($productBody->sku, $productBody->name, $productBody->price, $productBody->weight);
                } else if (strtolower($productBody->productType) == "dvd") {
                    $product = new DVD($productBody->sku, $productBody->name, $productBody->price, $productBody->size);
                } else if (strtolower($productBody->productType) == "furniture") {
                    $dimensions = "$productBody->height x $productBody->width x $productBody->length";
                    $product = new Furniture($productBody->sku, $productBody->name, $productBody->price, $dimensions);
                    unset($dimensions);
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
