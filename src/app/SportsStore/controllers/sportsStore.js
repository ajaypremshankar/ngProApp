var httpData = {};

angular.module("sportsStore")
.constant("dataURL", "http://localhost:2403/products")
.constant("orderURL", "http://localhost:2403/orders")
.controller("sportsStoreCtrl", function ($scope, $http, $location, dataURL, orderURL, cart) {

	$scope.data = {};
	$http.get(dataURL)
	.success(function (data) {
		$scope.data.products = data;
	})
	.error(function(error){
		$scope.data.error = error;
	});

	$scope.sorts = [ "name", "price" ];


	$scope.sendOrders = function(shippingDetails){
		var order = angular.copy(shippingDetails);
		order.products = cart.getProducts();
		$http.post(orderURL, order)
		.success(function(data){
			$scope.data.orderId = data.id;
			cart.getProducts().length = 0;
		})
		.error(function(error){
			$scope.data.orderError = error;
		})
		.finally(function(){
			$location.path("/complete");
		});
	}

});
