var app = angular.module('app', ['ngSanitize']);

function MainCtrl($scope, $http) {

    $scope.ProductName = 'BENZ';
    $scope.ProductPrice = 1000;
    $scope.Qty = 5;
    $scope.Total = 0;

    $scope.qtyrange = [1, 3, 5, 7];
    $scope.data = [];

    $http.post('/Home/List').success(function (data)
    {
        $scope.data = data;
    });

    $http.post('/Home/ListName').success(function (data) {
        $scope.namelist = data;
    });
    //$scope.data.push({
    //    'Name': 'BMW',
    //    'Price': 100,
    //    'Qty': 5
    //});
    //$scope.data.push({
    //    'Name': 'Tercel',
    //    'Price': 50,
    //    'Qty': 3
    //});

    $scope.data_bak = angular.copy($scope.data);



    $scope.Undo = function () {
        $scope.data = $scope.data_bak.pop();
    };

    $scope.addToCart = function () {
        $scope.data_bak.push(angular.copy($scope.data));

        $scope.data.push({
            'Name': $scope.ProductName,
            'Price': $scope.ProductPrice,
            'Qty': $scope.Qty
        });
        $scope.Total += $scope.getSubtotal($scope.ProductPrice, $scope.Qty);
    };

    $scope.removeAllFromCart = function () {
        $scope.data = [];
        $scope.Total = 0;
    };

    $scope.removeFromCart = function (myid, price) {
        $scope.data_bak.push(angular.copy($scope.data));
        $scope.data.splice(myid, 1);
        $scope.Total -= price;
    };

    $scope.subtotal = function () {
        alert($scope.ProductPrice * $scope.Qty);
    };

    $scope.getSubtotal = function (price, qty) {
        var total = price * qty;
        if (qty >= 10) {
            total = total * 0.8;
        }
        return total;
    };

    $scope.Save = function () {
        
        $http.post('/Home/Save', $scope.data)
            .success(function () { alert("Saved"); }).error(function () { });
    };

    $scope.getDiscountPrice = function () {
        var subtotal = $scope.ProductPrice * $scope.Qty;
        if ($scope.Qty >= 10) {
            subtotal = subtotal * 0.8;
        }
        return subtotal;
    };
}