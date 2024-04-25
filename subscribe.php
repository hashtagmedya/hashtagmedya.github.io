<?php

// Define some constants
define( "RECIPIENT_NAME", "Hashtag Medya" );
define( "RECIPIENT_EMAIL", "info@hashtagmedya.com" ); //write your mail here

// Read the form values
$success = false;
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";

// If all values exist, send the email
if ( $senderEmail ) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . $senderEmail . "";
  $msgBody = " Email: ". $senderEmail . "";
  $success = mail( $recipient, $headers, $msgBody );

  //Set Location After Successsfull Submission
  header('Location: index.html?message=success');
}

else{
	//Set Location After Unsuccesssfull Submission
  	header('Location: 404.html?message=failed');	
}
?>