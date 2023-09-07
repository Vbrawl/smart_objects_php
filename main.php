<?php

namespace SMART_OBJECTS {
    require_once('relocation.php');
    require_once(DRAG_N_DROP_PATH.'/main.php');
    require_once(MULTI_DEVICE_SUPPORT_PATH.'/main.php');

    $drag_n_drop_loaded = false;
    function load_draggable() {
        global $drag_n_drop_loaded;
        if(!$drag_n_drop_loaded) {
            \DRAG_N_DROP\load_draggable();
            $drag_n_drop_loaded = true;
        }
    }

    $mds_loaded = false;
    function load_mds() {
        global $mds_loaded;
        if(!$mds_loaded) {
            \MULTI_DEVICE_SUPPORT\enable_all();
            $mds_loaded = true;
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

    function loadFileSelector() {
        load_mds();
        load_file(SMART_OBJECTS_PATH.'/src/FileSelector/FileSelector.css');
        load_file(SMART_OBJECTS_PATH.'/src/FileSelector/FileSelector.js', 'defer');
    }
}