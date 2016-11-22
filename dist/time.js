
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
                class: '@?fsClass'
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

angular.module('fs-angular-time').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/time.html',
    "<md-input-container class=\"{{class}}\">\r" +
    "\n" +
    "\t<label ng-show=\"label\">{{label}}</label>\r" +
    "\n" +
    "\t<md-select ng-model=\"model\" aria-label=\"time\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "\t    <md-option ng-repeat=\"option in times\" value=\"{{::option.value}}\">\r" +
    "\n" +
    "\t        {{::option.label}}\r" +
    "\n" +
    "\t    </md-option>\r" +
    "\n" +
    "\t</md-select>\r" +
    "\n" +
    "</md-input-container>"
  );

}]);
