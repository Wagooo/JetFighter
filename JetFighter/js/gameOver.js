var gameOver = new PIXI.DisplayObjectContainer;

function createReplayButton(){

			var replayButton = new PIXI.Sprite(PIXI.Texture.fromImage("images/go2.png"));

			replayButton.anchor.x = 0.5;
			replayButton.anchor.y = 0.5;

			replayButton.position.x = w/2;
			replayButton.position.y = h/2;

			
			
			replayButton.setInteractive(true);
			replayButton.buttonMode = true;

			replayButton.mousedown = replayButton.touchstart = function(data){
				window.open("index.html","_self");

			}

			replayButton.mouseover = function(data){

				replayButton.setTexture(PIXI.Texture.fromImage("images/go1.png"));

			}

			replayButton.mouseout = function(data){

				replayButton.setTexture(PIXI.Texture.fromImage("images/go2.png"));
			}

			gameOver.addChild(replayButton);

		}