var app = angular.module('myapp', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});
app.directive('helloWorld',function(){
  return {
      replace:true,
      restrict: 'AE',
      template: '<h3>Hello World!!</h3>'
  }
});

/*
function test(){
	$("#login").click(function(){
		alert("fuck");

	});
}
*/