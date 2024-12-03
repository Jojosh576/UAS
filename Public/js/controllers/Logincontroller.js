angular.module('balancedBlissApp')
    .controller('LoginController', ['$scope', '$http', function($scope, $http) {
        console.log('LoginController loaded');
        $scope.user = {};

        $scope.login = function() {
            console.log('Attempting login with:', $scope.user);  // Tambahkan log
            $http.post('/auth/login', $scope.user)
                .then(function(response) {
                    console.log('Login success:', response);  // Tambahkan log
                    alert(response.data.message);
                    window.location.href = '/index.html';  // Tambahkan forward slash
                })
                .catch(function(err) {
                    console.error('Login failed:', err);
                    alert(err.data.error || 'Terjadi kesalahan saat login');
                });
        };
    }]);
    res.status(200).json({ message: 'Login successful' });
res.redirect('/');  // Redirect ke halaman index setelah login
