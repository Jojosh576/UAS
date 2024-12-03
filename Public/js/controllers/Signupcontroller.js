angular.module('balancedBlissApp', [])
    .controller('SignupController', ['$scope', '$http', function($scope, $http) {
        console.log('SignupController loaded');
        $scope.user = {};

        $scope.signup = function() {
            console.log('Data yang dikirim:', $scope.user);
            $http.post('/api/signup', $scope.user)
                .then(function(response) {
                    console.log('Respons sukses:', response.data);
                    alert(response.data.message);
                    window.location.href = '/login.html';
                })
                .catch(function(err) {
                    console.error('Error signup:', err);
                    alert(err.data.error || 'Terjadi kesalahan saat signup');
                });
        };
    }]);
    res.status(201).json({ 
        message: 'Signup berhasil', 
        user: { username: user.username, createdAt: user.createdAt }
    });
    res.redirect('/');  // Redirect ke halaman index setelah signup
    