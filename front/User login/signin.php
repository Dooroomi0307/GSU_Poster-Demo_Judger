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
