var bug;
var go=[];


canvas = document.getElementById("Canvas");
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;
context=canvas.getContext("2d");

bug = new component(40,500,"../images/bug.png",80,80,"image");


for(a=0;a<100;a++){
go[a] = new component(0,window.innerHeight/2+60,"../images/go.png",40,40,"image");
}


var startGame={

    jumping:false,
    
    frameNo:0,
    
    
     jump:function(){
          window.addEventListener('keydown',function(e){
           startGame.key=e.keyCode;
           
       })
       window.addEventListener('keyup',function(e){
        startGame.key=false;
        
       
    })
 },
 clear:function(){
    
    context.clearRect(0,0,canvas.width,canvas.height);
}
}

var forJumping = (function game(){
    startGame.jump();
    })();
    

function component(x,y,color,width,height,type){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.speedY=0;
    this.speedX=0;
    this.gravity=0.5;
    this.gravitySpeed=0;
    if(type == "image"){
        this.image=new Image();
        this.image.src=color;
    }
    this.update=function(){
   
        if(type == "image"){
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
         
        }
    
    }
        this.newPosition=function(){
            
            this.gravitySpeed+=this.gravity;
            this.y+=this.gravitySpeed;
            this.gravity+=1;
            this.x += this.speedX;
            

        }
        this.ropebase=function(){

            this.top=this.x;
            this.bottom=this.x+this.height;
            
            var base = go[0].y-60;
            if(this.y>base){
                this.y=base;
                startGame.jumping=false;
                this.gravity=0;
                this.gravitySpeed=0;
            }
        }
}

setInterval(update,20);

function update(){
    startGame.clear();
    bug.newPosition();
    bug.ropebase();
    
    startGame.frameNo+=1;

    if(startGame.key == 32 && startGame.jumping==false ){
        bug.gravity-=5;
        startGame.jumping=true;
        for(var q=0;q<100;q+=1){
          go[q].x-=100;
          }
    }
    if (startGame.key == 39) {
      bug.speedX+=1;
    }
    if (startGame.key == 37) {
      bug.speedX-=1;
    }
  
 bug.x += bug.speedX;
 bug.speedX *= 0.9;
    for(var w=0;w<100;w++){
    go[w].update();
    }
    bug.update();
}
