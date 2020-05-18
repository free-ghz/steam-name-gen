<?php
    // little module to import config from environment variables
    $env_conf = array();
    $env_conf["form_password"] = getenv("csgo_form_password");

    $env_conf["database_host"] = getenv("csgo_database_host");
    $env_conf["database_user"] = getenv("csgo_database_user");
    $env_conf["database_password"] = getenv("csgo_database_password");
    $env_conf["database"] = getenv("csgo_database");
?>