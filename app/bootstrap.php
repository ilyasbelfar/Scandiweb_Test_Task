<?php

require_once("config/env.php");

// Autoload libs
spl_autoload_register(function ($classname) {
    $class_path = __DIR__ . '/libs/' . str_replace('\\', '/', $classname) . '.php';
    if (file_exists($class_path)) require_once($class_path);
});

// Autoload models
spl_autoload_register(function ($classname) {
    $class_path = __DIR__ . '/models/' . str_replace('\\', '/', $classname) . '.php';
    if (file_exists($class_path)) require_once($class_path);
});

// Autoload controllers
spl_autoload_register(function ($classname) {
    $class_path = __DIR__ . '/controllers/' . str_replace('\\', '/', $classname) . '.php';
    if (file_exists($class_path)) require_once($class_path);
});

$core = new Core();
