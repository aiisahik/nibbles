//////// SET UP GAME AREA ///////

var gameArea = document.getElementById('gamearea');
var gameWidth = 500;
var gameHeight = 500;
var scoreArea = document.getElementById('score');

//////// SET UP GAME VARIABLES ///////
var score = 0;
var blockWidth = 10;
var food;
var gameSpeed;

//////// CREATE THE SNAKE ///////
var direction;
var startingSnakeLength = 5;
var snakeArray = []; //an array of {left: position from left, top: position from top} 
var gameLoop;

//////// DRAW THE SNAKE ///////
function drawSnake(){
	for(var i = 0; i < snakeArray.length; i++){
		var snakeBlock = snakeArray[i];
		var block = document.createElement("div");
		block.className = "snake block";
		block.style.left = snakeBlock.left + 'px';
		block.style.top = snakeBlock.top + 'px';
		gameArea.appendChild(block);
	}
}

//////// CREATE THE FOOD ///////
function createFood() {
	food = {
		 left: Math.round(  Math.random()*(gameWidth-blockWidth) / 10  ) * 10, 
		 top: Math.round( Math.random()*(gameHeight-blockWidth) / 10 ) * 10, 
		//left: 400,
		//top: 100,
	};
}

//////// DRAW THE FOOD ///////
function drawFood() {
	var foodBlock = document.createElement("div");
	foodBlock.className = "food block";
	foodBlock.style.left = food.left + 'px';
	foodBlock.style.top = food.top + 'px';
	gameArea.appendChild(foodBlock);
}

function renderFrame (){

	// create a temporary object that defines the location of the snake's head
	var snakeHead = {
		left: snakeArray[0].left,
		top: snakeArray[0].top,
	};

	var newGameSpeed = gameSpeed;

	// change the direction of the snake if needed
	if(direction == "right") {
		snakeHead.left += blockWidth;
	} else if(direction == "left") {
		snakeHead.left -= blockWidth;
	} else if(direction == "up") { 
		snakeHead.top -= blockWidth;
	} else if(direction == "down") {
		snakeHead.top += blockWidth;
	}

	// move snake forward by one block 
	snakeArray.unshift(snakeHead);

	// check collision 
	if (snakeHead.top < 0 || snakeHead.top  >= gameHeight || 
		snakeHead.left < 0 || snakeHead.left  >= gameWidth){

		// snake collided with walls. End the game! 
		endGame();
		return; 
	} else {
		for(var i = 1; i< snakeArray.length - 1; i += 1 ){
			if (snakeArray[i].left == snakeArray[0].left && 
				snakeArray[i].top == snakeArray[0].top ){

				// snake collided with itself. End the game! 
				endGame();
				return; 
			}
		}	
	}
	

	// check if the snake ate the food
	if (snakeHead.top == food.top && snakeHead.left == food.left){
		// successfully ate food. increase the score
		score += 1;
		// reset the food location but allow tail to stay thereby growing the snake 
		createFood();
		newGameSpeed = gameSpeed * 0.9;

	} else {
		// remove tail, do not grow the snake
		snakeArray.pop();
	}

	// draw everything 
	gameArea.innerHTML = ""; 
	drawSnake();
	drawFood();
	scoreArea.innerHTML = "score: " + score; 

	if (newGameSpeed !== gameSpeed){
		gameSpeed = newGameSpeed;
		clearInterval(gameLoop);
		console.log('updated game speed: ', gameSpeed);
		gameLoop = setInterval(renderFrame, gameSpeed);
	}
}

//////// DRAW EVERYTHING FOR EVERY FRAME ///////


function endGame(){
	clearInterval(gameLoop);
	console.log('game over');
	var gameOver = document.createElement("div");
	gameOver.className = "gameover";
	gameOver.innerHTML = "Game Over! <br><br> Press Space to Start Again";
	gameArea.appendChild(gameOver);
}

//////// ADD KEYBOARD CONTROLS ///////
function detectKeys(e){
	var key = e.which;
	//We will add another clause to prevent reverse gear
	if(key == "37" && direction != "right") direction = "left";
	else if(key == "38" && direction != "down") direction = "up";
	else if(key == "39" && direction != "left") direction = "right";
	else if(key == "40" && direction != "up") direction = "down";

	if (key == 32){
		newGame();
	}
};
document.onkeydown = detectKeys;

// start the game 
function newGame(){
	direction = "right";
	gameSpeed = 100;
	gameArea.innerHTML = "";
	score = 0;
	// create the snake Array 
	snakeArray = [];
	// Loop through the snakeLength to create a horizontal snake starting from the top left
	for(var i = (startingSnakeLength-1) * blockWidth; i>=0; i -= blockWidth){
		snakeArray.push({left: i, top:0});
	}
	drawSnake();
	createFood();
	gameLoop = setInterval(renderFrame, gameSpeed);
}
newGame();