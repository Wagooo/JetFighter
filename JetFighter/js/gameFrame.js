		gameCanvas = new PIXI.DisplayObjectContainer;
	
		var fired = false;
		var t;
		var plane;
		var planeLives = [];

		var score = 0;	
		var lives = 3;

		var but;
		var mute = 0;
		var click = false;
		var pooz = 0;
		var pclick = false;
		var pbut;
		var stop = 0;
		function checkKeyDown(e)
  		{
     		 var keyUsed = e.keyCode || e.which ;
    	  	 if(keyUsed === 27){
         		e.preventDefault();
         		pooz++;
         		gameCanvas.removeChild(pbut);
				pause();
				pclick = false;
          	}
      }


		function addLife(i)
		{
			planeLives.push(new PIXI.Sprite(PIXI.Texture.fromImage("images/Lives.png")));
			planeLives[i].anchor.x = 0.5;
			planeLives[i].anchor.y = 0.5;

			planeLives[i].position.x = w - 10 - (i+1)*(planeLives[i].width+10);
			planeLives[i].position.y = planeLives[i].height/2 + 10;

			gameCanvas.addChild(planeLives[i]);
		}

		function buttons(){
			if(mute%2==0)
				{
					but = new PIXI.Sprite(PIXI.Texture.fromImage("images/mute1.png"));
					document.getElementById('music').muted = false;
				}
			else
				{
					but = new PIXI.Sprite(PIXI.Texture.fromImage("images/mute2.png"));
					document.getElementById('music').muted = true;
				}	
			but.position.x = 580;
			but.position.y = 4;
			but.scale.x = 0.5;
			but.scale.y = 0.5;
			but.setInteractive(true);
			but.buttonMode = true;
			but.mousedown = function(data){
				click = true;
				mute++;

			}
			gameCanvas.addChild(but);
		}

		function pause(){
			if(pooz%2==0)
				{
					pbut = new PIXI.Sprite(PIXI.Texture.fromImage("images/pause2.png"));
					game = true;
				}
			else
				{
					pbut = new PIXI.Sprite(PIXI.Texture.fromImage("images/pause1.png"));
					game = false;
				}	
			pbut.position.x = 580;
			pbut.position.y = 45;
			pbut.scale.x = 0.5;
			pbut.scale.y = 0.5;
			pbut.setInteractive(true);
			pbut.buttonMode = true;
			pbut.mousedown = function(data){
				pclick = true;
				pooz++;

			}
			gameCanvas.addChild(pbut);
		}


		function createPlane(){

			plane = new PIXI.Sprite(PIXI.Texture.fromImage("images/wwiifighter.png"));

			for(var i = 0; i<lives; i++){
				addLife(i);
			}

			plane.anchor.x = 0.5;
			plane.anchor.y = 0.5;
			
			scale = 100/w;

			plane.scale.x = scale;
			plane.scale.y = scale;

			plane.position.x = w/2;
			plane.position.y = h - (plane.height/2);

			
			
			plane.setInteractive(true);
			plane.buttonMode = true;

			plane.mouseover = plane.touchstart = function(data){
				this.move = true;
			}
			
			plane.mousemove = plane.touchmove = function(data){
				if(this.move == true && game){
					this.data = data;
					var newPosition = this.data.getLocalPosition(this.parent);
					if(plane.position.x < (newPosition.x-2)){ 
						 plane.setTexture(PIXI.Texture.fromImage("images/wwiifighterright.png"));
					}
					else if(plane.position.x > (newPosition.x+2)){
						plane.setTexture(PIXI.Texture.fromImage("images/wwiifighterleft.png"));
					}
					else{
							plane.setTexture(PIXI.Texture.fromImage("images/wwiifighter.png"));
					}
					plane.position.x = newPosition.x;
					plane.position.y = newPosition.y;
				}
			}

			plane.mousedown = function(data){
				if(game){
					fired = true;
					repeatBullets();
					t = setInterval(repeatBullets, 100);
				}
			}

			plane.mouseup = function(data){
				clearInterval(t);
			}


			gameCanvas.addChild(plane);

		}

		
		function createFireButton(){

			fireButton = new PIXI.Sprite(PIXI.Texture.fromImage("images/fireButton.png"));

			fireButton.anchor.x = 0.5;
			fireButton.anchor.y = 0.5;
			
			scale = 300/w;

			fireButton.scale.x = scale;
			fireButton.scale.y = scale;

			fireButton.position.x = w - 100;
			fireButton.position.y = h - 100;

			
			
			fireButton.setInteractive(true);
			fireButton.buttonMode = true;

			fireButton.touchstart = function(data){
				fireButton.setTexture(PIXI.Texture.fromImage("images/fireButtonHover.png"));
				fired = true;
				repeatBullets();
				t = setInterval(repeatBullets, 100);
			}

			fireButton.touchend = function(data){
				fireButton.setTexture(PIXI.Texture.fromImage("images/fireButton.png"));
				clearInterval(t);
			}


			gameCanvas.addChild(fireButton);

		}

