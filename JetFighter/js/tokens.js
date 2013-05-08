var tok;
var tokPos;
var tokInc;
var tokType;
var tokExist;
var hit;
function createToken(){
			tokExist = true;
			var rand = Math.ceil((Math.random() * 2));
			if(rand == 1)
			{
				tok = new PIXI.Sprite(PIXI.Texture.fromImage("images/x2.png"));
			}
			if(rand == 2)
			{
				tok = new PIXI.Sprite(PIXI.Texture.fromImage("images/up.png"));
			}
			
			tok.anchor.x = 0.5;
			tok.anchor.y = 0.5;

			tok.position.x = Math.random() * w;
			tok.position.y = 0;
			
			tokType = rand;
			tokPos = 0;
			tokInc = -1;
			hit = false;
			gameCanvas.addChild(tok);
			
		}

function updateTokens()
	{
		if(tok.position.y > (h+50)){
			gameCanvas.removeChild(tok);
			tokExist = false;
					
		}else{
				tokPos++;
				if(tokPos%60==0)
				{
					tokInc*=-1;
				}
				tok.position.x += 5*tokInc*scale;
				tok.position.y += 10*scale;
				if((plane.position.y + (plane.height*scale/2) >= (tok.position.y - tok.height/2)) &&
				   (plane.position.y - (plane.height*scale/2) <= (tok.position.y + tok.height/2)) &&
				   (plane.position.x - (plane.width*scale/2) + 50<= tok.position.x + (tok.width/2)) &&
				   (plane.position.x + (plane.width*scale/2) - 50>= tok.position.x - (tok.width/2)))
				{
					if(tokType == 1)
					{
						scoreIncrement *= 2;
						hit = true;
						
					}
					else
					{
						if(lives<3)
						{
							addLife(lives);
							lives++;
						}
					}
					gameCanvas.removeChild(tok);
					tokExist = false;
				}	
        	}
	}