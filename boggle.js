// var myApp = angular.module('myApp',[]);
//
// myApp.controller('Boggle', ['$scope', function($scope){
// 	$scope.game = new BoggleBoard
//   $scope.board = $scope.game.randBoard();
//   $scope.reset = function() {
//   	var newBog = new BoggleBoard
//     $scope.board = newBog.randBoard();
//   }
//
// }])


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
  indexPaths = [this.getIndicies(word[0])];
  if (!indexPaths) { return false };
  for (var i = 1; i < word.length; i++ ) {
    var letterIndicies = this.getIndicies(word[i])
    if (letterIndicies) {
      var replacedPath = []
      while (letterIndicies.length > 0) {
        var currentLetter = letterIndicies.pop()
        for (var j = 0; j < indexPaths.length; j++) {
          var path = indexPaths[j].push(currentLetter);
          var lastTwo
          if () {
            replacedPath.push(path);
          }
        }
      }
      indexPaths = replacedPath
    }
    else {
      return false
    }
  }
  return indexPaths
}

// for each index in ....
// check to see if there 's  any of the next ones work'

// over each path, appends the index to the path.
