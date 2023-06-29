<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
   
    <title>Login</title>
    <link rel="stylesheet" href="LOGIN.css">
	
  </head>
  <body>
<header>
   <h1>GSU DEMO DAY </h1>
   <img src="gsu.jpg" class= "img">
</header>

    <form action="signin.php" method="post">
	
		<h2> LOGIN </h2>
		<?php if (isset($_GET['error' ])){ ?>
			<p class="error"><?php echo $_GET['error' ]; ?> </p>
		<?php }	?>
		<label> User Name</label>
		<input type="text" name="uname" placeholder="User Name"><br>
		
		<label> Password </label>
		<input type="password" name="password" placeholder="Password"><br>
		
		<button type="submit"> Login </button>
		
		</form>
	
  </body>
</html>