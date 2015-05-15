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
		});
		$scope.symbols = ["X", "O"];
		

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
			
	$scope.getMove = function(square) {
        var sqVal = $scope.game.board[square];
        if (sqVal) return;
        $scope.game.board[square] = $scope.game.turn;
        console.log($scope.game.turn);
        $scope.game.turn *= -1;
        console.log($scope.game.turn);
        $scope.getSymbol(square);
        $scope.game.winner = getWinner();
    };



    function getWinner() {
        var squares = $scope.game.board;
        var sum;
        for(var row = 0; row < 3; row++){
            sum = squares[row * 3] + squares[row * 3 + 1] + squares[row * 3 +2];
            var winner = checkWinner(sum);
           if ( winner ) { return winner; }

        } for(var col = 0; col < 3; col++) {
            sum = squares[col] + squares[col + 3] + squares[col + 6];
            var winner = checkWinner(sum);
           if ( winner ) { return winner; }

        } sum = squares[0] + squares[4] + squares[8];
            var winner = checkWinner(sum);
           if ( winner ) { return winner; }

          sum = squares[2] + squares[4] + squares[6];
             var winner = checkWinner(sum);
           if ( winner ) { return winner; }
       return 0;
    }

	
    function checkWinner(sum) {
	    if(sum === 3){
	    	$scope.game.winCount++;
	        return 1
	        alert("X WINS")
	    } else if(sum === -3){
	    	$scope.game.winCount++;
	        return -1
	    	alert("O WINS");
	    }
    } 

    $scope.newGame = function () {
    	$scope.game.board = [0,0,0,0,0,0,0,0,0];
	    //$scope.game.winCount = 0;
	    $scope.game.turn = 1;
    }
// clear scores needs to clear winCount

	$scope.refresh = function () {
	    $scope.game.board = [0,0,0,0,0,0,0,0,0];
	    $scope.game.winCount = 0;
	    $scope.game.turn = 1;
	    
	}

	

}




