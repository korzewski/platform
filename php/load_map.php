<?php
	$mapName = $_POST['map_name'];

	$loaded_map = file_get_contents('../maps/'.$mapName.'.map');
	echo $loaded_map;
?>