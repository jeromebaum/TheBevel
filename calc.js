/* Yes, this is ugly code. It gets the job done. */

function CalcCtrl($scope) {
	$scope.leftNumbers = [{v:4}, {v:3}, {v:''}];
	$scope.rightNumbers = [{v:1024}, {v:768}, {v:''}];

	$scope.commonRatios = [
		{
			name: '1024x768',
			left: [{v:1024}, {v:768}, {v:''}],
			right: [{v:800}, {v:600}, {v:''}]
		},
		{
			name: 'Golden ratio',
			left: [{v:1000}, {v:1618}, {v:''}],
			right: [{v:800}, {v:1618*800/1000}, {v:''}]
		}
	];

	var leftFirst = $scope.leftNumbers[0].v;
	var rightFirst = $scope.rightNumbers[0].v;

	$scope.update = function(side, index) {
		var itemCount = $scope.leftNumbers.length;
		if (index === 0) {
			// base ratio change
			// change all other items on our side
			if (side === 'left') {
				var multiplier = Math.max($scope.leftNumbers[0].v, 1) / leftFirst;
				// yes, exclude first and last!
				for (var i = 1; i < itemCount - 1; i++) {
					$scope.leftNumbers[i].v *= multiplier;
				}
			}
			if (side === 'right') {
				var multiplier = Math.max($scope.rightNumbers[0].v, 1) / rightFirst;
				// yes, exclude first and last!
				for (var i = 1; i < itemCount - 1; i++) {
					$scope.rightNumbers[i].v *= multiplier;
				}
			}
		} else {
			if (index === itemCount - 1) {
				// new-item set
				// add another new-item
				$scope.leftNumbers[itemCount] = {v:''};
				$scope.rightNumbers[itemCount] = {v:''};
			} else {
				// if set to 0, remove this row
				if ((side === 'left' && $scope.leftNumbers[index].v === 0) ||
					(side === 'right' && $scope.rightNumbers[index].v === 0)) {
					$scope.leftNumbers.splice(index, 1);
					$scope.rightNumbers.splice(index, 1);
				}
			}
			// item change
			// change corresponding item on other side
			if (side === 'left') {
				var multiplier = rightFirst / leftFirst;
				$scope.rightNumbers[index].v = $scope.leftNumbers[index].v;
				$scope.rightNumbers[index].v *= multiplier;
			}
			if (side === 'right') {
				var multiplier = leftFirst / rightFirst;
				$scope.leftNumbers[index].v = $scope.rightNumbers[index].v;
				$scope.leftNumbers[index].v *= multiplier;
			}
		}
		// update *First
		leftFirst = Math.max($scope.leftNumbers[0].v, 1);
		rightFirst = Math.max($scope.rightNumbers[0].v, 1);
	}

	$scope.useRatio = function(i) {
		var ratio = $scope.commonRatios[i];
		$scope.leftNumbers = ratio.left;
		$scope.rightNumbers = ratio.right;
		leftFirst = ratio.left[0].v;
		rightFrist = ratio.right[0].v;
	}
}
