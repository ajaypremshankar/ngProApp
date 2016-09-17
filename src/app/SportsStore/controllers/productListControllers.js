angular.module("sportsStore")
.constant("productCategoryActiveClass", "btn-primary")
.constant("productListPageCount", 3)
.constant("productListSelectedSort", "name")
.controller("productListCtrl", function($scope, $filter, productCategoryActiveClass,
  productListPageCount, productListSelectedSort, cart){
    var selectedCategory = null;

    $scope.pageSize = productListPageCount;
    $scope.selectedPage = 1;

    $scope.selectedSort = productListSelectedSort;
    $scope.reverse = false;

    $scope.selectCategory = function(category){
      selectedCategory = category;
      $scope.selectedPage = 1;
    }

    $scope.categoryFilterFn = function(product){
      return selectedCategory == null || product.category == selectedCategory;
    }

    $scope.getCategoryClass = function(category){
      return category == selectedCategory ? productCategoryActiveClass : "";
    }

    $scope.selectPage = function(newPage){
      $scope.selectedPage = newPage;
    }

    $scope.getPageClass = function(page){
      return page == $scope.selectedPage ? productCategoryActiveClass : "";
    }

    $scope.selectSort = function(newSort){
      if($scope.selectedSort === newSort){
        $scope.switchReverse();
      }
      $scope.selectedSort = newSort;
    }

    $scope.getSortClass = function(newSort){
      return newSort == $scope.selectedSort ? productCategoryActiveClass : "";
    }

    $scope.switchReverse = function(){
      $scope.reverse = ! $scope.reverse;
    }

    $scope.countProductsInCategory = function(products, category){
      var count = 0;
      if(angular.isArray(products)){
        angular.forEach(products, function(product){
          if($filter("lowercase")(product.category) === $filter("lowercase")(category)){
            count++;
          }
        });
      }
      return count;
    }

    $scope.addProductToCart = function(product){
      cart.addProduct(product.id, product.name, product.price);
    }

  });
