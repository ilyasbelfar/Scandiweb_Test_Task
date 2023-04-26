<?php
class Controller
{
    public function model($model)
    {
        $model = ucwords($model);
        if (file_exists('../app/models/' . $model . '.php')) {
            require_once('../app/models/' . $model . '.php');
            return new $model();
        } else
            throw new Exception("Model: '" . $model . "' does not Exists");
    }
}
