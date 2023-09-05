<?php

namespace SMART_OBJECTS {
    require_once('relocation.php');
    require_once(DRAG_N_DROP_PATH.'/main.php');

    $drag_n_drop_loaded = false;
    function load_draggable() {
        global $drag_n_drop_loaded;
        if(!$drag_n_drop_loaded) {
            \DRAG_N_DROP\load_draggable();
            $drag_n_drop_loaded = true;
        }
    }


    function loadSortableList() {
        load_draggable();
        load_file(SMART_OBJECTS_PATH.'/src/SortableList/SortableList.js', 'defer');
    }

    function loadBurgerButton() {
        load_file(SMART_OBJECTS_PATH.'/src/BurgerButton/BurgerButton.css');
        load_file(SMART_OBJECTS_PATH.'/src/BurgerButton/BurgerButton.js', 'defer');
    }
}