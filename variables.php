<?php
    // little module to import config from environment variables
    $env_conf = array();
    $env_conf["form_password"] = getenv("CSGO_FORM_PASSWORD");

    $env_conf["database_host"] = getenv("CSGO_DATABASE_HOST");
    $env_conf["database_user"] = getenv("CSGO_DATABASE_USER");
    $env_conf["database_password"] = getenv("CSGO_DATABASE_PASSWORD");
    $env_conf["database"] = getenv("CSGO_DATABASE");
?>