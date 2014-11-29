
/**
 * Created by Ben on 03/10/2014.
 */

function Player(colour,playerBox)
{
	this.score=0;
	this.time=0;
	this.colour=colour;
	this.myTurn=false;
	this.playerBox=playerBox;
	this.timeElement=this.playerBox.querySelector(".time");
	this.moveElement=this.playerBox.querySelector(".move");


}

Player.prototype.onTick=function()
{
	this.time++;
	var minutes=Math.floor(this.time/60);
	minutes=("0" + minutes).slice(-2);
	var seconds=this.time%60;
	seconds=("0" + seconds).slice(-2);
	var timeValue=minutes+":"+seconds;
	this.timeElement.innerHTML=timeValue;
}

Player.prototype.onMove=function()
{
	this.score++;
	var newScore=this.score;
	this.moveElement.innerHTML=newScore;
}


//Player.prototype.addPiecesToBoard=function(board)
//{
//	for (var i=0;i<this.pieces.length;i++)
//	{
//		var piece=this.pieces[i];
//		board.placePiece(piece);
//
//
//	}
//
//}


//
//function Position(x, y)
//{
//	this.x = x;
//	this.y = y;
//}