<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $product = json_decode(file_get_contents('php://input'));
        // ALTERNATIVE TO DELETE METHOD, BECAUSE IOF RESTRICTIONS OF 000WEBHOST(which is not allowing delete methods)
            if($product->delete === 1){
                $delete_ids = $product->indexsId;
                $extracted_ids = implode(', ' , $delete_ids); 
        
                $sql = "DELETE FROM `products` WHERE ID IN($extracted_ids)";
                $stmt = $conn -> prepare($sql);
        
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => "Products with id:$extracted_ids deleted successfully."];
                }else{
                    $response = ['status' => 0, 'message' => 'Delete failed:('];
                }
                echo json_encode($response);
                break;
            }
        $sql = 'INSERT INTO products(ID, SKU, Name, Price, Type, Size) VALUES(null, :SKU, :Name, :Price, :Type, :Size)';
        $stmt = $conn -> prepare($sql);
        $stmt->bindParam(':SKU', $product->SKU);
        $stmt->bindParam(':Name', $product->name);
        $stmt->bindParam(':Price', $product->price);
        $stmt->bindParam(':Type', $product->type);
        $stmt->bindParam(':Size', $product->size);
        try{
            if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully'];
                }else{
                    $response = ['status' => 0, 'message' => 'Record failed.'];
                }
        }catch (PDOException $e) {
            echo $e->getMessage();
            break;
        }
        echo json_encode($response);
        break;
    case "GET":
        $sql = 'SELECT * FROM products';
        $stmt = $conn -> prepare($sql);
        $stmt-> execute();
        $products = $stmt-> fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
        break;

    // case "DELETE":
    //     $delete_ids = json_decode(file_get_contents('php://input'));
    //     $extracted_ids = implode(', ' , $delete_ids); 

    //     $sql = "DELETE FROM `products` WHERE ID IN($extracted_ids)";
    //     $stmt = $conn -> prepare($sql);

    //     if($stmt->execute()) {
    //         $response = ['status' => 1, 'message' => "Products with id:$extracted_ids deleted successfully."];
    //     }else{
    //         $response = ['status' => 0, 'message' => 'Delete failed:('];
    //     }
    //     echo json_encode($response);
    //     break;
    }