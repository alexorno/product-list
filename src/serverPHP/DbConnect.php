<?php 

class DbConnect {
    private $server = 'localhost';
    private $dbname = ' ';
    private $user = ' ';
    private $pass = ' ';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Database Error: " . $e->getMessage();
        } catch (Exception $e) {
            echo "General Error: ".$e->getMessage();
        }
    }
}