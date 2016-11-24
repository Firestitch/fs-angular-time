
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

    angular.module('fs-angular-time', ['fs-angular-util'])
    .directive('fsTime', function(fsUtil) {
        return {
            templateUrl: 'views/directives/time.html',
            restrict: 'E',
            scope: {
                model: '=ngModel',
                disabled: '=ngDisabled',
                label: '@?fsLabel',
                name: '@?fsName',
                class: '@?fsClass',
                required: '=fsRequired',
                hint: '@?fsHint'
            },
            link: function($scope, element, attr) {
               $scope.name = $scope.name ? $scope.name : 'input_' + fsUtil.guid();

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
    "<md-input-container class=\"{{class}}\">\n" +
    "\t<label ng-show=\"label\">{{label}}</label>\n" +
    "\t<md-select ng-model=\"model\" aria-label=\"time\" ng-disabled=\"disabled\" ng-required=\"required\" name=\"{{name}}\">\n" +
    "\t    <md-option ng-repeat=\"option in times\" value=\"{{::option.value}}\">\n" +
    "\t        {{::option.label}}\n" +
    "\t    </md-option>\n" +
    "\t</md-select>\n" +
    "        <span ng-show=\"hint\" class=\"hint\">{{hint}}</span>\n" +
    "</md-input-container>"
  );

}]);
