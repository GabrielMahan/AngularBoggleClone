var myApp = angular.module('myApp',[]);

myApp.controller('Boggle', ['$scope', function($scope){
	$scope.game = new BoggleBoard
  $scope.board = $scope.game.randBoard();
  $scope.reset = function() {
  	$scope.game = new BoggleBoard
    $scope.board = $scope.game.randBoard();
  }
  $scope.word = "";
  $scope.path = $scope.game.getWordRoutes($scope.word)

}])


var BoggleBoard = function() {
	this.referenceCubes =  ["AAEEGN","ELRTTY","AOOTTW","ABBJOO","EHRTVW","CIMOTU","DISTTY","EIOSST","DELRVY","ACHOPS", "HIMNQU","EEINSU","EEGHNW","AFFKPS","HLNNRZ","DEILRX"];
	this.cubeGrid = this.letterCubeBag;
  this.letterCubeBag = this.referenceCubes;
	this.board = [];
};


// board management helper methods

BoggleBoard.prototype.clear = function() {
	this.cubeGrid = this.referenceCubes;
	this.board = []
	this.letterCubeBag = this.referenceCubes;
};

BoggleBoard.prototype.randIndex = function() {
	return Math.floor((Math.random() * this.letterCubeBag.length -1));
};

BoggleBoard.prototype.pickCube = function() {
	this.cubeGrid.push(this.letterCubeBag.splice(this.randIndex(), 1)[0]);
};

BoggleBoard.prototype.shake = function() {
	for (var i = 0; i < 16; i++) {
    	this.pickCube();
	}
};

BoggleBoard.prototype.fillBoardFromCubeGrid = function() {
	for (var i = 0; i < 16; i++) {
		var randLetterIdx = Math.floor(Math.random() * 6);
		var letter = this.cubeGrid[i][randLetterIdx]
		if (letter === 'Q') { letter = 'Qu' }
    	this.board.push(letter);
	}
};

// sets a random board
BoggleBoard.prototype.randBoard = function() {
	this.clear();
	this.shake();
	this.fillBoardFromCubeGrid();
	return this.board;
};

// match checking methods
BoggleBoard.prototype.horizontalMatch = function(i1, i2) {
		if (Math.abs(i2-i1) <= 1 && Math.floor(i2 / 4) === Math.floor(i1 / 4) ) { return true }
		else { return false }
};

BoggleBoard.prototype.verticalMatch = function(i1, i2) {
		if (  Math.abs(Math.floor(i2 / 4) - Math.floor(i1 / 4)) === 1 && i1 % 4 === i2 % 4 ) {return true}
		else {return false }
};

BoggleBoard.prototype.diagonalMatch = function(i1, i2) {
		if ( Math.abs((i1 % 4) - (i2 % 4)) === 1 && Math.abs(Math.floor(i2 / 4) - Math.floor(i1 / 4)) === 1 ) {return true}
		else {return false }
};

BoggleBoard.prototype.nextTo = function(i1, i2) {
	if (this.horizontalMatch(i1,i2) || this.verticalMatch(i1,i2) || this.diagonalMatch(i1,i2))  { return true }
	else { return false }
}

BoggleBoard.prototype.getIndicies = function(letter) {
  var indicies = [];
  for (var i = 0; i < this.board.length; i++) {
    if (letter.toUpperCase() === this.board[i]) {
      indicies.push(i)
    }
  }
  if (indicies.length === 0) { return false }
  else { return indicies }
}

BoggleBoard.prototype.getWordRoutes = function(word) {
	var letterArr = word.split('');
	var indexes = [];
	routes = []


	for (var i = 0; i < letterArr.length; i++) {
		var lICheck = this.getIndicies(letterArr[i]);
		if (lICheck && i === 0) {
			lICheck.forEach((idx) => {
				routes.push([idx])
			})
		}
		else if (lICheck) {
			indexes.push(lICheck);
		}
		else {
			return false
		}
	};

	var indexesLength  = indexes.length
	var currentRoutes = []
	for (var i = 0; i < indexesLength; i++) {
		var current = indexes.shift();
		console.log('current', current)
		current.forEach((idx) => {
			routes.forEach((route) => {
				if (route[i] || route[i] === 0) {
					if (this.nextTo(route[i], idx)) {
						currentRoutes.push(route.concat(idx));
					};
				};
			});
		});
		routes = currentRoutes;
		currentRoutes = [];
	}

	routes =  routes.filter(this.removeRepeats)
	if (routes.length === 0) {
		return false;
	}
	else {
		return routes;
	}
}

BoggleBoard.prototype.removeRepeats = function(path) {
	for (var i = 0; i < path.length; i++) {
		for (var j = 0; j < path.length; j++) {
			if (path[i] === path[j] && i != j) {
				return false
			}
		}
	}
	return true
}
