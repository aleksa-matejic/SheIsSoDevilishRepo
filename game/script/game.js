/**
 * Created by Aleksa on 24-Sep-15.
 */

var pathGameBackgroundImage = 'images/gameBackground.png';
var canvasHeight = 500;
var canvasWidth = 900;
var sky;
var x;
var dx; //0.75;
var clearWidth;
var clearHeight;
var ctxSky;
var scale = 1.05;
var y = -4.5; //vertical offset
var speed; //lower is faster normal speed = 5 slow speed = 30 fast speed = 1
var ctxClouds;
var cloudCreateTimeControl;
var player;
var startVAR;
var ctxDevil;
var devilDistanceVAR;
var angelDistanceVAR;
var drawAngelVAR;
var drawGuardianAngelStartVAR;

function start() {
    clearInterval(startVAR);
    startVAR = setInterval(function(){draw()}, speed);

    clearInterval(devilDistanceVAR);
    devilDistanceVAR = setInterval(function(){devilDistance()}, speed);
}

function start2() {
    start();

    clearInterval(angelDistanceVAR);
    angelDistanceVAR = setInterval(function(){angelDistance()}, 1);

    clearInterval(drawAngelVAR);
    drawAngelVAR = setInterval(function(){drawAngel()}, 1);

    clearInterval(drawGuardianAngelStartVAR);
    drawGuardianAngelStartVAR = setInterval(function () {
        clearInterval(drawGuardianAngelVAR);
        drawGuardianAngelVAR = setInterval(function () {drawGuardianAngel()}, 1);
    }, 10000);
}

function normalSpeed() {
    speed = 5;
    dx = 1;
    dxA = 1;
    cloudCreateTimeControl = 30;
    start();
}

function fastSpeed() {
    speed = 1;
    dx = 5;
    dxA = 4;
    cloudCreateTimeControl = 100;
    start();
}

function slowSpeed() {
    speed = 30;
    dx = 1;
    dxA = 3;
    cloudCreateTimeControl = 100;
    start();
}

function draw() {
    drawSky();
    drawScore();
    drawClouds();
    drawDevil();
    arrowCollisionDetection();
    cloudsCollisionDetection();
    angelCollisionDetection();
    if(gameOver){
        stopGame();
        var millisecondsToWait = 1000;
        setTimeout(function() {
            init();
            canvasButtons.style.display = "block";
        }, millisecondsToWait)
    }
    if(isSlow()){
        devil.distance += dx;
        slowSpeed();
    }
}

function init() {
    initVars();
    initPlayButton();
    initSky();
    initClouds();
    initDevil();
    initAngel();
    initGuardianAngel();
    initStatistics();
    initDrawFinalScore();
    drawSky();
    drawPlayButton();
}

function initVars() {
    speed = 5;
    dx = 1;
    dxA = 1;
    cloudCreateTimeControl = 30;
    gameOver = 0;
    whiteCloudHit = 0;
    slowCounter = 0;
}

/****** SKY ******/

function Sky() {

    this.image =  new Image();
    this.image.src = pathGameBackgroundImage;
    this.height = this.image.height * scale;
    this.width = this.image.width * scale;

}

