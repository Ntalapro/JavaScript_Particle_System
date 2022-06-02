const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let adjustX =0;
let adjustY=0;
var particleArray = [];

const mouse ={
    x:null,
    y:null,
    radius:100
}

window.addEventListener('mousemove', event=>{
    mouse.x=event.x;
    mouse.y=event.y;
});

ctx.fillStyle ='white';
ctx.font = '30px Verdana';
ctx.fillText('Intel',0,30);
ctx.strokeStyle='white';
ctx.strokeRect(0,0,100,100);
const textCoordinates = ctx.getImageData(0,0,100,100);

class Particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=5;
        this.baseX=this.x;
        this.baseY=this.y;
        this.density = Math.random() * 30 + 1;

    }
    draw(){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let F_directionX = dx/distance;
        let F_directionY = dy/distance;
        let maxDistnace =mouse.radius;
        let force = (maxDistnace - distance)/maxDistnace;
        let directionX = F_directionX*force*this.density;
        let directionY = F_directionY*force*this.density;


        if(distance< maxDistnace){
            this.x -= directionX;
            this.y -= directionY;
        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x-this.baseX;
                this.x -=dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y-this.baseY;
                this.y -=dy/10;
            }
        }
    }
}

function init(){
     for(let y=0,y2 = textCoordinates.height;y<y2;y++){
        for(let x=0,x2 = textCoordinates.width;x<x2;x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3 ]>128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX *20, positionY*20));
            }
        }
     }
}
init();
console.log(particleArray);

function handleParticles(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();

    }
    
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.3)';
    //ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticles();
    connect();
    requestAnimationFrame(animate);
}
animate();

function connect(){
    for(let i=0;i<particleArray.length;i++){
        for(let j=i;j<particleArray.length;j++){
            let dx = particleArray[i].x - particleArray[j].x;
            let dy = particleArray[i].y - particleArray[j].y;
            let distance = Math.sqrt(dx*dx + dy*dy); 
            opacityValue = 1 - (distance/50);
            
            if(distance <50){
                ctx.strokeStyle = 'rgba(0,0,0,'+opacityValue+')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
            }

        }
    }
}