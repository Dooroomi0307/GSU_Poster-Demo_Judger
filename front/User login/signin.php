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
