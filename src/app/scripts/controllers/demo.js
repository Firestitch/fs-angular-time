'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope) {


    $scope.text = '';
    $scope.required = true
    $scope.disabled = 0;

    $scope.submit = function() {
        alert('submit');
    }
});
