<<<<<<< HEAD:test-file/User login/signin.php
<?php

include("config.php");
include("FIREBASE.php");



	$uname = ($_POST['uname']);
	$pass = ($_POST['password']);
	
	if(empty($uname)){
		echo "Email is required";
	}else if (empty($pass)){
		echo "password is required"
	}else{
		$rdb = new FIREBASE($databaseURL);
		$retrieve = $rdb->retrieve("/Login","/username", "EQUAL",$uname);
		$data = json_decode($retrieve, 1);
		
		if(count($data == 0)){
			echo "Username not registered";
		}else{
			$id = array_keys($data)[0];
			if($data[id]['password'] == $password){
				echo "Login sucess";
			}else{
				echo "Login failed";
			}
			
			
	}
	
	
}

?>
=======
<?php
$uname = $_POST['uname'];
$pass = $_POST['password'];

$validForm = true;

if (empty($uname) || empty($pass)) {
    ob_end_clean();
    header("Location: LOGIN.php?error=All fields are required");
    exit();
    $validForm = false; // This line is unreachable and can be removed
}

if ($validForm) {
    $file = fopen("users.txt", "r") or die("Unable to open file!");
    $loginFound = false;
    $adminpage = false;

    while (($line = fgets($file)) !== false) {
        $login = explode(",", $line);

        if (trim($login[1]) === $uname && trim($login[2]) === $pass) {
            if (trim($login[1]) === "admin") { // Added missing closing double quotes
                $adminpage = true;
                break;
            }

            $loginFound = true;
            break;
        }
    }

    fclose($file);

    if ($loginFound) {
        ob_end_clean();
        header("Location: https://gsu-demo-day.web.app/");
        exit();
    } else {
        ob_end_clean();
        header("Location: LOGIN.php?error=Incorrect Username or Password");
        exit();
    }
} else {
    ob_end_clean();
    header("Location: LOGIN.php?error=Error opening file");
    exit();
}



?>
>>>>>>> 2f72bae7b81a93f8962d091a46496f0e2e154f4d:front/User login/signin.php
