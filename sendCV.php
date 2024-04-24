<?php

// Define recipient details
define("RECIPIENT_NAME", "Hashtag Medya");
define("RECIPIENT_EMAIL", "info@hashtagmedya.com"); // Replace with your email address

// Read the form values
$userName = isset($_POST['name']) ? $_POST['name'] : "";
$userSurname = isset($_POST['surname']) ? $_POST['surname'] : "";
$userEmail = isset($_POST['email']) ? $_POST['email'] : "";
$subject = isset($_POST['subject']) ? $_POST['subject'] : "";
$city = isset($_POST['city']) ? $_POST['city'] : "";
$position = isset($_POST['position']) ? $_POST['position'] : "";
$portfolioLink = isset($_POST['portfolio']) ? $_POST['portfolio'] : "";
$salaryExpectation = isset($_POST['salary']) ? $_POST['salary'] : "";
$message = isset($_POST['message']) ? $_POST['message'] : "";

// Check if the file was uploaded successfully
if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    // File details
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileType = $_FILES['file']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));

    // Valid extensions
    $allowedExtensions = array("txt", "pdf", "doc", "docx");

    // Check if the file extension is valid
    if (in_array($fileExtension, $allowedExtensions)) {
        // File destination
        $uploadPath = "uploads/" . $fileName;

        // Move uploaded file to destination
        move_uploaded_file($fileTmpPath, $uploadPath);

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
        $emailBody .= "CV/Özgeçmiş: $uploadPath\n";

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
    } else {
        // Invalid file extension, redirect to error page
        header('Location: 404.html');
    }
} else {
    // File upload error, redirect to error page
    header('Location: 404.html');
}
?>