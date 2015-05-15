angular
	.module('ticTacToeApp')
	.controller('TicTacToeController',TicTacToeController);

	TicTacToeController.$inject = ['$scope', '$firebaseObject','$firebaseArray'];


	function TicTacToeController($scope, $firebaseObject, $firebaseArray){
		var rootRef = new Firebase("https://tictactoeii.firebaseio.com/");
		$firebaseObject(rootRef).$bindTo($scope,"game");

		$scope.getSymbol = function(square) {
			if (!$scope.game) return;
			var sqVal = $scope.game.board[square];
			if (sqVal===0){
				return "";
			}else if (sqVal === 1){
				return "X";
			}
			else if (sqVal ===-1){
				return "O"
			}
			}; 
			
	$scope.getMove = function(square) {
        var sqVal = $scope.game.board[square];
        if (sqVal) return;
        $scope.game.board[square] = $scope.game.turn;
        $scope.game.turn *= -1;
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
            sum = squares[col * 3] + squares[col * 3 + 3] + squares[col * 3 + 6];
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
$scope.reset = function () {
    $scope.game.board = [0,0,0,0,0,0,0,0,0];
    $scope.game.winner = 0;
    $scope.game.turn = 1;
}


    








		}




