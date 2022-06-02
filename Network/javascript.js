const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particleArray = [];

const mouse ={
    x:null,
    y:null,
    radius:80
}

window.addEventListener('mousemove', event=>{
    mouse.x=event.x;
    mouse.y=event.y;
});

//ctx.fillStyle ='white';
//ctx.font = '30px Verdana';
//ctx.fillText('A',0,30);
//ctx.strokeStyle='white';
//ctx.strokeRect(0,0,100,100);
//const data = ctx.getImageData(0,0,100,100);

class Particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=8;
        this.baseX=this.x;
        this.baseY=this.y;
        this.density = Math.random() * 30 + 1;
        this.color='rgba('+(Math.random() *255 +1)+','+(Math.random() *255 +1)+','+(Math.random() *255 +1)+')';

    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let force_x = dx/distance;
        let force_y = dy/distance;
        let limitDistance = mouse.radius;
        let speedFactor = (limitDistance - distance)/limitDistance;
        let awaySpeedX = force_x*speedFactor*this.density; 
        let awaySpeedY = force_y*speedFactor*this.density; 

        if(distance < mouse.radius){
            this.x -=awaySpeedX;
            this.y -=awaySpeedY;

        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -=dx/10; 
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -=dy/10; 
            }
        }
    }
   
}

function init(){
     for(let i=0;i<500;i++){
         let x= Math.random() * canvas.width;
         let y= Math.random() * canvas.height;
        particleArray.push(new Particle(x,y));
     }
}
init();

function handleParticles(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
}

function networks(){
    for(let i=0;i<particleArray.length;i++){
        for(let j=i;j<particleArray.length;j++){
            let dx = particleArray[i].x - particleArray[j].x;
            let dy =particleArray[i].y - particleArray[j].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance<80){
                ctx.strokeStyle = 'rgba('+(Math.random() *255 +1)+','+(Math.random() *255 +1)+','+(Math.random() *255 +1)+',0.6'+')';
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y)
                ctx.stroke();
            }
        }
    }
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    networks();
    handleParticles(); 
    requestAnimationFrame(animate);
}
animate();