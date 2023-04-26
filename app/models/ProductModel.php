<?php
class ProductModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    // Get All Porducts
    public function getProducts()
    {
        $this->db->query("SELECT * FROM products ORDER BY id ASC");

        $results = $this->db->resultset();

        return $results;
    }

    public function deleteProductsBySKUs($skus)
    {
        $placeholders = implode(',', array_fill(0, count($skus), '?'));
        $this->db->query("DELETE FROM products WHERE sku IN ($placeholders)");
        foreach ($skus as $key => $sku) {
            $this->db->bind($key + 1, $sku);
        }
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkProductExists($sku)
    {
        $this->db->query("SELECT * FROM products WHERE sku = :sku");
        $this->db->bind(':sku', $sku);

        $row = $this->db->single();

        if ($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function addProduct($product)
    {
        $this->db->query("INSERT INTO products (sku, name, price, attribute_type, attribute_value) VALUES (:sku, :name, :price, :attribute_type, :attribute_value)");
        $this->db->bind(':sku', $product->getSku());
        $this->db->bind(':name', $product->getName());
        $this->db->bind(':price', $product->getPrice());
        $this->db->bind(':attribute_type', $product->getAttributeType());
        $this->db->bind(':attribute_value', $product->getAttributeValue());

        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
