<?php
    class Database {
        private $connection;
        private $config = "../config/config.json";

        public function __construct()
        {
            $configurations = json_decode(file_get_contents($this->config,1),true);

            $host = $configurations["host"];
            $dbname = $configurations["database-name"];
            $username = $configurations["username"];
            $password = $configurations["password"];

            $dsn = "mysql:host=$host;dbname=$dbname";

            $this->connection = new PDO($dsn,$username,$password);
        }

        public function getConnection() {
            return $this->connection;
        }
    }
?>