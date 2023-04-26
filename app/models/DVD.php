<?php

class DVD extends Product
{
    private $attribute_type = 'DVD';
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
        return $this->attribute_value . " MB";
    }

    public function setAttributeValue($attribute_value)
    {
        $this->attribute_value = $attribute_value;
    }

    public function setAttributeType()
    {
        $this->attribute_type = 'DVD';
    }
}
