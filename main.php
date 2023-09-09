<?php
// NOTE: We added "src" as resources to avoid sending the whole file through php
// load_file should just add a link to the file.
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
        load_file(SMART_OBJECTS_RESOURCES_PATH.'/SortableList/SortableList.js', 'defer');
    }

    function loadBurgerButton() {
        load_file(SMART_OBJECTS_RESOURCES_PATH.'/BurgerButton/BurgerButton.css');
        load_file(SMART_OBJECTS_RESOURCES_PATH.'/BurgerButton/BurgerButton.js', 'defer');
    }

    function loadFileSelector() {
        load_mds();
        load_file(SMART_OBJECTS_RESOURCES_PATH.'/FileSelector/FileSelector.css');
        load_file(SMART_OBJECTS_RESOURCES_PATH.'/FileSelector/FileSelector.js', 'defer');
    }
}