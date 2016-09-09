
(function () {
    'use strict';

    angular.module('fs-angular-time',[])
    .directive('fsTime', function($location) {
        return {
            templateUrl: 'views/directives/time.html',
            restrict: 'E',
            replace: true,
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
    "<md-select>\n" +
    "    <md-option ng-repeat=\"option in times\" value=\"{{::option.value}}\">\n" +
    "        {{::option.label}}\n" +
    "    </md-option>\n" +
    "</md-select>"
  );

}]);
