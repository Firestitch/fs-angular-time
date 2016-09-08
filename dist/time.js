
(function () {
    'use strict';

    angular.module('fs-angular-time',[])
    .directive('fsTime', function($location) {
        return {
            templateUrl: 'views/directives/time.html',
            restrict: 'E',
            scope: {
               //selected: "@fsSelected"
            },

            link: function($scope, element, attrs, ctrl, $transclude) {
               /* $scope.items = [];

                $transclude(function(clone, scope) {

                    angular.forEach(clone,function(el) {
                        if(el.nodeName.match(/fs-tabnav-item/i)) {
                            var path = el.getAttributeNode('fs-url') ? el.getAttributeNode('fs-url').nodeValue : '';
                            $scope.items.push({ path: path, name: el.textContent });
                        }
                    });
                });

                $scope.redirect = function(path) {
                    $location.path(path);
                }*/
            }
        };
    });
})();

angular.module('fs-angular-time').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/time.html',
    "time template"
  );

}]);
