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


$('.button').on('click', function(){  //when the user clicks start game button

  // $('#board').hide();
  $('#start').hide(); //start screen disappears
  // $('#finish').hide();

  $('#board').show(); //board appears
  $('.box').css('background-image', 'none');  //clear background images
  $('#player1').addClass('active'); //set player 1 to active
});


$('.box').on('mouseenter', function(){ //when player's mouse hovers over a square


  if($(this).hasClass('filled') == false){      				//if the square isn't checked
    if($('#player1').hasClass('active') == true){ 				//if player 1 if active
      $(this).css('background-image', 'url("img/o.svg")');   	//add background image O
    } else {                                     				//if player 2 is active
      $(this).css('background-image', 'url("img/x.svg")');    	//add background image X
    };
  };
});



$('.box').on('mouseout', function(){ //when player mouse leaves a square
  if($(this).hasClass('filled') == false){    //and square was not checked
    $(this).css('background-image', 'none');      //remove background image from that square
  };
});

$('.box').on('click', function(){     //when user clicks on square


  if($('#player1').hasClass('active') == true && $(this).hasClass('filled') == false){     //if player one is active
    $(this).addClass('box-filled-1 filled');    //add class filled-1
    turnControl('#player1', '#player2');    //switch turn from player one to player Two
    playerOne += ($('.box').index(this));   //add square index into playerOne move list
    moveCounter += 1;     //add 1 to move counter
    console.log(playerOne)

	 winner = checkWinner(playerOne);
     draw = checkDraw();

                    if (!winner && !draw) {
                        //debugger;
                        turnControl("player2");


                    } else if (winner) {
                        gameOverScreen(playerOneName);
                    } else if (draw) {
                        gameOverScreen("screen-win-tie");
                    }

  } else if($(this).hasClass('filled') == false){          //if player 2 is active
    $(this).addClass('box-filled-2 filled');       //add class box-filled-2
    turnControl('#player2', '#player1');        //switch turn from, player two to player one
    playerTwo += ($('.box').index(this));       //add square index into playerTwo move list
    moveCounter += 1;         //add 1 to move counter
    console.log(playerTwo)

    winner = checkWinner(playerTwo);
    draw = checkDraw();

	if (!winner && !draw) {
                            turnControl("player1");
                        } else if (winner) {
                            gameOverScreen(playerTwoName);
                        } else if (draw) {
                            gameOverScreen("screen-win-tie");
                        }

  };

  // gameOver()      //check if game is over
});

function turnControl(playerOne, playerTwo){

if ( $(playerOne).hasClass('active') ) {
			$(playerOne).removeClass("active");
			$(playerTwo).addClass("active");
		} else {
			$(playerTwo).removeClass("active");
			$(playerOne).addClass("active");
		}
	};


//checks if the game has a winner by checking it against the winning array
    function checkWinner(player) {
        for (var i=0; i < winningArray.length; i++){    
            var winNums = winningArray[i];

            for (var j=0; j < winNums.length; j++) {
                var num = winNums[j];
                var compare = player.indexOf(num);
                console.log(compare);
                

                if (compare === -1) {
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

    // checks if there is a draws
    function checkDraw() {
        if (playerOne.length + playerTwo.length === 9) {
            return true;
        }
    }

    // renders the winner's name or if it's a draw
    function gameOverScreen(result) {
        $("#board").hide();
        $("#start").remove();

        // checks if there is a draw first
        if(result === "screen-win-tie") {
        $("body").append("<div class='screen screen-win " + result + "' id='finish'>" +
             "<header><h1>Tic Tac Toe</h1><p class='message'>It's a Draw</p><a href='#' class='button'>New game</a></header</div>");       
        
        //winning screen for player one
        } else if (result === playerOneName) {
        $("body").append("<div class='screen screen-win screen-win-one' id='finish'>" +
             "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
        
        //winning screen for player two
        } else {
        $("body").append("<div class='screen screen-win screen-win-two' id='finish'>" +
        "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
        }

        //resets the game 
        $("#finish .button").on("click", function() {
            newGame();
            
        });
    }

        //resets game, with empty squares
    function newGame() {
        //hide game over screen
        $("#finish").remove();
        //show board
        $("#board").show();

        //reset variables, classes and attributes
        playerOne = [];
        playerTwo = [];
        moveCounter = 0;
        $('.box').css('background-image', 'none');  //clear background images
  		$('#player1').addClass('active'); //set player one to active
        $("li.box").removeAttr("clicked").removeClass("box-filled-1 box-filled-2 filled");
        $("li.box").removeClass("box-filled-1 box-filled-2 filled");

        //invoke previous game choice
        //board(playerOneName, playerTwoName);
    }



//   $(playerOne).removeClass('active');  //use to change active player
//   $(playerTwo).addClass('active');    //use to change active player
// }


// var addMouseEventsToBoxes = function(li) {		
// 		// Event listener to show the X or the O on hover
// 		li.addEventListener('mouseover', function(){
// 			if (!li.classList.contains('box-filled-1') && !li.classList.contains('box-filled-2')) {
// 				li.style.backgroundImage = "url('img/o.svg')";
// 			}
// 		});
		
// 		// Event listener to remove the X or O from the box.
// 		li.addEventListener('mouseout', function() {
// 			li.style.backgroundImage = '';
// 		});
		
// 		// Event for clicking on a box
// 		li.addEventListener('click', function(){
// 			if (!li.classList.contains('box-filled-1') && !li.classList.contains('box-filled-2')) {
// 				li.classList.add('box-filled-1');
// 				li.style.backgroundImage = '';
// 				boxesPlayedCount++;
// 				changePlayer(2);
// 				window.setTimeout(computerAI, 500);
// 				checkForWinner();
// 			}
			
// 		});		
// 	};





}())