
var data_added = {};
var global_data = [];
var chart = angular.module('tableManager', ['smart-table']);

chart.controller('ctrl0', function($scope, $http){ 
	$scope.table_type = ["事实表", "查询表", "中间表", "维度表"];
	$scope.data_level = ["日汇总", "周汇总", "月汇总", "全量汇总", "原子表"];
	$scope.input_man = ["王聪", "刘圣其", "王健", "何敏", "汪儒星", "唐磊朋"];
	$scope.update_man = $scope.input_man;
	$scope.business_type = ["货嘀", "运宝", "陆鲸"];
	$scope.options = {};
	$scope.tableTypeHandler = function(type) {
		$("#table_type").val(type);
	}
	$scope.dataLevelHandler = function(level) {
		$("#data_level").val(level);
	}
	$scope.inputManHandler = function(man) {
		$("#input_man").val(man);
	}
	$scope.updateManHandler = function(man) {
		$("#update_man").val(man);
	}
	$scope.businessTypeHandler = function(btype) {
		$("#business_type").val(btype);
	}
	$scope.addIt = function() {
		$scope.options["tableName"] = $("#table_name").val();
		$scope.options["tableType"] = $("#table_type").val();
		$scope.options["dataLevel"] = $("#data_level").val();
		$scope.options["procName"] = $("#proc_name").val();
		$scope.options["note"] = $("#note_text").val();
		$scope.options["inputMan"] = $("#input_man").val();
		$scope.options["inputDate"] = $("#datetimepicker1").val();
		$scope.options["updateMan"] = $("#update_man").val();
		$scope.options["updateDate"] = $("#datetimepicker2").val();
		$scope.options["businessType"] = $("#business_type").val();
		var cur_id = table_data[table_data.length-1]["tableManagerId"];
		$scope.options["tableManagerId"] = cur_id + 1;
		data_added = $scope.options;
		$("#showAdder").fadeOut();
		$("#add_table").fadeIn();
		console.log(data_added);
		table_data.push(data_added);
	}
	$scope.cancelIt = function() {
		$("#showAdder").fadeOut();
		$("#add_table").fadeIn();
	}
});


chart.controller('ctrl1', function($scope, $http, $filter){
	$http.get('/data')
		.success(function(table_data, status, headers, config){
			$scope.data = table_data;
			global_data = $scope.data;
			$scope.sortReverse = false;
			$scope.itemsByPage = 10;
			$scope.column = [];
			for (var i in $scope.data[0]) {
				$scope.column.push(i);
			}
			$scope.sortType = $scope.column[0];
			$("#add_it").click(function(){
				$scope.data = table_data;
				$scope.$apply();
				$scope.togglePage(1, $scope.sortReverse);
			});

			$scope.toggleSort = function(col) {
				$scope.sortType = col;
				$scope.sortReverse = !$scope.sortReverse;
				 // Everytime sorted, update $scope.data, then go back to page1, meanwhile update $scope.currentData
				$scope.data = $filter('orderBy')($scope.data, $scope.sortType, $scope.sortReverse); 
				$scope.togglePage(1, $scope.sortReverse);
		    };

		    $scope.currentData = $scope.data.slice(0,$scope.itemsByPage);
		    $scope.pageNumber = [];
		    for (var i=1; i<=Math.ceil($scope.data.length / $scope.itemsByPage); i++){
		    	$scope.pageNumber.push(i);
		    }
		    $scope.togglePage = function(pageNum, flag) {
		    	for(var i in $scope.pageNumber) {
		    		$("#page"+$scope.pageNumber[i]).attr("class", "");
		    	}
		    	$("#page"+pageNum).attr("class", "active");
			    	if (pageNum == $scope.pageNumber[$scope.pageNumber.length-1]) 
			    		$scope.currentData = $scope.data.slice($scope.itemsByPage*(pageNum-1));
			    	else
			    		$scope.currentData = $scope.data.slice($scope.itemsByPage*(pageNum-1), $scope.itemsByPage*pageNum);
		    }

		    $scope.popGraph = function(item, col) {
		    	if (col == "tableName") {
		    		var graphwindow = window.open("graph.html?param="+item,"表关系图",
		    			"top=100,left=100,width=700,height=500,menubar=no,scrollbars=no,toolbar=no,status=no");
		    		
		    	}
		    }
		});
})
