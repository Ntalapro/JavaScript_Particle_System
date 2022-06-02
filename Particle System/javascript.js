
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    var particleArray = [];
    let color_ =0;

    const mouse = {
        x:undefined,
        y:undefined,
    }

    canvas.addEventListener('mousemove', event=>{
        mouse.x=event.x;
        mouse.y=event.y;
        ctx.fillStyle='black';
        for(let i=0;i<5;i++){
        particleArray.push(new Particle());
        }
    });
    canvas.addEventListener('click', event=>{
        mouse.x=event.x;
        mouse.y=event.y;
        ctx.fillStyle='black';
        for(let i=0;i<5;i++){
        particleArray.push(new Particle());
        }
    });

    class Particle{
        constructor(){
            this.x = mouse.x;
            this.y = mouse.y;
            this.size=Math.random() * 15 + 1;
            this.speedX=Math.random() * 3 - 1.5;
            this.speedY=Math.random() * 3 - 1.5;
            this.color='hsl('+color_+',100%,50%)';

        }
        update(){
            this.x +=this.speedX;
            this.y +=this.speedY;
            if(this.size >0.2)this.size-=0.2;
        }
        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fill();
        }
    }
     
    console.log(particleArray)

    function drawParticles(){
        for(let i=0;i<particleArray.length;i++){
            particleArray[i].update();
            particleArray[i].draw();
            for(let j=i;j<particleArray.length;j++){
                const dx = particleArray[i].x - particleArray[j].x;
                const dy = particleArray[i].y - particleArray[j].y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance<100){
                    ctx.beginPath();
                    ctx.strokeStyle = particleArray[i].color;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particleArray[i].x,particleArray[i].y);
                    ctx.lineTo(particleArray[j].x,particleArray[j].y);
                    ctx.stroke();
                }
            }
            if(particleArray[i].length <=1){
                particleArray.slice(i,1);
                i--;
            }
        }
    }

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
       // ctx.fillStyle = 'rgba(0,0,0,0.1)';
        //ctx.fillRect(0,0,canvas.width,canvas.height);
        drawParticles();
        color_+=5;
        requestAnimationFrame(animate);
    }
    animate();
    