function initSky() {
    sky = new Sky();

    if (sky.width > canvasWidth) { x = canvasWidth - sky.width; } // image larger than canvas
    if (sky.width > canvasWidth) { clearWidth = sky.width; } // image larger than canvas
    else { clearWidth = canvasWidth; }
    if (sky.height > canvasHeight) { clearHeight = sky.height; } // image larger than canvas
    else { clearHeight = canvasHeight; }

    ctxSky = document.getElementById('sky').getContext('2d');
    player = document.getElementById("username").value;

    ctxSky.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawSky() {
    // clear canvas
    ctxSky.clearRect(0, 0, canvasWidth, canvasHeight);
    // reset, start from beginning
    if (x > (canvasWidth)) { x = canvasWidth - sky.width; }
    // draw additional image
    if (-x > (canvasWidth - sky.width)) { ctxSky.drawImage(sky.image, -x - sky.width + 1, y, sky.width, sky.height); }
    // draw image
    ctxSky.drawImage(sky.image, -x, y, sky.width, sky.height);

    // amount to move
    x += dx;
}

function drawScore() {
    ctxSky.fillStyle = 'yellow';
    ctxSky.strokeStyle = 'black';
    ctxSky.lineWidth = 2;
    ctxSky.font = 'normal bold 40px "new century schoolbook"';
    var text = "" +statistics.generateScore();
    ctxSky.fillText(text, 800, 50, 80);
    ctxSky.strokeText(text ,800, 50, 80);

    text = statistics.player;
    ctxSky.fillText(text, canvasWidth / 2 - 60, 50, 120);
    ctxSky.strokeText(text, canvasWidth / 2 - 60, 50, 120);
}

function Point(posX, posY) {
    this.posX = posX;
    this.posY = posY;
}

/****** CLOUDS ******/

var clouds;
var cloudHeight = 100;
var cloudWidth = 150;
var blackCloud = 1;
var whiteCloud = 2;
var pathBlackCloud = 'images/blackCloud.jpg';
var pathWhiteCloud = 'images/whiteCloud.jpg';
var maxCloudCount = 6;

// HARD CODDED POSITIONS
function Cloud(type, posX, posY) {
    this.type = type;
    this.posX = posX;
    this.posY = posY;
    this.height = cloudHeight;
    this.width = cloudWidth;
    this.image = new Image();
    this.image.height = cloudHeight;
    this.image.width = cloudWidth;
    this.points = [];
    if(this.type == blackCloud){
        this.image.src = pathBlackCloud;
        this.points[0] = new Point(this.posX + 1, this.posY + 62);
        this.points[1] = new Point(this.posX + 10, this.posY + 75);
        this.points[2] = new Point(this.posX + 45, this.posY + 75);
        this.points[3] = new Point(this.posX + 55, this.posY + 95);
        this.points[4] = new Point(this.posX + 90, this.posY + 100);
        this.points[5] = new Point(this.posX + 74, this.posY + 101);
        this.points[6] = new Point(this.posX + 105, this.posY + 75);
        this.points[7] = new Point(this.posX + 143, this.posY + 75);
        this.points[8] = new Point(this.posX + 143, this.posY + 50);
        this.points[9] = new Point(this.posX + 150, this.posY + 63);
        this.points[10] = new Point(this.posX + 138, this.posY + 29);
        this.points[11] = new Point(this.posX + 110, this.posY + 22);
        this.points[12] = new Point(this.posX + 41, this.posY + 24);
        this.points[13] = new Point(this.posX + 74, this.posY + 1);
        this.points[14] = new Point(this.posX + 16, this.posY + 29);
        this.points[15] = new Point(this.posX + 10, this.posY + 52);
    }
    else if(this.type == whiteCloud){
        this.image.src = pathWhiteCloud;
        this.points[0] = new Point(this.posX + 1, this.posY + 65);
        this.points[1] = new Point(this.posX + 15, this.posY + 88);
        this.points[2] = new Point(this.posX + 37, this.posY + 101);
        this.points[3] = new Point(this.posX + 67, this.posY + 98);
        this.points[4] = new Point(this.posX + 94, this.posY + 103);
        this.points[5] = new Point(this.posX + 115, this.posY + 95);
        this.points[6] = new Point(this.posX + 150, this.posY + 69);
        this.points[7] = new Point(this.posX + 125, this.posY + 40);
        this.points[8] = new Point(this.posX + 106, this.posY + 25);
        this.points[9] = new Point(this.posX + 70, this.posY + 1);
        this.points[10] = new Point(this.posX + 33, this.posY + 32);
        this.points[11] = new Point(this.posX + 16, this.posY + 42);
    }
}

function initClouds() {
    clouds = [];
    ctxClouds = document.getElementById('clouds').getContext('2d');
    ctxClouds.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawClouds() {
    // clear canvas
    ctxClouds.clearRect(0, 0, canvasWidth, canvasHeight);

    // create new cloud
    if(randomBetween(1, 10000) < cloudCreateTimeControl){
        createCloud();
    }

    // if cloud get out from canvas delete it from array
    for(var i = 0; i < clouds.length; i++){
        if(clouds[i].posX < -(clouds[i].width)){
            if(clouds[i].type == blackCloud){
                statistics.avoidedBlackClouds++;
            }
            else if(clouds[i].type == whiteCloud){
                statistics.avoidedWhiteClouds++;
            }
            clouds.splice(i, 1);
        }
    }

    // move clouds for dx and draw on new position
    for(var i = 0; i < clouds.length; i++){
        clouds[i].posX -= dx;
        for(var j = 0; j < clouds[i].points.length; j++){
            clouds[i].points[j].posX -= dx;
        }
        ctxClouds.drawImage(clouds[i].image, clouds[i].posX, clouds[i].posY, cloudWidth, cloudHeight);
    }
}

function createCloud() {
    if(clouds.length < maxCloudCount){
        clouds[clouds.length] = new Cloud(randomBetween(1, 2), canvasWidth, randomBetween(1, canvasHeight - cloudHeight));
    }
}

function randomBetween(min, max) {
    return Math.floor((Math.random() * max) + min);
}

/****** DEVIL ******/

var pathDevil = 'images/devil.jpg';
var devilHeight = 80;
var devilWidth = 80;
var devilPosY = 0;
var devilPosX = 5;
var devilStartDistance = 0;

function Devil() {
    this.image = new Image();
    this.image.src = pathDevil;
    this.image.height = devilHeight;
    this.image.width = devilWidth;
    this.posX = devilPosX;
    this.posY = devilPosY;
    this.height = devilHeight;
    this.width = devilWidth;
    this.distance = devilStartDistance;
    this.radius = (devilWidth / 2) - 2;
}

var devil;
var devilMoveSpeed = 2;

function initDevil() {
    ctxDevil = document.getElementById('devil').getContext('2d');
    devil = new Devil();
    window.addEventListener('keydown', function (event) {
        moveDevil(event);
    }, false);
    window.addEventListener('keyup', function (event) {
        moveDevilStop(event);
    }, false);
    ctxDevil.clearRect(0, 0, canvasWidth, canvasHeight);
    controlMovementUp = 0;
    controlMovementDown = 0;
    controlMovementForward = 0;
    controlMovementBackward = 0;
}

function drawDevil() {
    ctxDevil.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxDevil.drawImage(devil.image, devil.posX, devil.posY, devil.width, devil.height);
}

var move;
var controlMovementUp;
var controlMovementDown;
var controlMovementForward;
var controlMovementBackward;

function moveDevil(event) {
    var keynum;
    if (window.event && gameOver == 0) {
        keynum = event.keyCode;
        // up, keys: up arrow or w
        if ((keynum == 38) || (keynum == 87)) {
            if (controlMovementDown == 0 && controlMovementUp == 0 /*&& gameOver == 0*/) {
                move = setInterval(function () {
                    moveUp()
                }, devilMoveSpeed);
                controlMovementUp = 1;
            }
        }
        // down, keys: down arrow or s
        if ((keynum == 40) || (keynum == 83)) {
            if (controlMovementDown == 0 && controlMovementUp == 0  /*&& gameOver == 0*/) {
                move = setInterval(function () {
                    moveDown()
                }, devilMoveSpeed);
                controlMovementDown = 1;
            }
        }
        // backward, keys: left arrow or a
        if ((keynum == 37) || (keynum == 65)) {
            if (controlMovementForward == 0 && controlMovementBackward == 0 && whiteCloudHit == 0 /*&& gameOver == 0*/) {
                slowSpeed();
                controlMovementBackward = 1;
            }
        }
        // forward, keys: right arrow or d
        if ((keynum == 39) || (keynum == 68)) {
            if (controlMovementForward == 0 && controlMovementBackward == 0 && whiteCloudHit == 0 /*&& gameOver == 0*/) {
                fastSpeed();
                controlMovementForward = 1;
            }
        }
    }
}

var dy = 4;

function moveUp(){
    if(devil.posY > 0){
        devil.posY -= dy;
    }
    drawDevil();
}

function moveDown(){
    if(devil.posY < canvasHeight - devil.height){
        devil.posY += dy;
    }
    drawDevil();
}

function devilDistance(){
    devil.distance += dx;
}

function moveDevilStop(event) {
    var keynum;
    if (window.event && gameOver == 0) { // IE
        keynum = event.keyCode;
        // up, keys: up arrow or w
        if ((keynum == 38) || ( keynum == 87)) {
            if (controlMovementUp == 1 /*&& gameOver == 0*/) {
                clearInterval(move);
                controlMovementUp = 0;
            }
        }
        // down, keys: down arrow or s
        if ((keynum == 40) || ( keynum == 83)) {
            if (controlMovementDown == 1 /*&& gameOver == 0*/) {
                clearInterval(move);
                controlMovementDown = 0;
            }
        }
        // backward, keys: left arrow or a
        if ((keynum == 37) || ( keynum == 65)) {
            if (controlMovementBackward == 1  /*&& gameOver == 0*/) {
                controlMovementBackward = 0;
                normalSpeed();
            }
        }
        // forward, keys: right arrow or d
        if ((keynum == 39) || ( keynum == 68)) {
            if (controlMovementForward == 1 /*&& gameOver == 0*/) {
                controlMovementForward = 0;
                normalSpeed();
            }
        }
    }
}

/****** ANGEL ******/

var pathAngel = 'images/angel.jpg';
var angelHeight = 110;
var angelWidth = 160;
var angelStartDistance = 1000;

function Angel(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.image = new Image();
    this.image.src = pathAngel;
    this.image.height = angelHeight;
    this.image.width = angelWidth;
    this.height = angelHeight;
    this.width = angelWidth;
    this.distance = angelStartDistance;
    this.caught = 0;

    this.points = [];
    this.points[0] = new Point(this.posX + 1, this.posY + 59);
    this.points[1] = new Point(this.posX + 21, this.posY + 67);
    this.points[2] = new Point(this.posX + 59, this.posY + 96);
    this.points[3] = new Point(this.posX + 79, this.posY + 86);
    this.points[4] = new Point(this.posX + 117, this.posY + 110);
    this.points[5] = new Point(this.posX + 150, this.posY + 110);
    this.points[6] = new Point(this.posX + 151, this.posY + 87);
    this.points[7] = new Point(this.posX + 138, this.posY + 72);
    this.points[8] = new Point(this.posX + 166, this.posY + 40);
    this.points[9] = new Point(this.posX + 162, this.posY + 16);
    this.points[10] = new Point(this.posX + 139, this.posY + 1);
    this.points[11] = new Point(this.posX + 106, this.posY + 8);
    this.points[12] = new Point(this.posX + 68, this.posY + 11);
    this.points[13] = new Point(this.posX + 62, this.posY + 50);
    this.points[14] = new Point(this.posX + 38, this.posY + 50);
    this.points[15] = new Point(this.posX + 13, this.posY + 38);
}

var angel;
var ctxAngel;

function initAngel() {
    ctxAngel = document.getElementById('angel').getContext('2d');
    angel = new Angel(0, randomBetween(1, canvasHeight - angelHeight));
    angelNewPosY = randomBetween(1, canvasHeight - angelHeight);
    ctxAngel.clearRect(0, 0, canvasWidth, canvasHeight);
}


var angelNewPosY;

function drawAngel() {
    ctxAngel.clearRect(0, 0, canvasWidth, canvasHeight);

    if (angel.posY == angelNewPosY) {
        angel.posY = angelNewPosY;
        angelNewPosY = randomBetween(1, canvasHeight - angelHeight);
    }
    if (angel.posY < angelNewPosY) {
        angel.posY++;
        for (var i = 0; i < angel.points.length; i++) {
            angel.points[i].posY++;
        }
    }
    else {
        angel.posY--;
        for (var i = 0; i < angel.points.length; i++) {
            angel.points[i].posY--;
        }
    }
    ctxAngel.drawImage(angel.image, canvasWidth - (devil.distance - angel.distance), angel.posY, angel.width, angel.height);
}

var dxA;

function angelDistance() {
    angel.distance += dxA;

}


/****** GUARDIAN ANGEL ******/

var pathGuardianAngel = 'images/guardianAngel.png';
var pathGuardianAngelWithoutArrow = 'images/guardianAngelWithoutArrow.png';
var guardianAngelHeight = 120;
var guardianAngelWidth = 160;
var guardianAngelWithArrow = 1;
var guardianAngelWithoutArrow = 2;

function GuardianAngel(type, posX, posY) {
    this.posY = posY;
    this.posX = posX;
    this.type = type;
    this.image = new Image();
    this.image.height = guardianAngelHeight;
    this.image.width = guardianAngelWidth;
    this.height = guardianAngelHeight;
    this.width = guardianAngelWidth;

    if (this.type == guardianAngelWithArrow) {
        this.image.src = pathGuardianAngel;
    }
    else if (this.type == guardianAngelWithoutArrow) {
        this.image.src = pathGuardianAngelWithoutArrow;
    }
}

/****** ARROW ******/

var pathArrow = 'images/arrow.png';
var arrowHeight = 20;
var arrowWidth = 120;

function Arrow(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.image = new Image();
    this.image.src = pathArrow;
    this.image.height = arrowHeight;
    this.image.width = arrowWidth;
    this.height = arrowHeight;
    this.width = arrowWidth;

    this.points = [];
    this.points[0] = new Point(this.posX + 0, this.posY + 10);
    this.points[1] = new Point(this.posX + 6, this.posY + 19);
    this.points[2] = new Point(this.posX + 23, this.posY + 21);
    this.points[3] = new Point(this.posX + 25, this.posY + 14);
    this.points[4] = new Point(this.posX + 79, this.posY + 14);
    this.points[5] = new Point(this.posX + 94, this.posY + 20);
    this.points[6] = new Point(this.posX + 123, this.posY + 20);
    this.points[7] = new Point(this.posX + 125, this.posY + 1);
    this.points[8] = new Point(this.posX + 94, this.posY + 1);
    this.points[9] = new Point(this.posX + 79, this.posY + 6);
    this.points[10] = new Point(this.posX + 25, this.posY + 6);
    this.points[11] = new Point(this.posX + 24, this.posY + 0);
    this.points[12] = new Point(this.posX + 6, this.posY + 2);
}

var ctxGuardianAngel;
var guardianAngel;
var arrow;
var drawGuardianAngelVAR;

function initGuardianAngel() {
    ctxGuardianAngel = document.getElementById('guardianAngel').getContext('2d');
    guardianAngel = new GuardianAngel(guardianAngelWithArrow, 0, randomBetween(1, canvasHeight - guardianAngelHeight));
    arrow = new Arrow(0, guardianAngel.posY + 50);
    ctxGuardianAngel.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawGuardianAngel() {

    if (arrow.posX < 120) {
        ctxGuardianAngel.clearRect(0, 0, canvasWidth, canvasHeight);
        ctxGuardianAngel.drawImage(guardianAngel.image, canvasWidth - arrow.posX, guardianAngel.posY, guardianAngel.width, guardianAngel.height);
        arrow.posX++;
    }
    else {
        if (arrow.posX < 1020) {
            ctxGuardianAngel.clearRect(0, 0, canvasWidth, canvasHeight);
            if (arrow.posX < 320) {
                if (arrow.posX < 200) {
                    ctxGuardianAngel.clearRect(0, 0, canvasWidth, canvasHeight);
                } else {
                    if (arrow.posX < 320) {
                        ctxGuardianAngel.clearRect(0, 0, canvasWidth, canvasHeight);
                    }
                }
                ctxGuardianAngel.drawImage(arrow.image, canvasWidth - arrow.posX, guardianAngel.posY + 50, arrow.width, arrow.height);
                if (arrow.posX < 200) {
                    guardianAngel = new GuardianAngel(guardianAngelWithoutArrow, arrow.posX, guardianAngel.posY);
                    ctxGuardianAngel.drawImage(guardianAngel.image, 780, guardianAngel.posY, guardianAngel.width, guardianAngel.height);
                } else {
                    if (arrow.posX < 320) {
                        ctxGuardianAngel.drawImage(guardianAngel.image, 580 + arrow.posX, guardianAngel.posY, guardianAngel.width, guardianAngel.height);
                    }
                }
            } else
                ctxGuardianAngel.drawImage(arrow.image, canvasWidth - arrow.posX, guardianAngel.posY + 50, arrow.width, arrow.height);
            arrow.posX++;
        }
        else {
            guardianAngel = new GuardianAngel(guardianAngelWithArrow, 0, randomBetween(1, canvasHeight - guardianAngelHeight));
            arrow = new Arrow(0, guardianAngel.posY + 50);
            ctxGuardianAngel.clearRect(0, 0, canvasWidth, canvasHeight);
            clearInterval(drawGuardianAngelVAR);
            statistics.avoidedArrows++;
        }
    }
}

var gameOver;
var whiteCloudHit;

function arrowCollisionDetection() {
    if ((canvasWidth - arrow.posX) < devil.width + 6)
    {
        for (var j = 0; j < arrow.points.length; j++) {
            var Xtacka = canvasWidth - arrow.posX + arrow.points[j].posX - 45;
            if (Xtacka < 0)
                Xtacka = Xtacka * (-1);
            var Ytacka = (devil.posY + 40) - arrow.points[j].posY;
            if (Ytacka < 0)
                Ytacka = Ytacka * (-1);

            var r = Math.sqrt(Xtacka * Xtacka + Ytacka * Ytacka);
            if (r <= devil.radius) {
                gameOver = 1;
                slowCounter = 0;
            }
        }
    }
}

var slowCounter;

function cloudsCollisionDetection() {
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].posX < devil.width + 6) {
            for (var j = 0; j < clouds[i].points.length; j++) {
                var Xtacka = clouds[i].points[j].posX - 45;
                if (Xtacka < 0)
                    Xtacka = Xtacka * (-1);
                var Ytacka = (devil.posY + 40) - clouds[i].points[j].posY;
                if (Ytacka < 0)
                    Ytacka = Ytacka * (-1);
                var r = Math.sqrt(Xtacka * Xtacka + Ytacka * Ytacka);
                if (r <= devil.radius) {
                    if (clouds[i].type == blackCloud) {
                        gameOver = 1;
                        slowCounter = 0;
                    }
                    else if (clouds[i].type== whiteCloud) {
                        whiteCloudHit = 1;
                        slowCounter = 50;
                    }
                }
            }
        }
    }
}

