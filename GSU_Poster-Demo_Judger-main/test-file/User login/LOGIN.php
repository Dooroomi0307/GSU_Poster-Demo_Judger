<?php
$username = $_POST['uname'];
$password = $_POST['password'];

// Read the contents of the users.txt file
$users = file("users.txt", FILE_IGNORE_NEW_LINES); // reads for users.txt file

// Initialize variables for user type
$participant = false;
$judge = false;
$admin = false;

// Check if the user exists in the users.txt file and determine the user type
foreach ($users as $user) {
    $userData = explode(",", $user);
    if ($userData[0] === "participant" && $userData[1] === $username && $userData[2] === $password) { //checks for participant login info match
        $participant = true;
        break;
    } elseif ($userData[0] === "judge" && $userData[1] === $username && $userData[2] === $password) { // checks for judge login info match
        $judge = true;
        break;
    } elseif ($userData[0] === "admin" && $userData[1] === $username && $userData[2] === $password) { // checks for admin login info match
        $admin = true;
        break;
    }
}

// Redirect users based on their user type
if ($participant) {
    // Redirect regular users to the regular user page
    header("Location: https://gsu-demo-day.web.app/");  // directs participant to Olivia's participant view other participant page
    exit();
} elseif ($judge) {
    // Redirect judges to the judge page
    header("Location: https://icollege.gsu.edu/"); // directs jugdes to icollege for now since we don't have a completed judge page yet
    exit();
} elseif ($admin) {
    // Redirect admins to the admin page
    header("Location: https://www.instagram.com/");
    exit();
} else {
    // Invalid login credentials, redirect back to the login page
    header("Location: login.php?error=invalid"); // directs admins to instagram since we dont have an admin page yet 
    exit();
}
?>
