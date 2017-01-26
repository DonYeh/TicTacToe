(function(){

	var playerOne = []; //array to store playerOne's moves
	var playerTwo = []; //array to store playerTwo's moves
	var moveCounter = 0;  //moves counter

	var winner;
    var draw;

    var playerOneName = "Player 1";
    var playerTwoName = "Player 2";

    //all possible winning combinations	
    var winningArray = [ [0,1,2],
                         [0,3,6],
                         [0,4,8],
                         [1,4,7],
                         [2,4,6],
                         [2,5,8],
                         [3,4,5],
                         [6,7,8],
                       ];

$('body').append('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>'); //append the start screen

$('.button').on('click', function(){  			//when the player clicks start game button
  $('#start').hide(); 							//hide start screen
  $('#board').show(); 							//show board
  $('.box').css('background-image', 'none');  	//clear background images
  $('#player1').addClass('active'); 			//set player 1 to active
});

$('.box').on('mouseenter', function(){ 							//when player's mouse hovers over a square
  if($(this).hasClass('filled') == false){      				//if the square is not checked
    if($('#player1').hasClass('active') == true){ 				//if player 1 if active
      $(this).css('background-image', 'url("img/o.svg")');   	//add background image O
    } else {                                     				//if player 2 is active
      $(this).css('background-image', 'url("img/x.svg")');    	//add background image X
    };
  };
});

$('.box').on('mouseout', function(){ 			//when player's mouse leaves a square
  if($(this).hasClass('filled') == false){    	//if the square was not checked
    $(this).css('background-image', 'none');    //removes background image from that square
  };
});

$('.box').on('click', function(){     //when the player clicks on a square
  if($('#player1').hasClass('active') == true && $(this).hasClass('filled') == false){     //if player 1 is active
    $(this).addClass('box-filled-1 filled');    //attach class filled-1
    playerToggle('#player1', '#player2');    //switch turns from player 1 to player 2
    playerOne += ($('.box').index(this));   //add square index into playerOne move list array
    moveCounter += 1;     //increments move counter by 1
    console.log(playerOne)

	winner = checkWinner(playerOne);
    draw = checkDraw();

    if (!winner && !draw) { //if no winner or draw
        playerToggle("player2"); //switch player turn
    } else if (winner) {
        gameOverScreen(playerOneName);
    } else if (draw) {
        gameOverScreen("screen-win-tie");
    }

  } else if($(this).hasClass('filled') == false){          //if player 2 is active
    $(this).addClass('box-filled-2 filled');       //attach class box-filled-2
    playerToggle('#player2', '#player1');        //switch turn from player 2 to player 1
    playerTwo += ($('.box').index(this));       //add square index into playerTwo move list array
    moveCounter += 1;         //increments move counter by 1
    console.log(playerTwo)

    winner = checkWinner(playerTwo);
    draw = checkDraw();

	if (!winner && !draw) { //if no winner or draw
       playerToggle("player1"); //switch player turn
    } else if (winner) {
        gameOverScreen(playerTwoName);
    } else if (draw) {
        gameOverScreen("screen-win-tie");
    }
  };
});

function playerToggle(playerOne, playerTwo){ //toggles player turns

if ( $(playerOne).hasClass('active') ) {
			$(playerOne).removeClass("active");
			$(playerTwo).addClass("active");
		} else {
			$(playerTwo).removeClass("active");
			$(playerOne).addClass("active");
		}
	};

function checkWinner(player) { //checks for a winner by comparing the board with winning arrays
        for (var i=0; i < winningArray.length; i++){    
            var winNums = winningArray[i];

            for (var j=0; j < winNums.length; j++) {
                var num = winNums[j];
                var compare = player.indexOf(num);
                console.log(compare);
                

                if (compare === -1) { //if there is no match
                    break;
                }

                if(j === winNums.length - 1) {
                    console.log(playerOne);
                    console.log("we have a winner");
                    return true;
                    
                }
            } 
        }        
    }

function checkDraw() { //checks to see if there is a draw
        if (playerOne.length + playerTwo.length === 9) { //if all 9 boxes are filled
            return true;
        }
    }

    
function gameOverScreen(result) { // renders the winner's name or if it's a draw
    $("#board").hide();
    $("#start").remove();

    if(result === "screen-win-tie") { // checks if there is a draw first
    	$("body").append("<div class='screen screen-win " + result + "' id='finish'>" +
        "<header><h1>Tic Tac Toe</h1><p class='message'>It's a Draw</p><a href='#' class='button'>New game</a></header</div>");       
    
    } else if (result === playerOneName) { //winning screen for player one
    	$("body").append("<div class='screen screen-win screen-win-one' id='finish'>" +
        "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
    
    } else { //winning screen for player two
    	$("body").append("<div class='screen screen-win screen-win-two' id='finish'>" +
    	"<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
    }

    $("#finish .button").on("click", function() {  //resets the game 
        
    });
}

function newGame() {  			//resets game and clears the squares
        $("#finish").remove();  //hide game over screen
        $("#board").show();		//show board
        playerOne = []; 		//reset variables, classes and attributes
        playerTwo = [];
        moveCounter = 0;
        $('.box').css('background-image', 'none');  //clear background images
  		$('#player1').addClass('active'); //set player 1 to active
        $("li.box").removeAttr("clicked").removeClass("box-filled-1 box-filled-2 filled");	//removed filled boxes
        $("li.box").removeClass("box-filled-1 box-filled-2 filled");
}

}())