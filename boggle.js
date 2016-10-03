var myApp = angular.module('myApp',[]);

myApp.controller('Boggle', ['$scope', function($scope){
	$scope.game = new BoggleBoard
  $scope.board = $scope.game.randBoard();
  $scope.reset = function() {
  	var newBog = new BoggleBoard
    $scope.board = newBog.randBoard();
  }
  $scope.word = "enter";
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
  initalIndicies = this.getIndicies(word[0])
  for (var i = 0; i < initalIndicies.length; i++) {
    initalIndicies[i] = [initalIndicies[i]]
  }
  paths = {
    reference: initalIndicies,
    working: []
  }

  // iterate over the letters
  for (var i = 1; i < word.length; i++) {
    letter = word[i];
    // get the indicies for that letter
    var letterIndicies = this.getIndicies(letter);

    // for each index
    for (var k = 0; k < letterIndicies.length; k++) {


    // iterate over all the current paths in the ref
    for (var j = 0; j < paths.reference.length; j++) {


        // if it is next to the last index in the current path
        if (this.nextTo(paths.reference[j][paths.reference[j].length - 1], letterIndicies[k])) {
          path = paths.reference[j];

          // add that index to a path
          path.push(letterIndicies[k]);
          // push it into working paths
          paths.working.push(path);
        }
      }
    }
    paths.reference = paths.working;
    paths.working = [];
  }

  var filteredForRepeats = this.removeRepeatUse(paths.reference)
  if (filteredForRepeats.length > 0) {
    return filteredForRepeats;
  }
  else {
    return false
  }
}

BoggleBoard.prototype.removeRepeatUse = function(arr) {
  var filtered = [];
  for (var i = 0; i < arr.length; i++) {
    if (this.hasNoRepeats(arr[i])) {
      filtered.push(arr[i])
    }
  }
  return filtered
}

BoggleBoard.prototype.hasNoRepeats = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j] && i != j) {
        return false
      }
    }
  }
  return true
}
