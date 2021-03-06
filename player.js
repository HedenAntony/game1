class Player{
    constructor(){
        this.name=null;
        this.distance=0;
        this.index=null;
        this.xPosition=175;
        this.rank=0;

    }
    getCount(){
        var playerCountRef=database.ref("playerCount")
        playerCountRef.on("value",function(data){
            playerCount=data.val();

        })
    }
    updateCount(count){
     database.ref('/').update({
         playerCount:count
     })
 }
 update(){
    var playerIndex= "players/player"+this.index
    database.ref(playerIndex).set({
        name: this.name,
        distance: this.distance,
        xPosition:this.xPosition,
        rank: this.rank
    })
 }
 getFinishedPlayers(){
     var finishedPlayersRef= database.ref("finishedPlayers");
     finishedPlayersRef.on("value",(data)=>{
         finishedPlayers=data.val();
     })
 }

 static getPlayerInfo(){

     var playerInfoRef= database.ref('players');
     playerInfoRef.on("value",(data)=>{
        allPlayers= data.val();
     })
 }

 static updateFinishedPlayers(){
     console.log(finishedPlayers);
     
     database.ref('/').update({
         finishedPlayers: finishedPlayers+1
     })
     this.rank+=1
 }


}