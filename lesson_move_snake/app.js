'use strict';

angular.module('nibbles', [
	'ui.bootstrap',
])
.controller('gamePageController', function ($scope) {
    var vm = this;

    vm.defaultSnake = [
        {
            "left": 10,
            "top": 110
        },
        {
            "left": 10,
            "top": 120
        },
        {
            "left": 10,
            "top": 130
        },
        {
            "left": 10,
            "top": 140
        },
        {
            "left": 10,
            "top": 150
        },
        {
            "left": 10,
            "top": 160
        },
    ];

    if (localStorage['snakeData']){
        vm.snake = angular.fromJson(localStorage['snakeData'])
    } else {
        vm.snake = angular.copy(vm.defaultSnake);
    }
  vm.snakeData = angular.copy(vm.snake);
  vm.move = function(){
    angular.copy(vm.snakeData, vm.snake);
    localStorage.setItem('snakeData', angular.toJson(_.map(vm.snakeData, function(snakeBlockData){ return {left: snakeBlockData.left, top: snakeBlockData.top}; })));
    // console.log("saved", localStorage['snakeData']);

  }
  vm.removeData = function($index){
    vm.snakeData.splice($index, 1);
  }
  vm.addData = function(){
    var lastSnakeData = vm.snakeData[vm.snakeData.length -1];
    vm.snakeData.push({"left": lastSnakeData.left , "top": lastSnakeData.top});
  }
  vm.reset = function(){
    vm.snake = angular.copy(vm.defaultSnake);
    vm.snakeData = angular.copy(vm.defaultSnake);
  }
  console.log(vm.snake);
}).controller('snakeBlockController', function ($scope) {
    var vm = this;
    console.log('init block', $scope.snakeBlock);
    vm.snakeStyle = {
        "left": $scope.snakeBlock.left + "px",
        "top": $scope.snakeBlock.top + "px",
    }
});
