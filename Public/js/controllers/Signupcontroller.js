// Public/js/controllers/SignupController.js
angular.module('balancedBlissApp', [])
.controller('SignupController', ['$scope', '$http', function($scope, $http) {
  console.log('SignupController loaded');
  $scope.user = {};

  $scope.signup = function() {
    console.log('Data yang dikirim:', $scope.user);
    $http.post('/api/signup', $scope.user)
    .then(function(response) {
      console.log('Respons sukses:', response.data);
      alert(response.data.message);  // Menampilkan pesan sukses dari server
      window.location.href = '/login.html';  // Redirect ke halaman login
    })
    .catch(function(err) {
      console.error('Error signup:', err);
      alert(err.data.message || 'Terjadi kesalahan saat signup');  // Menampilkan pesan error dari server
    });
  };
}]);