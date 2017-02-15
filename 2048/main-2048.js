var board = new Array();
var score;
var hasClificted = new Array();//实现一个方格一次移动只叠加一次的效果，不可连续叠加诶

//触摸事件的完善，根据start、end确定，初始化四个坐标
var startX = 0,
	startY = 0,
	endX = 0,
	endY =0;


$(function(){
	prepareForMobile();//设置移动端的css

	newGame();
})

function prepareForMobile(){
	//当大屏幕下，显示适合大小，不用随着屏幕变化
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		ceilSideLength = 100;
		ceilSpace = 20;
	}

	$('#grid-container').css({
		width: gridContainerWidth - 2*ceilSpace,
		height: gridContainerWidth - 2*ceilSpace,
		padding: ceilSpace,
		'border-radius': 0.02*gridContainerWidth
	});

	$('.grid-ceil').css({
		width: ceilSideLength,
		height: ceilSideLength,
		'border-radiuse': 0.02*ceilSideLength
	});
}

function newGame() {
	// 初始化棋盘格
	init();
	//随机在两个格子中生成2或4的数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCeil = $("#grid-ceil-" + i + "-" + j);

			gridCeil.css('top', getPosTop(i,j));
			gridCeil.css('left', getPosLeft(i,j));
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();//将board设置为二维数组
		hasClificted[i] = new Array();
		for (var j = 0; j < 4; j++) {//board二维数组初始化0
			board[i][j] = 0;

			hasClificted[i][j] = false;//初始化为一个二维数组，每一个格子为false，没有发生过碰撞
		}
	}

	updataboardView();
	score = 0;
}

function updataboardView() {
	// number-ceil中的数据每次变化都要更新一次
	$('.number-ceil').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// var gridCeil = $("#grid-ceil-" + i + "-" + j);
			$('#grid-container').append('<div class="number-ceil" id="number-ceil-' + i + '-' + j +'"></div>');
			var theNumberCeil = $('#number-ceil-' + i + '-' + j);

			if (board[i][j] === 0) {
				theNumberCeil.css({
					width: 0,
					height: 0,
					top: getPosTop(i,j) + ceilSideLength/2,
					left: getPosLeft(i,j) + ceilSideLength/2
				});
			}else{
				theNumberCeil.css({
					width: ceilSideLength,
					height: ceilSideLength,
					top: getPosTop(i,j),
					left: getPosLeft(i,j),
					'background-color': getNumberBackgroundColor(board[i][j]),
					color: getNumberColor(board[i][j])
				});
				theNumberCeil.text(board[i][j]);
			}

			hasClificted[i][j] = false;//每一次更新，表示新的碰撞开始，开始前设置为false
		}
	}

	//设置number-ceil的css样式；
	$('.number-ceil').css({
		'line-height': ceilSideLength+'px',
		'font-size': 0.6*ceilSideLength+'px'
	});

}

function generateOneNumber(){
	//先判断有没有空间了，没有空间则不生成
	if(nospace(board)){
		return false;
	}
	//产生一个随机位置
/*	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	while(true){
		if(board[randx][randy] === 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
	}//产生随机位置，死循环，当只有一个或很少的位置可生成时，可能要随机好久，浪费资源，导致变慢*/

	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));

	var times = 0;//给一个次数限制，随机50次，如果没找到则直接给定一个位置
	while(times < 50){
		if(board[randx][randy] === 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
		times++;
	}

	if (times === 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] === 0) {
					randx = i;
					randy = j;
				}
			}
			
		}
	}

	//产生一个随机数
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	//将数据在位置上显示
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;
}


