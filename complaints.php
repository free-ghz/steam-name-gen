<?php
    require_once("variables.php"); // gives $env_conf
    $simsalabim = $env_conf["form_password"];

    // i drink a bottle of wine
    // then i check if u r authorized
    if (!isset($_POST)) die("idiot1");
    if (!array_key_exists("area", $_POST)) die("idiot2");
    if (!array_key_exists("idiot", $_POST)) die("idiot3");

    $password = $_POST["idiot"];
    print_r($_SERVER);
    print_r($_ENV);
    if (strtolower($password) !== strtolower($simsalabim)) die("idiot");

    $content = $_POST["area"];

    // good to go i hope
    // https://open.spotify.com/track/48BXIRrzrLXlRMg2Tt6pS5?si=yf8uJptlRo23AoCm1tLNwg

    require_once("datatalk.php");
    $db = connect(
        $env_conf["database_user"],
        $env_conf["database_password"],
        $env_conf["database_host"],
        $env_conf["database"]
    );

    $db->test();



?>