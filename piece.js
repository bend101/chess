/**
 * Created by Ben on 03/10/2014.
 */

function Piece(player, imageName)
{
	this.player=player;
	this.imageName=imageName;
}

Piece.prototype.getFullImageName = function()
{
	return "images/"+this.imageName+this.player.colour+".png";
}

Piece.prototype.findMovesInDirection=function(board, squares,currentX,currentY,directionX,directionY)
{


	var y=currentY+directionY;
	var x=currentX+directionX;
	while (y<8 && y>=0 && x<8 && x>=0) //while possible position is on board
	{
		var piece = board.getSquare(x, y).piece;

		if (piece === null)  //if possible position is empty
		{
			squares.push(board.getSquare(x, y));

		}
		else if (piece.player !== this.player)  //oppenants piece in position
		{
			squares.push(board.getSquare(x, y));
			if (piece.player !== this.player)
			{
				break;
			}
		}
		else  //otherwise its my piece
		{
			break;
		}
		y = y + directionY;
		x = x + directionX;
	}

}


Piece.prototype.findMovesInDirection2=function(board, squares,currentX,currentY,directionX,directionY)
{

	var y=currentY+directionY;
	var x=currentX+directionX;

	if (y<8 && y>=0 && x<8 && x>=0) //while possible position is on board
	{
		var piece = board.getSquare(x, y).piece;
		if (piece === null)  //if possible position is empty
		{
			squares.push(board.getSquare(x, y));

		}
		else if (piece.player !== this.player)  //oppenants piece in position
		{
			squares.push(board.getSquare(x, y));
		}

	}

}




function Pawn(player,position)
{
	Piece.call(this, player, "pawn");
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

//return a array of the possible move positions for this piece
Pawn.prototype.getPossibleMoves=function(board, currentSquare, squares)
{
	var x=currentSquare.x;
	var y=currentSquare.y;
	var yDirection=1;
	if(this.player.colour==="white")
	{
		yDirection=-1;
	}

	y=y+yDirection;
	if(y<8 && y>=0)
	{
		if (board.getSquare(x, y).piece === null)
		{
			squares.push(board.getSquare(x, y));

			//special condition for being in first position
			if ((currentSquare.y === 1 && this.player.colour==="black") || (currentSquare.y === 6 && this.player.colour==="white"))
			{
				y = y + yDirection;
				if (board.getSquare(x, y).piece === null)
				{
					squares.push(board.getSquare(x, y));
				}
			}
		}
	}
	y=currentSquare.y+yDirection;
	x=currentSquare.x+1;

	if (y<8 && y>=0 && x<8 && x>=0)
	{
		var piece= board.getSquare(x,y).piece;
		if (piece !== null)
		{
			if (this.player !== piece.player)
			{
				squares.push(board.getSquare(x, y));
			}
		}
	}
	y=currentSquare.y+yDirection;
	x=currentSquare.x-1;
	if (y<8 && y>=0 && x<8 && x>=0)
	{
		var piece = board.getSquare(x, y).piece;
		if (piece !== null)
		{

			if (this.player !== piece.player)
			{
				squares.push(board.getSquare(x, y));
			}
		}
	}

}



function Castle(player,position)
{
	Piece.call(this, player,"castle");
}

Castle.prototype = Object.create(Piece.prototype);
Castle.prototype.constructor = Castle;

Castle.prototype.getPossibleMoves=function(board, currentSquare, squares)
{


	this.findMovesInDirection(board,squares, currentSquare.x,currentSquare.y,1,0);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,0,1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,-1,0);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,0,-1);


}



function Knight(player,position)
{
	Piece.call(this, player,"knight");
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;
Knight.prototype.getPossibleMoves=function(board, currentSquare, squares)
{


	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,2,1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,1,2);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-1,2);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-2,1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-2,-1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-1,-2);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,1,-2);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,2,-1);


}



function Bishop(player,position)
{
	Piece.call(this, player, "bishop");
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.getPossibleMoves=function(board, currentSquare, squares)
{


	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,1,1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,1,-1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,-1,1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,-1,-1);


}



function Queen(player,position)
{
	Piece.call(this, player, "queen");
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.getPossibleMoves=function(board, currentSquare, squares)
{


	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,1,0);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,0,1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,-1,0);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,0,-1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,1,1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,1,-1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,-1,1);
	this.findMovesInDirection(board,squares,currentSquare.x,currentSquare.y,-1,-1);


}



function King(player,position)
{
	Piece.call(this, player, "king");
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;
King.prototype.getPossibleMoves=function(board, currentSquare, squares)
{


	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-1,1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-1,0);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,1,-1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,0,-1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,0,1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,-1,-1);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,1,0);
	this.findMovesInDirection2(board,squares,currentSquare.x,currentSquare.y,1,1);


}

