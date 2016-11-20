(function () {
    'use strict';

    angular.module('fs-angular-time',[])
    .directive('fsTime', function($location) {
        return {
            templateUrl: 'views/directives/time.html',
            restrict: 'E',
            scope: {
                model: '=ngModel'
            },
            link: function($scope, element, attr) {

               var day =  moment().startOf('day');

                var times = [];

                var length  = 0;

                while (length<1440) {

                    var label = day.format('h:mm a');

                    if(length==0) {

                        label = 'midnight';
                    } else if(length==720) {

                        label = 'noon';
                    }

                    times.push({ value: day.format('HH') + ':' + day.format('mm') + ':00', label: label });

                    length += 15;

                    day.add(15, 'minutes');
                }

                $scope.times = times;
            }
        };
    });
})();