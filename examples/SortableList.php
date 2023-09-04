<?php
chdir('..');
require_once('main.php');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php SMART_OBJECTS\LoadSortableList(); ?>
    <style>
        .test, .test3 {
            width: 10rem;
            height: 10rem;
            background: red;
        }
        .test3 {
            background: blue;
        }
        .test2 {
            display: inline-block;
            width: 40rem;
            height: 80rem;
            background: green;
        }
    </style>
</head>
<body>
    <smartobj-sortable-list class="test2" x-padding="100" y-padding="100">
        <div class="test"></div>
        <div class="test3"></div>
    </smartobj-sortable-list>
</body>
</html>