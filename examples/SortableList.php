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
            display: inline-flex;
            width: 40rem;
            height: 80rem;
            background: green;
            flex-flow: row wrap;
            align-content: start;
            text-align: center;
        }
    </style>
</head>
<body>
    <button onclick="const a = document.createElement('div'); a.innerText = 'test'; a.classList.add('test'); document.getElementById('lst1').appendChild(a);">Add Item</button>
    <smartobj-sortable-list id='lst1' class="test2" x-padding="100" y-padding="100">
        <div class="test">1</div>
        <div class="test3">2</div>
        <div class="test">3</div>
        <div class="test3">4</div>
        <div class="test">5</div>
        <div class="test3">6</div>
        <div class="test">7</div>
        <div class="test3">8</div>
        <div class="test">9</div>
        <div class="test3">10</div>
        <div class="test">11</div>
        <div class="test3">12</div>
    </smartobj-sortable-list>
    <smartobj-sortable-list class="test2" style="background: purple" x-padding="100" y-padding="100" smartobj-sortable-list__draggable="false">
        <div class="test">1</div>
        <div class="test3">2</div>
    </smartobj-sortable-list>
</body>
</html>