angular
	.module('ticTacToeApp')
	.controller('TicTacToeController',TicTacToeController);

	TicTacToeController.$inject = ['$scope', '$firebaseObject','$firebaseArray'];


	function TicTacToeController($scope, $firebaseObject, $firebaseArray){
		var rootRef = new Firebase("https://tictactoeii.firebaseio.com/");
		$scope.game = $firebaseObject(rootRef);
		$scope.game.$bindTo($scope,"game").then(function(){       
		$scope.game.turn = 1;
		$scope.game.winCount = 0;	
		$scope.game.board = [];	
		$scope.game.moveCount = 0;
		});

		$scope.symbols = ["X", "O"];
/* establish $scope.game as the object to firebase.
$scope.game sets the properties in the firebase DB. 
game.turn establishes the first value as 1. 
game.board refrences the DB array in firebase. 
*/

		$scope.getSymbol = function(square) {
			if (!$scope.game) {return;}
			var sqVal = $scope.game.board[square];
			if (sqVal===0){
				return "";
			}else if (sqVal === 1){
				return $scope.symbols[0];
			}
			else if (sqVal === -1){
				return $scope.symbols[1]; 	
			}
		}; 
/*
gives a value of 1 , -1 and directs them to the scope.symbols array established above 
for either an X or O
*/			
	$scope.getMove = function(square) {
        var sqVal = $scope.game.board[square];
        if (sqVal) return;
        $scope.game.board[square] = $scope.game.turn;
        console.log($scope.game.turn);
        $scope.game.turn *= -1;
        console.log($scope.game.turn);
        $scope.getSymbol(square);
        $scope.game.winner = getWinner();
        $scope.game.moveCount++;
        
    };

/* .getMove function.  SqVal is equal to the val in the square array of $scope.game.board[square]
turn, which starts at 1 which gives that value is then changes to -1 after turn.
moveCount goes up one each time a move is made.  After each move the win function is run to see 
if the game is complete.  

*/
// function getWinner() {

//         var sum = 0;
//         var winner = 0;

//         for(var row = 0; row < 3; row++){
//             sum = $scope.game.board[row * 3] + $scope.game.board[row * 3 + 1] + $scope.game.board[row * 3 + 2];
//             winner = checkWinner(sum);
//             if ( winner ) {
             
//                 return winner;
//             }
//         }

//         for(var col = 0; col < 3; col++){
//             sum = $scope.game.board[col] + $scope.game.board[col + 3] + $scope.game.board[col + 6];
//             winner = checkWinner(sum);
//             if ( winner ) {
              
//                 return winner;
//             }
//         }

//         sum = $scope.game.board[0] + $scope.game.board[4] + $scope.game.board[8];
//         winner = checkWinner(sum);
//         if ( winner ) {
           
//                 return winner; 
//             }

//         sum = $scope.game.board[6] + $scope.game.board[4] + $scope.game.board[2];
//         winner = checkWinner(sum);
//         if ( winner ) {
           
//                 return winner;}
       	   
//        	   if (scope.game.moveCount===9 && winner===0){
//        			return alert("BIG SURPRISE!!! IT'S A TIE");
//             }
//         return 0;
//             }
     



    function getWinner() {
        var squares = $scope.game.board;
        var sum;
        for(var row = 0; row < 3; row++){
            sum = squares[row * 3] + squares[row * 3 + 1] + squares[row * 3 +2];
            var winner = checkWinner(sum);
            if ( winner ) { return winner; }

        } 
        	for(var col = 0; col < 3; col++) {
            sum = squares[col] + squares[col + 3] + squares[col + 6];
            var winner = checkWinner(sum);
           	if ( winner ) { return winner; }

        } 
        	sum = squares[0] + squares[4] + squares[8];
            var winner = checkWinner(sum);
           	if ( winner ) { return winner; }

            sum = squares[2] + squares[4] + squares[6];
             var winner = checkWinner(sum);
            if ( winner ) { return winner; }
       return 0;
       		
       		
    }
/* Evaluation of winning scenarios the rows and columns wins are run in a function. 
the diagonals are each checked individually.  if there is a winner it returns the value of the winner. 
If no winner than winner stays at 0. 
*/
	
    function checkWinner(sum) {
	    if(sum === 3){
	        alert("X WINS")
	    	$scope.game.winCount++;
	        return 1;
	    } 
	    else if(sum === -3){
	    	alert("O WINS");
	    	$scope.game.winCount++;
	        return -1;
	    }
	    // else if ($scope.game.moveCount = 9 && sum ===0){
	    // 		alert("IT'S A DRAW");
	    // }
    } 

/* if the sum of the getWinner function 
*/

    $scope.newGame = function () {
    	$scope.game.board = [0,0,0,0,0,0,0,0,0];
	    //$scope.game.winCount = 0;
	    $scope.game.turn = 1;
	    $scope.game.moveCount = 0;
    }
// clear scores doesn't clear winCount to clear winCount

	$scope.refresh = function () {
	    $scope.game.board = [0,0,0,0,0,0,0,0,0];
	    $scope.game.winCount = 0;
	    $scope.game.turn = 1;
	    $scope.game.moveCount = 0;
	}

}



