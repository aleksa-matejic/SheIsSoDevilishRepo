<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 26-Sep-15
 * Time: 6:41 PM
 */
require 'database_functions.php';
if(updateStatistics($_POST['player'], $_POST['avoidedWhiteClouds'], $_POST['avoidedBlackClouds'], $_POST['avoidedArrows'], $_POST['distance'], $_POST['score'])){
    echo 'true';
}
?>