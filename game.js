// JavaScript Document

var mousebox = $("<p class='focus'><span class='lt chessbox'></span><span class='rt chessbox'></span><span class='ld chessbox'></span><span class='rd chessbox'></span></p>");
var map;
var blackman,whiteman;
var end=0;

blackman = "<img src='images/black.png'/>"; // 黑棋 -1
whiteman = "<img src='images/white.png'/>"; // 白旗 +1

window.onload = function(){
  createBoard();
	init();
	map[7][7][0] = 1;
	var begin=$(".box ul:eq(7) li:eq(7)");
	begin.append(whiteman);
	begin.unbind("click");
	begin.unbind("hover");
	$(".box ul li").click(function(){
		var row,col,row_ul;
		row_ul = $(this).parent("ul");
		row = row_ul.parent("div").find("ul").index(row_ul);
		col = row_ul.find("li").index($(this));
		$(this).find("p").remove();
		map[row][col][0] = -1;
		$(this).append(blackman);
		$(this).unbind("click");
		$(this).unbind("hover");
		win(row,col);
		if(end == 0)
			chessPc();
	});
		
	$(".box ul li").hover(
	  function () {
		$(this).append(mousebox);
	  }, 
	  function () {
		$(this).find("p").remove();
	  }
	);
}
	
function chessPc(){
	var max_scora=0,min_scora=0;
	var max_score=[0,0],min_score=[0,0];
	var maxi=0,maxj=0,mini=0,minj=0;
	var final_row,finalj_col;
	
	for(var i=-4;i<19;i++){
		for(var j=-4;j<19;j++){
			for(var k=1;k<11;k++){
				map[i][j][k]=0;
			}
		}
	}
	
	for(var i=0;i<15;i++)
		for(var j=0;j<15;j++){
			if(map[i][j][0] == 0){
				for(var k=-1;k<5;k++){
					map[i][j][1] += weight(map[i][j-k][0],k);
					map[i][j][2] += weight(map[i-k][j-k][0],k);
					map[i][j][3] += weight(map[i-k][j][0],k);
					map[i][j][4] += weight(map[i-k][j+k][0],k);
					map[i][j][5] += weight(map[i][j+k][0],k);
					map[i][j][6] += weight(map[i+k][j+k][0],k);
					map[i][j][7] += weight(map[i+k][j][0],k);
					map[i][j][8] += weight(map[i+k][j-k][0],k);
				}
				for(var k=1;k<9;k++){
					if(map[i][j][k] > max_score[0]){
						max_score[1] = max_score[0];
						max_score[0] = map[i][j][k];
					}
					else if(map[i][j][k] > max_score[1])
					 	max_score[1] = map[i][j][k];	
					if(map[i][j][k] < min_score[0]){
						min_score[1] = min_score[0];
						min_score[0] = map[i][j][k];
					}
					else if(map[i][j][k] < min_score[1])
					 	min_score[1] = map[i][j][k];
				}		
				if(max_score[0]>16) max_score[0] = max_score[0]*10;
				else if(max_score[0]==13) max_score[0] = 1;
				map[i][j][9] = max_score[0]*2 + max_score[1];
				if(min_score[0]<-16) min_score[0] = min_score[0]*10;
				else if(min_score[0]==-15||-10) min_score[0] = 1;
				map[i][j][10] = min_score[0]*2 + min_score[1];
				max_score=[0,0],min_score=[0,0];
			}
		}

	for(var i=0;i<15;i++)
		for(var j=0;j<15;j++){
			if(map[i][j][0] == 0){
				if(map[i][j][9] > max_scora){
					max_scora = map[i][j][9]; 
					maxi = i;
					maxj = j;
				}
				if(map[i][j][10] < min_scora){
					min_scora = map[i][j][10];
					mini = i;
					minj = j;
				}
			}
		}	
	if( max_scora + 4 + min_scora> 0){
		final_row = maxi;
		final_col = maxj;
	}
	else{
		final_row = mini;
		final_col = minj;
	}
	map[final_row][final_col][0] = 1;
	var white=$(".box ul:eq("+final_row+") li:eq("+final_col+")");
	white.append(whiteman);
	white.unbind("click");
	white.unbind("hover");
	win(final_row,final_col);
}
	
function createBoard(){
	var chessboard=document.createElement("table");
	chessboard.className="bg";
	chessboard.cellPadding=0;
	chessboard.cellSpacing=0;
	var row,cell;
	for(var i=0;i<14;i++){
		row=chessboard.insertRow(-1);
		for(var j=0;j<14;j++){
			cell=row.insertCell(-1);
		}
	}
	
	var chessbox=document.createElement("div");
	var box_ul,box_li;
	chessbox.className="box";
		for(var i=0;i<15;i++)
			{
			box_ul = document.createElement("ul");
			for(var j=0;j<15;j++){
				box_li = document.createElement("li");
				box_ul.appendChild(box_li);
			}
			chessbox.appendChild(box_ul);
	}
	$("#chessboard").append(chessboard);	
	$("#chessboard").append(chessbox);	
}
	
function init(){
	map=new Array();
	for(var i=-4;i<19;i++){
	    map[i]=new Array();
		for(var j=-4;j<19;j++){
			map[i][j]=new Array();
			for(var k=0;k<11;k++){
				map[i][j][k]=0;
			}
		}
	}
}

function win(row,col){
	var flag = map[row][col][0];	
	var n,m;	
	for (var i=0; i<4; i++){
		var count = 1;
		for( k=1;k<5;k++){
			switch(i){
				case 0:	n=0;m=k; break;
				case 1:	n=k;m=k; break;
				case 2:	m=0;n=k; break;
				case 3:	n=k;m=-k; break;
				default: break;
				}
			if(map[row+n][col+m][0] == flag){ count++ ;}
			else {break;}
		}
		for( k=1;k<5;k++){
			switch(i){
				case 0:	n=0;m=k; break;
				case 1:	n=k;m=k; break;
				case 2:	m=0;n=k; break;
				case 3:	n=k;m=-k; break;
				default: break;
				}
			if(map[row-n][col-m][0] == flag){ count++ ;}
			else {break;}
		}
		if(count>4) {
			if(map[row][col][0]==1)
				alert("白棋赢！");
			else
				alert("黑棋赢！");
			end = 1;
			location.reload();
			break;
		}
	}
}

function weight(value,index){
	var multi = [0,9,5,3,2];
	var result;
	if(index == -1) {
		switch(value){
				case 0:	return 0;
				case 1:	return 5;
				case -1: return -2;
		}
	}
	return value * multi[index];
}
