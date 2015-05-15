angular
	.module('ticTacToeApp')
	.controller('TicTacToeController',TicTacToeController);

	TicTacToeController.$inject = ['$scope', '$firebaseObject','$firebaseArray'];


	function TicTacToeController($scope, $firebaseObject, $firebaseArray){
		var rootRef = new Firebase("https://tictactoeii.firebaseio.com/");
		$scope.game = $firebaseObject(rootRef).$bindTo($scope,"game");

		$scope.game.turn= 1;
		$scope.symbols = ["X", "O"]
		

		$scope.getSymbol = function(square) {
			if (!$scope.game) return;
			var sqVal = $scope.game.board[square];
			if (sqVal===0){
				return "";
			}else if (sqVal === 1){
				$scope.symbols[square] = "X";
			}
			else if (sqVal ===-1){
				$scope.symbols[square] = "O";			}
		}; 
			
	$scope.getMove = function(square) {
        var sqVal = $scope.game.board[square];
        if (sqVal) return;
        $scope.game.board[square] = $scope.game.turn;
        console.log($scope.game.turn)
        $scope.game.turn *= -1;
        console.log($scope.game.turn)
        $scope.game.winner = getWinner();
    }



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

        } sum = squares[dia * 3] + squares[dia * 3 + 4] + squares[dia * 3 + 8];
            var winner = checkWinner(sum);
           if ( winner ) { return winner; };

          sum = squares[dia * 3] + squares[dia * 3 + 2] + squares[dia * 3 +4];
             var winner = checkWinner(sum);
           if ( winner ) { return winner; };
       return 0;
    }

    
    function checkWinner(sum) {
	    if(sum === 3){
	        return 1
	    } else if(sum === -3){
	        return -1
	    }
    } 

	$scope.refresh = function () {
	    $scope.game.board = [0,0,0,0,0,0,0,0,0];
	    $scope.game.symbols = [""];
	    $scope.game.winner = 0;
	    $scope.game.turn = 1;
	    console.log("refreshing")
	}

	$scope.refresh();

}