function angelCollisionDetection() {
    if (angel.posX < devil.width + 6) {
        for (var j = 0; j < angel.points.length; j++) {
            var Xtacka = canvasWidth - (devil.distance - angel.distance) + angel.points[j].posX - 45;
            if (Xtacka < 0)
                Xtacka = Xtacka * (-1);
            var Ytacka = (devil.posY + 40) - angel.points[j].posY;
            if (Ytacka < 0)
                Ytacka = Ytacka * (-1);
            var r = Math.sqrt(Xtacka * Xtacka + Ytacka * Ytacka);
            if (r <= devil.radius) {
                angel.caught = 1;
                gameOver = 1;
                slowCounter = 0;
            }
        }
    }
}

function isSlow() {
    slowCounter--;
    if (slowCounter > 0) {
        return true;
    }
    else if (slowCounter == 0) {
        if(controlMovementBackward == 1){
            slowSpeed();
        }
        else if(controlMovementForward == 1){
            fastSpeed();
        }
        else{
            normalSpeed();
        }
        whiteCloudHit = 0;
        return false;
    }
}

function stopGame() {
    drawFinalScore();

    if(angel.caught){
        updateStatistics();
    }
    clearIntervals();
}

function clearIntervals() {
    clearInterval(startVAR);
    clearInterval(devilDistanceVAR);
    clearInterval(angelDistanceVAR);
    clearInterval(drawAngelVAR);
    clearInterval(drawGuardianAngelVAR);
    clearInterval(drawGuardianAngelStartVAR);
    clearInterval(move);
}

