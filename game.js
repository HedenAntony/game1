class Game {
    constructor() {

    }
    getState() {
        var gameStateRef = database.ref("gameState")
        gameStateRef.on("value", function(data) {
            gameState = data.val();


        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }
    start() {
        if (gameState === 0) {
            form = new Form()
            form.display();
            player = new Player()
            player.getCount();
        }

        car1 = createSprite(100, 200);
        car1.addImage(car1Img);
        car1.debug= true;
        car2 = createSprite(300, 200);
        car2.addImage(car2Img);
        car2.debug= true;
        car3 = createSprite(500, 200);
        car3.addImage(car3Img);
        car3.debug= true;
        car4 = createSprite(700, 200);
        car4.addImage(car4Img);
        car4.debug= true;

        cars = [car1, car2, car3, car4]
        passedFinish= false;

    }
    play() {
        //carSound.play();
        form.hide();
        textSize(30);
        stroke("skyblue");
        fill("blue")
        text("GAME START", 120, 100);

        image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);



        Player.getPlayerInfo();
        player.getFinishedPlayers();



       if (allPlayers !== undefined) {
            //var display_position=130;

            //index of the cars array
            var index = 0

            //x and y position of the cars
            var x = 150;
            var y;

            for (var plr in allPlayers) {

                //add 1 to the index for every loop
                index = index + 1

                //position the cars  a little away from each other in x direction
                x = allPlayers[plr].xPosition+index*200;

                //use data from the database to display the cars in y direction
                y = displayHeight - allPlayers[plr].distance

                

                if (index === player.index) {
                   // cars[index - 1].shapeColor = "red"
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                    if(cars[index-1].isTouching(obstacles)){
                        yVelocity-=0.9;
                        slidingSound.play();
                    }
                } 

                cars[index - 1].x = x;
                cars[index - 1].y = y;

                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, cars[index-1].x,cars[index-1].y+75)

               
                /* display_position+=20;
                 textSize(15);
                 text(allPlayers[plr].name+": "+allPlayers[plr].distance,120,display_position)*/
            }
        }

       /* if (keyIsDown(UP_ARROW) && player.index != null) {
            player.distance += 20;
            player.update();
        }*/
        if(player.distance<3770){
        if(keyIsDown(38) && player.index!=null){
            yVelocity=yVelocity+0.9;
            if(keyIsDown(37)){
                xVelocity=xVelocity-0.2
            }
            if(keyIsDown(39)){
                xVelocity=xVelocity+0.2
            }
        
        }
    }
    else if(passedFinish===false){
        passedFinish= true;
        xVelocity*=0.7;
        yVelocity*=0.7;
        player.update();
        Player.updateFinishedPlayers()
        player.rank=finishedPlayers;
    }

        player.xPosition+=xVelocity;
        xVelocity*=0.985;

        player.distance+=yVelocity
        yVelocity*=0.985

        player.update();
        


       
       

        drawSprites();
    }
    end() {
        console.log("GAME ENDED");
    }
}