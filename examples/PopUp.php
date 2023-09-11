<?php
chdir('..');
require_once("relocation.php");

require_once(SMART_OBJECTS_PATH.'/main.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
    SMART_OBJECTS\loadPopUp();
    ?>
</head>
<body>
    <div style="width: 100px; height: 100px; background: red"></div>
    <smartobj-popup><div style="width: 1000px; height: 1000px; background: green"></div></smartobj-popup>
</body>
</html>