var statistics;

function Statistics(player) {
    this.player = player;
    this.avoidedWhiteClouds = 0;
    this.avoidedBlackClouds = 0;
    this.avoidedArrows = 0;
    this.score = 0;

    this.generateScore = function () {
        this.score = ((devil.distance) + (this.avoidedWhiteClouds * 100) - (this.avoidedBlackClouds * 200) + (this.avoidedArrows * 300));
        return this.score;
    }
}

function initStatistics() {
    statistics = new Statistics(player);
}

function updateStatistics() {
    $.post("functions/updateStatistics.php", {
        player: statistics.player,
        avoidedWhiteClouds: statistics.avoidedWhiteClouds,
        avoidedBlackClouds: statistics.avoidedBlackClouds,
        avoidedArrows: statistics.avoidedArrows,
        distance: devil.distance,
        score: statistics.score
    }).done(function (data) {
        if (data == 'true') {
            // alert("Update statistics successful!");
        }
        else {
            // alert("Update statistics unsuccessful!");
        }

    });
}

var ctxFinalScore;

function initDrawFinalScore(){
    ctxFinalScore = document.getElementById('finalScore').getContext('2d');
    ctxFinalScore.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawFinalScore() {

    ctxFinalScore.fillStyle = 'yellow';
    ctxFinalScore.strokeStyle = 'black';
    ctxFinalScore.lineWidth = 4;
    ctxFinalScore.font = 'normal bold 100px "new century schoolbook"';
    var text = "Your score: " + statistics.score;
    if (!angel.caught) {
        ctxFinalScore.fillStyle = 'red';
        text = "Game over!";
    }
    ctxFinalScore.fillText(text, 250, 280, 400);
    ctxFinalScore.strokeText(text, 250, 280, 400);
}

var canvasButtons;
var ctxButtons;
var button;

function initPlayButton() {
    canvasButtons = document.getElementById('buttons');
    ctxButtons = canvasButtons.getContext('2d');
    button = new Image();
    button.src = 'images/playButton.png';
    if (gameOver) {
        button.src = 'images/playAgainButton.pnh';
    }
}

function drawPlayButton() {

    ctxButtons.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxButtons.drawImage(button, canvasWidth / 2 - button.width / 2, canvasHeight - button.height * 2, button.width, button.height);

    canvasButtons.addEventListener("click", getClickPosition, false);
}

function getClickPosition(event) {
    var x = event.x;
    var y = event.y;

    x -= canvasButtons.offsetLeft;
    y -= canvasButtons.offsetTop;


    if (x > canvasWidth / 2 - button.width / 2 && x < button.width + canvasWidth / 2 - button.width / 2 && y > canvasHeight - button.height * 2 && y < canvasHeight - button.height) {
        canvasButtons.style.display = "none";
        start2();
    }

}