(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name fs.directives:fs-time
     * @restrict E
     * @param {object} ng-model The model object
     * @param {expression} ng-disabled Used to disable the interface
     * @param {string} fs-label The interface label
     * @param {string} fs-class The class that is inserted into the md-input-container
     * @param {string} fs-hint The interface note
     */

    angular.module('fs-angular-time',[])
    .directive('fsTime', function($location) {
        return {
            templateUrl: 'views/directives/time.html',
            restrict: 'E',
            scope: {
                model: '=ngModel',
                disabled: '=ngDisabled',
                label: '@?fsLabel',
                class: '@?fsClass',
                hint: '@?fsHint'
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