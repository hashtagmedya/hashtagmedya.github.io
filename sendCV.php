<?php

// Define recipient details
define("RECIPIENT_NAME", "Hashtag Medya");
define("RECIPIENT_EMAIL", "info@hashtagmedya.com"); // Replace with your email address

// Read the form values
$userName = isset($_GET['name']) ? $_GET['name'] : "";
$userSurname = isset($_GET['surname']) ? $_GET['surname'] : "";
$userEmail = isset($_GET['email']) ? $_GET['email'] : "";
$subject = isset($_GET['subject']) ? $_GET['subject'] : "";
$city = isset($_GET['city']) ? $_GET['city'] : "";
$position = isset($_GET['position']) ? $_GET['position'] : "";
$portfolioLink = isset($_GET['portfolio']) ? $_GET['portfolio'] : "";
$salaryExpectation = isset($_GET['salary']) ? $_GET['salary'] : "";
$message = isset($_GET['message']) ? $_GET['message'] : "";

// Construct email body
$emailBody = "Isim: $userName\n";
$emailBody .= "Soyisim: $userSurname\n";
$emailBody .= "Email: $userEmail\n";
$emailBody .= "Konu: $subject\n";
$emailBody .= "Şehir: $city\n";
$emailBody .= "Pozisyon: $position\n";
$emailBody .= "Portfolio Link: $portfolioLink\n";
$emailBody .= "Maas Beklentisi: $salaryExpectation\n";
$emailBody .= "Mesaj: $message\n";

// Set email headers
$headers = "From: $userName <$userEmail>";

// Send the email
$mailSent = mail(RECIPIENT_EMAIL, $subject, $emailBody, $headers);

// Check if the mail was sent successfully
if ($mailSent) {
    // Redirect to success page
    header('Location: kariyer.html?message=success');
} else {
    // Redirect to error page
    header('Location: 404.html');
}

?>