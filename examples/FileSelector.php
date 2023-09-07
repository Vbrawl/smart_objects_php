<?php
chdir('..');
require_once("relocation.php");
require_once('main.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php SMART_OBJECTS\loadFileSelector(); ?>
</head>
<body>
    <smartobj-file-selector label="Drag and Drop your files here."></smartobj-file-selector>
</body>
</html>