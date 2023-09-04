# Smart Objects
## Downloading
```
phppm download -pu https://github.com/vbrawl/smart_objects_php
```

## Installing
```
phppm init
phppm add smart_objects_php
phppm resolve
```

## Usage
```
<?php
require_once('relocation.php');
require_once(SMART_OBJECTS_PATH.'/main.php');


// in the <head>
// SMART_OBJECTS\Load[ObjectName]();
SMART_OBJECTS\LoadSortableList();
?>
```