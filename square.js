/**
 * Created by Ben on 03/10/2014.
 */

function Square (element,x,y)
{
	this.pointerToHTMLElement=element;
	this.piece=null;
	this.x=x;
	this.y=y;
}

Square.prototype.setPiece=function(piece)
{
	var image=piece.getFullImageName();

	this.piece=piece;
	var imageElement=document.createElement("img");
	imageElement.className="imageStyles";
	imageElement.src=image;
	this.pointerToHTMLElement.appendChild(imageElement);
}

Square.prototype.removePiece=function()
{
	if (this.pointerToHTMLElement.firstChild !==null)
	{
		this.pointerToHTMLElement.removeChild(this.pointerToHTMLElement.firstChild);

	}
	this.piece = null;
}