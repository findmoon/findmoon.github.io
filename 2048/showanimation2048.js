function showNumberWithAnimation(i, j, randNumber){

	var numberCeil = $('#number-ceil-' + i + '-' + j);
	numberCeil.css({
		'background-color': getNumberBackgroundColor(randNumber),
		color: getNumberColor(randNumber)
	});
	numberCeil.text(randNumber);

	numberCeil.animate({
		width: ceilSideLength,
		height: ceilSideLength,
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	},300);
}

function shoeMoveAnimation(fromx, fromy, tox, toy){
	var numberCeil = $('#number-ceil-' + fromx + '-' + fromy)//获取当前位置的number-ceil节点，对其进行动画移动
	// console.log(tox);
	numberCeil.animate({
		top: getPosTop(tox,toy),
		left: getPosLeft(tox,toy)
	},300);
}

function updataScore(score){
	$('#score').text(score);
}