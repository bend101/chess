/**
 * Created by Ben on 04/10/2014.
 */

function Board(attachElement, chessGame)
{
	this.squares = [];
	this.possibleMovesArray=[];
	this.squareClicked=null;
	this.chessGame=chessGame;
	this.attachElement=attachElement;


	var oddEven = 0;
	for (var y = 0; y < 8; y++)
	{

		for (var x = 0; x < 8; x++)
		{
			var element = document.createElement("div");
			element.className = "squareStyling";
			attachElement.appendChild(element);
			if (x === 0)
			{
				element.className = element.className + " squareStylingFirstDiv";
			}
			if (oddEven % 2 === 0)
			{
				element.className = element.className + " alternatives";
			}
			var square = new Square(element,x,y);
			this.squares.push(square);

			element.addEventListener("click", this.onClick.bind(this,square));

			oddEven++;
		}
		oddEven++;
	}
}



Board.prototype.removeHighlightedSquares=function()
{
	for (var i=0; i<this.possibleMovesArray.length;i++)
	{
		var string= this.possibleMovesArray[i].pointerToHTMLElement.className;
		var replace=string.replace("changeColourOfDiv","");
		this.possibleMovesArray[i].pointerToHTMLElement.className=replace;
	}
}

Board.prototype.onClick=function(square, event)
{
	this.removeHighlightedSquares();

	// check if click on previous possible move => move piece to this square
	for (var i=0;i<this.possibleMovesArray.length;i++)
	{
		var p=this.possibleMovesArray[i];
		if (p.x===square.x && p.y===square.y)
		{
			var piece=this.squareClicked.piece;
			this.squareClicked.removePiece();
			square.removePiece();
			square.setPiece(piece);
			if (square.piece.player.colour==="white" && square.y===0 && square.piece instanceof Pawn)
			{

				this.pawnPromotion(square)
			}
			if (square.piece.player.colour==="black" && square.y===7 && square.piece instanceof Pawn)
			{

				this.pawnPromotion(square)
			}
			this.possibleMovesArray=[];
			this.chessGame.swapActivePlayer();
			var check=this.checkForCheck(this.chessGame.otherPlayer(piece.player));
			if (check===true)
			{
				var checkMate=this.checkForCheckMate(this.chessGame.otherPlayer(piece.player));
				if (checkMate===true)
				{
					alert("checkmate");
				}
				if (checkMate===false)
				{
					this.chessGame.attachmentPoint.querySelector(".checkDiv").style.visibility = "visible";
					this.chessGame.attachmentPoint.querySelector(".checkDiv span").innerHTML = "Check for player " + this.chessGame.otherPlayer(piece.player).colour;
				}

			}
			return;
		}
	}



	// save the square that was clicked and the list of moves
	this.squareClicked=square;

	if (square.piece!==null && square.piece.player.myTurn===true)
	{
		this.possibleMovesArray = [];
		square.piece.getPossibleMoves(this,square, this.possibleMovesArray);
		this.removeCheckMoves(this.possibleMovesArray,square);

		//console.log(this.possibleMovesArray);

		// highlight the possible moves in the dom
		for (var i = 0; i < this.possibleMovesArray.length; i++)
		{
			var square = this.possibleMovesArray[i];
			square.pointerToHTMLElement.className = square.pointerToHTMLElement.className + " changeColourOfDiv";
		}
	}

}

Board.prototype.getSquare=function(x,y)
{
	return this.squares[y*8+x];
}

Board.prototype.pawnPromotion=function(square)
{
	this.pawnPromotionSquare=square;
	this.chessGame.attachmentPoint.querySelector(".pawnPromotion").style.visibility="visible";
}


Board.prototype.checkForCheck=function(player)
{
	var allOfThePossibleMoves = [];
	for (var i=0;i<this.squares.length;i++)  //going through all the squares
	{
			if (this.squares[i].piece !==null)
			{
				if (this.squares[i].piece.player !== player)  //finding all the squares with white pieces
				{

					this.squares[i].piece.getPossibleMoves(this, this.squares[i], allOfThePossibleMoves); //getting the possible moves and adding them to an array
					console.log(allOfThePossibleMoves);


				}
				if (this.squares[i].piece.player === player && this.squares[i].piece instanceof King) //finding the black king
				{
					var kingSquare = this.squares[i];
				}
			}

	}
	for (var i=0;i<allOfThePossibleMoves.length;i++) //if any of the white possible moves is the black king it is check.
	{
		if (allOfThePossibleMoves[i] === kingSquare)
		{
			return true;
		}
	}
	return false;
}

Board.prototype.removeCheckMoves=function(possibleMovesArray,square){
	var squarePiece=square.piece;
	square.piece=null;

	for (var i=0;i<possibleMovesArray.length;)
	{
		var possibleMovesPiece=possibleMovesArray[i].piece;
		possibleMovesArray[i].piece=squarePiece;

		var check=this.checkForCheck(squarePiece.player);
		possibleMovesArray[i].piece=possibleMovesPiece;

		if (check===true)
		{
			possibleMovesArray.splice(i,1);
		}
		else
		{
			i++;
		}

	}
	square.piece=squarePiece;
}

/**
 * find all the possible moves for the given player, if there are none then he's in check mate.
 *
 * @param player the player to check for check mate
 */
Board.prototype.checkForCheckMate=function(player)
{
	var allOfThePossibleMoves2 = [];
	for (var i=0;i<this.squares.length;i++)  //going through all the squares
	{
		if (this.squares[i].piece !== null)
		{
			if (this.squares[i].piece.player === player)  //finding all the squares with white pieces
			{
				this.squares[i].piece.getPossibleMoves(this, this.squares[i], allOfThePossibleMoves2); //getting the possible moves and adding them to an array
				this.removeCheckMoves(allOfThePossibleMoves2, this.squares[i]);
			}
		}
	}
	if (allOfThePossibleMoves2.length===0)
	{
		return true;



		console.log("check mate");
	}
	return false;
}

Board.prototype.getPosition=function(number)
{
	return this.squares[number];
}