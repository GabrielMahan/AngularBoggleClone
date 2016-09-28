var myApp = angular.module('myApp',[]);

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.controller('Boggle', ['$scope', function($scope){
	$scope.game = new BoggleBoard
  $scope.board = $scope.game.randBoard();
  $scope.reset = function() {
  	var newBog = new BoggleBoard
    $scope.board = newBog.randBoard();
  }

}])


var BoggleBoard = function() {
	this.referenceCubes =  ["AAEEGN","ELRTTY","AOOTTW","ABBJOO","EHRTVW","CIMOTU","DISTTY","EIOSST","DELRVY","ACHOPS", "HIMNQU","EEINSU","EEGHNW","AFFKPS","HLNNRZ","DEILRX"];
	this.letterCubeBag = this.referenceCubes;
	this.cubeGrid = this.letterCubeBag;
	this.board = [];
};

BoggleBoard.prototype.clear = function() {
	this.cubeGrid = [];
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
	console.log(this.cubeGrid)
};

BoggleBoard.prototype.fillBoardFromCubeGrid = function() {
	for (var i = 0; i < 16; i++) {
		var randLetterIdx = Math.floor(Math.random() * 6);
		var letter = this.cubeGrid[i][randLetterIdx]
		if (letter === 'Q') { letter = 'Qu' }
    	this.board.push(letter);
	}
};

BoggleBoard.prototype.randBoard = function() {
	this.clear();
	this.shake();
	this.fillBoardFromCubeGrid();
	return this.board;
};
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
