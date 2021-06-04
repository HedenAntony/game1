var ball;
var database;
var position;
var gameState = 0;
var playerCount = 0;
var form, game, player;
var allPlayers;
var car1, car2, car3, car4, cars;
var xVelocity,yVelocity;
var F1,F1img
var x,y;
var obstacles;
var carSound;
var slidingSound;
var passedFinish;
var finishedPlayers;
//firebase.database.ref() or firebase.database.ref("child/path")

//read---> .on()
var car1Img, car2Img, car3Img, car4Img;
var trackImg

function preload() {
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
    trackImg = loadImage("images/track.jpg");
    F1img=loadImage("images/f1.png");
    //carSound=loadSound("sound_car.mp3");
    slidingSound=loadSound("sound/sliding.mp3");

}

function setup() {
    createCanvas(displayWidth, displayHeight);
    obstacles= createGroup();


    //create our database
    database = firebase.database();
    

    game = new Game();
    game.getState();
    game.start();

    xVelocity=0;
    

    yVelocity=0;

    for(var i=0; i<5;i++){
        x= random(250,1000);
        y=random(-height*4,height-300)
        F1=createSprite(x,y);
        F1.addImage(F1img);
        obstacles.add(F1);
    }

}

function draw() {
    background("white");

    if (playerCount === 4) {
        game.update(1)
    }
    if (gameState === 1) {
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
   
}