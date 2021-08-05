// GAme Constants

let inputDir ={x:0, y:0};

const foodSound= new Audio("food.mp3");
const gameOverSound= new Audio("gameover.mp3");
const moveSound= new Audio("move.mp3");
const musicSound= new Audio("music.mp3");

let speed=6;

let score=0; 

let lastSpeed=0;

let snakeArray=[
    {x:15, y:17}
]

food={x:14, y:9};


let a=2;
let b=16;

/// Game Functions

function main(currentTime)
{
    window.webkitRequestAnimationFrame(main);

    if((currentTime-lastSpeed)/1000 <1/speed)
    {
        return;
    }

    lastSpeed= currentTime;

    gameEngine();    
}

function isCollide(snake)
{

        // If you bump into yourself

        for (let i = 1; i < snakeArray.length; i++) {
            
           if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
           {
                return true;
           }
        }

        // if you bump into wall

        if(snake[0].x >=18 || snake[0].x <=0  || snake[0].y >=18 || snake[0].y <=0 )
       {
           return true;
        }

    return false;
}

function gameEngine()
{
    /// part-1 : Updating the Snake Array and food


    if(isCollide(snakeArray))
    {
        gameOverSound.play();
        moveSound.pause();
        inputDir ={x:0, y:0};

        alert("Game Over, Press any key to play a Game");

        snakeArray=[{x:15, y:17}]; 
        musicSound.play();

        score=0;
    }
    
    /// if you have eaten the food, Increment the score value
        if(snakeArray[0].y=== food.y && snakeArray[0].x === food.x)
        {
            foodSound.play();

            score+=1;

            totalScore.innerHTML="Score :"+score;

           
            snakeArray.unshift({x: snakeArray[0].x + inputDir.x , y: snakeArray[0].y + inputDir.y});


            food={x:Math.round(a +(b-a)* Math.random()), y:Math.round(a +(b-a)* Math.random())};
        }

        /// moving the Snake

        for (let i = snakeArray.length -2; i >=0; i--) {
         

            snakeArray[i+1]={...snakeArray[i]};
        }

        snakeArray[0].x+=inputDir.x;
        snakeArray[0].y+= inputDir.y;



    // part-2: Display the snake and food

    board.innerHTML="";


    // Display the Snake
    snakeArray.forEach((e, index)=>{
        snakeElement= document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart= e.x;
       
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake'); 
        }
     
        board.appendChild(snakeElement);
    });

    // Display the Food

    foodElement= document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart= food.x;

    foodElement.classList.add('food');
   
   board.appendChild(foodElement)
    

}









/// Game logic Starts Here

window.webkitRequestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir={x:0, y:1} /// start the Game

    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
                console.log("Arrow Up");
                inputDir.x=0;
                inputDir.y=-1;
            break;

        case "ArrowDown":
                    console.log("Arrow Down");

                    inputDir.x=0;
                    inputDir.y=1;
                break;
        
        case "ArrowRight":
                console.log("Arrow Right");

                inputDir.x=1;
                inputDir.y=0;
            break;
            
        case "ArrowLeft":
                console.log("Arrow Left");

                inputDir.x=-1;
                inputDir.y=0;
            break;
    
        default:
            break;
    }

    console.log(inputDir);
})