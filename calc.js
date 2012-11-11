/* Yes, this is ugly code. It gets the job done. */

function CalcCtrl($scope) {
	$scope.commonRatios = [
		{
			name: '4:3',
			left: [4, 3],
			rightFirst: 1024
		},
		{
			name: 'Golden ratio',
			left: [1, 1.618],
			rightFirst: 800
		},
		{
			name: '2, 4, 8, ..., 2⁸',
			left: [1, 2, 4, 8, 16, 32, 64, 128, 256],
			rightFirst: 3
		},
		{
			name: 'KiB, MiB, GiB',
			left: [1, 1024, 1024*1024, 1024*1024*1024],
			rightFirst: 100
		}
	];
	$scope.rightNumbers = [];

	var populateRight = function(scale) {
		var left = $scope.leftNumbers;
		var length = left.length;
		var right = $scope.rightNumbers;
		right.splice(length - 1, right.length - length + 1);
		for (var i = 0; i < length; i++) {
			if (i === length - 1 && left[i].v === '') continue;
			var newV = left[i].v*scale;
			if (i < right.length && right[i].v === newV) continue;
			right[i] = {v: newV};
		}
	}

	$scope.useRatio = function(i) {
		var ratio = $scope.commonRatios[i];
		var left = ratio.left;
		var length = left.length;
		$scope.leftNumbers = [];
		for (var i = 0; i < length; i++) {
			$scope.leftNumbers[i] = {v: left[i]};
		}
		$scope.leftNumbers[length] = {v: ''};
		var scale = ratio.rightFirst / left[0];
		populateRight(scale);
	}

	$scope.useRatio(0);

	var removeEmptyItems = function(left) {
		var length = left.length;
		for (var i = length-1; i--;) {
			var v = left[i].v;
			if (v === '' || v === 0) {
				left.splice(i, 1);
			}
		}
	}

	var addNewItem = function(left) {
		var length = left.length;
		if (left[length-1].v !== '') {
			left[length] = {v: ''};
		}
	}

	$scope.update = function(side, i) {
		if (side === 'right') {
			var leftNth = $scope.leftNumbers[i].v;
			var rightNth = $scope.rightNumbers[i].v;
			var scale = rightNth / leftNth;
			populateRight(scale, i);
			return;
		}
		// now side === 'left'
		var left = $scope.leftNumbers;
		removeEmptyItems(left);
		addNewItem(left);
		$scope.update('right', 0);
	}
}
