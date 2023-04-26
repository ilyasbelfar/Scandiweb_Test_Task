<?php

class Core
{
    private $currentController = "ProductController";
    private $currentMethod = "index";
    private $params = [];
    private $lastindex = 0;


    public function __construct()
    {
        $url = $this->getUrl();
        $url = $this->getController($url);
        $url = $this->getMethod($url);
        $this->params = $url ? array_values($url) : [];
        if (isset($this->currentMethod)) {
            try {
                call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
            } catch (Exception $e) {
                echo $e;
            }
        }
    }
    public function __toString()
    {
        return (string) $this->currentMethod;
    }
    //get Url 
    public function getUrl()
    {
        if (isset($_GET["url"])) {
            $url = rtrim($_GET["url"]);
            $url = trim($url, "/");
            $url = filter_var($url, FILTER_SANITIZE_URL);
            return explode('/', $url);
        }
    }
    //get controller
    public function getController($url)
    {
        try {
            $fullUrl = $url;
            if (isset($fullUrl[0])) {
                if (file_exists('../app/controllers/' . $fullUrl[0] . '.php')) {
                    $this->currentController = $fullUrl[0];
                    unset($fullUrl[0]);
                    $this->lastindex = 0;
                } else {
                    $this->currentController = "ProductController";
                    $this->lastindex = 0;
                    if (!isset($fullUrl[1]) && strtolower($fullUrl[0]) != "products") {
                        $this->currentMethod = "notFound";
                    }
                }
            }
            require_once('../app/controllers/' . $this->currentController . '.php');
            $this->currentController = new  $this->currentController;
            return $fullUrl;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
    //get method
    public function getMethod($url)
    {
        try {
            if (isset($url[++$this->lastindex])) {
                if (method_exists($this->currentController, $url[$this->lastindex])) {
                    $this->currentMethod = $url[$this->lastindex];
                    unset($url[$this->lastindex]);
                } else {
                    $this->currentMethod = "notFound";
                    $this->lastindex = 0;
                }
                return $url;
            }
        } catch (Exception $e) {
            echo "</br> <span style='color:red'>No Method Found </span>";
        }
    }
}
