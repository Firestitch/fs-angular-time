

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name fs.directives:fs-time
     * @restrict E
     * @param {object} fs-model The model object
     * @param {expression} fs-disabled Used to disable the interface
     * @param {string} fs-label The interface label
     * @param {string} fs-class The class that is inserted into the md-input-container
     * @param {string} fs-hint The interface note
     * @param {integer} fs-interval Step intervals. value % 5 should be equal 0
     */

    angular.module('fs-angular-time', ['fs-angular-util'])
    .directive('fsTime', function() {
        return {
            templateUrl: 'views/directives/time.html',
            restrict: 'E',
            scope: {
                model: '=fsModel',
                disabled: '=fsDisabled',
                label: '@?fsLabel',
                name: '@?fsName',
                class: '@?fsClass',
                required: '@?fsRequired',
                hint: '@?fsHint',
                interval: '@?fsInterval'
            },
            controller: ['$scope','fsUtil',function($scope, fsUtil) {
            	$scope.name = 'input_' + fsUtil.guid();

            }],
            link: function($scope, element, attr) {

               	var day =  moment().startOf('day');
                var times = [];
                var length  = 0;
                var interval = 15;

                if($scope.interval && $scope.interval % 5 === 0)
                    interval = parseInt($scope.interval);

                while (length<1440) {

                    var label = day.format('h:mm a');

                    if(length==0) {
                        label = 'midnight';
                    } else if(length==720) {
                        label = 'noon';
                    }

                    times.push({ value: day.format('HH') + ':' + day.format('mm') + ':00', label: label });
                    length += interval;
                    day.add(interval, 'minutes');
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
    "\t<md-select ng-model=\"model\" aria-label=\"time\" ng-disabled=\"disabled\" required-condition=\"{{required}}\" name=\"{{name}}\">\r" +
    "\n" +
    "\t    <md-option ng-repeat=\"option in times\" value=\"{{::option.value}}\">\r" +
    "\n" +
    "\t        {{::option.label}}\r" +
    "\n" +
    "\t    </md-option>\r" +
    "\n" +
    "\t</md-select>\r" +
    "\n" +
    "    <span ng-show=\"hint\" class=\"hint\">{{hint}}</span>\r" +
    "\n" +
    "</md-input-container>"
  );

}]);
