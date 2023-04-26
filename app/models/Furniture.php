<?php

class Furniture extends Product
{
    private $attribute_type = 'Furniture';
    private $attribute_value;

    public function __construct($sku, $name, $price, $attribute_value)
    {
        parent::__construct($sku, $name, $price);
        $this->attribute_value = $attribute_value;
    }

    public function getAttributeType()
    {
        return $this->attribute_type;
    }

    public function getAttributeValue()
    {
        return $this->attribute_value . " cm";
    }

    public function setAttributeValue($attribute_value)
    {
        $this->attribute_value = $attribute_value;
    }

    public function setAttributeType()
    {
        $this->attribute_type = 'Furniture';
    }
}