$(document).keydown(function(event){
	event.preventDefault();//阻止当出现滚动条时，发生默认的滚动事件

	switch(event.keyCode){
		case 37://left
			if(moveLeft()){//左移是会在函数内判断是否可以左移，不可以返回false，不操作，可以则移动返回true，生成新数并判断
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38://up
			if(moveUp()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39://right
			if(moveRight()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
			break;
		default: //非上下左右键
			break;
	}
});


//监听touch事件
document.addEventListener("touchstart",function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;

})

document.addEventListener("touchmove",function(event){
	event.preventDefault();//在真机上肯能touch事件无响应，android4.0的一个bug，可以这样解决
})

document.addEventListener("touchend",function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var deltax = endX - startX;
	var deltay = endY - startY;

	if (Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth) {
		return;//当用户仅仅是点击屏幕而不是滑动时，不执行操作
	}

	//x轴方向滑动
	if (Math.abs(deltax) > Math.abs(deltay)) {
		if (deltax > 0) {
			//move Right
			if(moveRight()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
		}else{//mover Left

			if(moveLeft()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
		}
	}else{//y轴方向滑动
		if (deltay > 0) {
			//move down
			if(moveDown()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
		}else{//move up

			if(moveUp()){
				setTimeout("generateOneNumber()",310);
				setTimeout("isGameOver()",300);
			}
		}
	}

	
})

function isGameOver(){
	if (nospace(board) && noMove(board)) {//没有空间和不能相加表示结束
		gameover();
	}
}

function gameover(){
	alert('Game Over!');
}

function moveLeft(){
	if (!canMoveLeft(board)) {//判断是否可以左移
		return false;
	}


	//---moveleft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {//i,k位置为空，且中间没有障碍物
						//move
						shoeMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasClificted[i][k]){//ik与ij相等，且没有障碍,同时i，k位置没有发生过碰撞才能操作，防止连续碰撞叠加
						//move
						shoeMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score,score数值是两个数相遇叠加后的数值
						score += board[i][k]
						updataScore(score);

						hasClificted[i][k] = true;//赋值，表示已经发生碰撞
					}
				}
			}
		}
	}

	setTimeout(function(){
		updataboardView();//将前面对board的操作更新到视图,由于遍历循环瞬间就执行完，300ms的动画还没执行就更新了，所以要延迟更新显示视图以便于看到动画
	},300);
	return true;
}

function moveRight(){
	if (!canMoveRight(board)) {//判断是否可以左移
		return false;
	}


	//---moveleft
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {//i,k位置为空，且中间没有障碍物
						//move
						shoeMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasClificted[i][k]){//ik与ij相等，且没有障碍
						//move
						shoeMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score,score数值是两个数相遇叠加后的数值
						score += board[i][k]
						updataScore(score);

						hasClificted[i][k] = true;//赋值，表示已经发生碰撞
					}
				}
			}
		}
	}

	setTimeout(function(){
		updataboardView();//将前面对board的操作更新到视图,由于遍历循环瞬间就执行完，300ms的动画还没执行就更新了，所以要延迟更新显示视图以便于看到动画
	},300);
	return true;
}

function moveUp(){
	if (!canMoveUp(board)) {//判断是否可以左移
		return false;
	}


	//---moveup
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] === 0 && noBlockHorizontalY(k, i, j, board)) {//i,k位置为空，且中间没有障碍物
						//move
						shoeMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[k][j] === board[i][j] && noBlockHorizontalY(k, i, j, board) && !hasClificted[k][j]){//ik与ij相等，且没有障碍
						//move
						shoeMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score,score数值是两个数相遇叠加后的数值
						score += board[k][j]
						updataScore(score);

						hasClificted[k][j] = true;
					}
				}
			}
		}
	}

	setTimeout(function(){
		updataboardView();//将前面对board的操作更新到视图,由于遍历循环瞬间就执行完，300ms的动画还没执行就更新了，所以要延迟更新显示视图以便于看到动画
	},300);
	return true;
}

function moveDown(){
	if (!canMoveDown(board)) {//判断是否可以左移
		return false;
	}


	//---movedown
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {//此处k的取值一定记住是3，第四个，但是=3
					if (board[k][j] === 0 && noBlockHorizontalY(i, k, j, board)) {//i,k位置为空，且中间没有障碍物
						//move
						shoeMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[k][j] === board[i][j] && noBlockHorizontalY(i, k, j, board) && !hasClificted[k][j]){//ik与ij相等，且没有障碍
						//move
						shoeMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j]
						updataScore(score);

						hasClificted[k][j] = true;
					}
				}
			}
		}
	}

	setTimeout(function(){
		updataboardView();//将前面对board的操作更新到视图,由于遍历循环瞬间就执行完，300ms的动画还没执行就更新了，所以要延迟更新显示视图以便于看到动画
	},300);
	return true;
}
