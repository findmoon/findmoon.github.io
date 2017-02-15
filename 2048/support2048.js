documentWidth = window.screen.availWidth;//支持手机端设置，手机可使用的宽度。间距为4%。格子大小为18%*18%;
gridContainerWidth = 0.92*documentWidth;
ceilSideLength = 0.18*documentWidth;
ceilSpace = 0.04*documentWidth;


function getPosTop(i,j){
	//return 20+120*i;
	return ceilSpace + i*(ceilSideLength + ceilSpace);
}

function getPosLeft(i,j){
	//return 20+120*j;
	return ceilSpace + j*(ceilSideLength + ceilSpace);
}

function getNumberBackgroundColor(num) {
	switch(num){
		case 2: return "#eee4da"; break;
		case 4: return "#ede04b"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65ecb"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#9c0"; break;
		case 1024: return "#33b515"; break;
		case 2048: return "#09e"; break;
		case 4096: return "#e6a"; break;
		case 8192: return "#93e"; break;
	}

	return "#000";
}

function getNumberColor(num) {
	if(num <= 4){
		return "#776e65";
	}
	return "#fff";
}

function nospace(){
	for(var i=0; i < 4; i++){
		for(var j=0; j< 4; j++){
			if (board[i][j] === 0) {
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft(board){
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i][j-1] === 0 || board[i][j-1] === board[i][j]) {//当当前位置的左边没有数字或者左边和当前相等，怎可以移动
					return true;
				}
			}
		}
	}

	return false;
}

function noBlockHorizontal(row, col1, col2, board){
	for (var i = col1 + 1; i < col2; i++) {//从rol1列到rol2列是否存在不为0的，存在则有障碍无
		if (board[row][i] != 0) {
			return false;
		}
	}

	return true;
}

function canMoveRight(board){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (board[i][j] != 0) {
				if (board[i][j+1] === 0 || board[i][j+1] === board[i][j]) {//当当前位置的左边没有数字或者左边和当前相等，怎可以移动
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveUp(board){
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i-1][j] === 0 || board[i-1][j] === board[i][j]) {//当当前位置的左边没有数字或者左边和当前相等，怎可以移动
					return true;
				}
			}
		}
	}

	return false;
}

function noBlockHorizontalY(row1, row2, col, board){
	for (var i = row1 + 1; i < row2; i++) {//从rol1列到rol2列是否存在不为0的，存在则有障碍无
		if (board[i][col] != 0) {
			return false;
		}
	}

	return true;
}

function canMoveDown(board){
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i+1][j] === 0 || board[i+1][j] === board[i][j]) {//当当前位置的左边没有数字或者左边和当前相等，怎可以移动
					return true;
				}
			}
		}
	}

	return false;
}

function noMove(board){
	if (canMoveLeft(board) ||
		canMoveRight(board) ||
		canMoveUp(board) ||
		canMoveDown(board)) {//是否可以上下左右移动，都不能则不能移动
		return false;
	}

	return true;
}