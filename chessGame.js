/**
 * Created by Ben on 03/10/2014.
 */

function ChessGame(attachmentPoint, intitialPositions)
{

	attachmentPoint.innerHTML=ChessGame.template;
	this.attachmentPoint=attachmentPoint;
	this.boardElement=this.attachmentPoint.querySelector(".board");
	this.board=new Board(this.boardElement, this);
	this.intitialPositions=intitialPositions;
	if (this.intitialPositions===undefined)
	{
		this.intitialPositions=
			"cnbqkbnc"+
			"pppppppp"+
			"        "+
			"        "+
			"        "+
			"        "+
			"PPPPPPPP"+
			"CNBQKBNC";
	}
	var playerTimeElement=this.attachmentPoint.querySelector(".playerWhite");
	var playerTimeElement2=this.attachmentPoint.querySelector(".playerBlack");

	this.playerWhite = new Player("white",playerTimeElement);
	this.playerBlack = new Player("black",playerTimeElement2);
	this.playerWhite.myTurn=true;
	this.timer=setInterval(this.onTimer.bind(this),1000);
	var okButton=document.getElementById("buttonId");
	okButton.addEventListener("click",this.onClickOk.bind(this));
	var closeButton=this.attachmentPoint.querySelector(".closeButton");
	closeButton.addEventListener("click",this.onClickClose.bind(this));

	// add pieces to board
	this.setIntitialPositions();

}




ChessGame.prototype.swapActivePlayer=function()
{
	if (this.playerWhite.myTurn===true)
	{
		this.playerWhite.myTurn=false;
		this.playerBlack.myTurn=true;
		this.playerWhite.onMove();

	}
	else
	{
		this.playerWhite.myTurn=true;
		this.playerBlack.myTurn=false;
		this.playerBlack.onMove();

	}
}

ChessGame.template=
	'<div class="mainDiv">' +
		'<div class="board"></div>'+
	'    <div class="playerArea">' +
	'        <div class="playerInfo playerBlack">' +
	'            <div class="mainPlayerDiv">' +
	'                <div class="playerName">Player Black</div>' +
	'                <div class="timeName">Time</div>' +
	'                <div class="time">00:00</div>' +
	'                <div class="moveName">Move</div>' +
	'                <div class="move">0</div>' +
	'            </div>' +
	'        </div>' +
	'        <div class="playerInfo playerWhite">' +
	'            <div class="mainPlayerDiv">' +
	'                <div class="playerName">Player White</div>' +
	'                <div class="timeName">Time</div>' +
	'                <div class="time">00:00</div>' +
	'                <div class="moveName">Move</div>' +
	'                <div class="move">0</div>' +
	'            </div>' +
	'        </div>' +
	'    </div>' +
		'</div>' +
		'    <div class="pawnPromotion">' +
				'<div class="pawnPromotionHeader">Pawn Promotion</div>' +
		'        <label class="label">' +
		'            <input type="radio" name="labelList" id="queen" value="queen">' +
		'            Queen' +
		'        </label>' +
		'        <label class="label">' +
		'            <input type="radio" name="labelList" id="castle" value="castle">' +
		'            Castle' +
		'        </label>' +
		'        <label class="label">' +
		'            <input type="radio" name="labelList" id="bishop" value="bishop">' +
		'            Bishop' +
		'        </label>' +
		'        <label class="label">' +
		'            <input type="radio" name="labelList" id="knight" value="knight">' +
		'            Knight' +
		'        </label>' +
		'        <div class="buttonDiv">' +
		'        <button id="buttonId">ok</button>'+
		'		</div>'+
		'    </div>' +
		'<div class="checkDiv" id="checkPlayerBlack">'+
		'<span></span>'+
			'<img src="closeButton.png" class="closeButton">'+
		'</div>'+

	'</div>' ;

ChessGame.prototype.onTimer=function()
{
	if (this.playerWhite.myTurn===true)
	{
		this.playerWhite.onTick();
	}
	if (this.playerBlack.myTurn===true)
	{
		this.playerBlack.onTick();
	}
}



ChessGame.prototype.onClickOk=function()
{
	var x=this.board.pawnPromotionSquare.x;
	var y=this.board.pawnPromotionSquare.y;
	var player=this.board.getSquare(x,y).piece.player;
	this.board.getSquare(x,y).removePiece();
	if(document.getElementById('queen').checked)
	{

		this.board.getSquare(x,y).setPiece(new Queen(player))

	}
	if(document.getElementById('castle').checked)
	{

		this.board.getSquare(x,y).setPiece(new Castle(player))

	}
	if(document.getElementById('bishop').checked)
	{

		this.board.getSquare(x,y).setPiece(new Bishop(player));


	}
	if(document.getElementById('knight').checked)
	{

		this.board.getSquare(x,y).setPiece(new Knight(player));

	}
	this.attachmentPoint.querySelector(".pawnPromotion").style.visibility="hidden";
}

ChessGame.prototype.otherPlayer=function(player)
{
	if (player===this.playerWhite)
	{
		return this.playerBlack;
	}
	else
	{
		return this.playerWhite;
	}
}


ChessGame.prototype.onClickClose=function(event)
{
	this.attachmentPoint.querySelector(".checkDiv").style.visibility="hidden";

}

ChessGame.prototype.setIntitialPositions=function()
{
	for (var i=0;i<this.intitialPositions.length;i++)
	{
		var character=this.intitialPositions[i];
		switch (character)
		{
			case "k":
				this.board.getPosition(i).setPiece(new King(this.playerBlack));
				break;
			case "q":
				this.board.getPosition(i).setPiece(new Queen(this.playerBlack));
				break;
			case "b":
				this.board.getPosition(i).setPiece(new Bishop(this.playerBlack));
				break;
			case "n":
				this.board.getPosition(i).setPiece(new Knight(this.playerBlack));
				break;
			case "c":
				this.board.getPosition(i).setPiece(new Castle(this.playerBlack));
				break;
			case "p":
				this.board.getPosition(i).setPiece(new Pawn(this.playerBlack));
				break;


			case "K":
				this.board.getPosition(i).setPiece(new King(this.playerWhite));
				break;
			case "Q":
				this.board.getPosition(i).setPiece(new Queen(this.playerWhite));
				break;
			case "B":
				this.board.getPosition(i).setPiece(new Bishop(this.playerWhite));
				break;
			case "N":
				this.board.getPosition(i).setPiece(new Knight(this.playerWhite));
				break;
			case "C":
				this.board.getPosition(i).setPiece(new Castle(this.playerWhite));
				break;
			case "P":
				this.board.getPosition(i).setPiece(new Pawn(this.playerWhite));
				break;
		}
	}
}