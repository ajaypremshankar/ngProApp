angular.module("customFilters", [])
.filter("unique", function(){
	return function(data, propertyName){
		if(angular.isArray(data) && angular.isString(propertyName)){
			var results = [];
			var keys = {};
			angular.forEach(data, function(item){
				var val = item[propertyName]
				if(angular.isUndefined(keys[val])){
					keys[val] = true;
					results.push(item);
				}
			});
			return results;
		}
		else{
			return data;
		}
	}
})
.filter("range", function($filter){
	return function(data, page, pageSize){
		if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(pageSize)){
			var start_index = ( page - 1 ) * pageSize;
			if(data.length < start_index){
				return [];
			}else{
				return $filter("limitTo")(data.splice(start_index), pageSize);
			}

		}else{
			return data;
		}
	}
})
.filter("pageCount", function(){
	return function (data, pageSize){
		var result = []
		if(angular.isArray(data)){
			for(var i = 0; i < Math.ceil(data.length/pageSize); i++){
				result.push(i);
			}
			return result;
		}else {
			return data;
		}
	}
}).filter("search", function($filter){
	return function (data, searchText){
		var result = [];
		var pendingForDesc = [];
		if(angular.isArray(data) && searchText){
			angular.forEach(data, function(item){
				if($filter("lowercase")(item.name).indexOf($filter("lowercase")(searchText)) >= 0){
					result.push(item);
				}else{
					pendingForDesc.push(item);
				}
			});
			angular.forEach(pendingForDesc, function(item){
				if($filter("lowercase")(item.description).indexOf($filter("lowercase")(searchText)) >= 0){
					result.push(item);
				}
			});
			return result;
		}else {
			return data;
		}
	}
});
