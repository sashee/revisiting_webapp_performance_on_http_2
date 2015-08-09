angular.module('demoApp', [])

    .controller('MainCtrl', ['$scope',function ($scope) {
        $scope.test="Working!";
    }])
;