<?php
    function connect($usr, $pw, $host, $db) {
        echo "a";
        $connection = mysqli_connect($host, $usr, $pw, $db);
        if ($connection === false) die("database");

        return new Csdb($connection);
    }

    class Csdb {
        private $connection;
        public function __construct($conn) {
            $this->connection = $conn;
        }

        public function test() {
            echo "Connect Successfully. Host info: " . mysqli_get_host_info($this->connection);
        }
    }
?>