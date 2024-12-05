angular.module('balancedBlissApp')
    .controller('LoginController', ['$scope', '$http', function($scope, $http) {
        console.log('LoginController loaded');
        $scope.user = {};

        // Login function
        $scope.login = function() {
            $http.post('/auth/login', $scope.user)
                .then(function(response) {
                    alert(response.data.message);
                    window.location.href = 'index.html';
                })
                .catch(function(err) {
                    console.error('Login failed:', err);
                    alert(err.data.error);
                });
        };
    }]);
