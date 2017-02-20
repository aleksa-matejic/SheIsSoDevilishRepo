<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 24-Sep-15
 * Time: 12:58 AM
 */
/*if(!isset($_SESSION['guest']) || !isset($_SESSION['username']))
{
    header('Location: playGame.php?illegalAction');
}*/
?>
<link rel="stylesheet" href="style/game.css">

<div id="gameDiv">

    <canvas id="sky" class="gameCanvas" width="900" height="500"></canvas>
    <canvas id="clouds" class="gameCanvas" width="900" height="500"></canvas>
    <canvas id="devil" class="gameCanvas" width="900" height="500"></canvas>
    <canvas id="guardianAngel" class="gameCanvas" width="900" height="500"></canvas>
    <canvas id="angel" class="gameCanvas" width="900" height="500"></canvas>
    <canvas id="finalScore" class="gameCanvas" width="900" height="500"></canvas>
    <canvas id="buttons" class="gameCanvas" width="900" height="500"></canvas>

    <!--<div id="statistics" class="gameCanvas statisticsDiv" display="none"></div>-->

    <div id="music">
        <embed src="music/song.mp3" autostart="true" loop="infinite" width="2" height="0" />
    </div>
    <input type="text" id="username" value="<?php if(isset($_SESSION['username'])) echo $_SESSION['username']; else if(isset($_SESSION['guest'])) echo $_SESSION['guest']; ?>" hidden>

</div>

<script src="script/game.js"></script>
<script> init(); </script>