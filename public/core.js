// public/core.js
var persistTool = angular.module('persistTool', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when submitting the upload form, send the file to the node api
  $scope.uploadFile = function(picFile) {
    console.log("in uploadFile");
//    var fd = new FormData();
//    fd.append("file", picFile);

    $http.post('/upload', $scope.formData).success(function(data) {
      $scope.formData = {};
      console.log("all right");
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }
}
