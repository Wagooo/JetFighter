var assetsToLoader = ["SpriteSheet.json"];
	
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded
loader.load();

var explosions = [];
var explosionsTime = [];
var explosionTextures = [];

function onAssetsLoaded()
	{
		
		for (var i=0; i < 26; i++) 
		{
		 	var texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i+1) + ".png");
		 	explosionTextures.push(texture);
		}
	}


//--------------------------- Explosion Function ------------------------//
function explode(i){

 		//Load explosion textures
		var explosion = new PIXI.MovieClip(explosionTextures);  

		//Set position of the explosion to the position of the exploded enemy
		explosion.position.x = enemies[i].position.x;           
		explosion.position.y = enemies[i].position.y;
				
		//Set the anchor of the explosion
		explosion.anchor.x = 0.5;
		explosion.anchor.y = 0.5;
		
		//Set the rotation to a random value				
		explosion.rotation = Math.random() * Math.PI;

		//Set the scale of the explosion to be relative to the size of the exploded enemy
		explosion.scale.x = explosion.scale.y = (enemies[i].width/enemyWidth);
		
		//Run the MovieClip of the explosion							
		explosion.gotoAndPlay(5);
			
		//Push the explosion to the explosions array, along with its time set to 0			
		explosions.push(explosion);
		explosionsTime.push(0);

		//Add the explosion to the game canvas
		gameCanvas.addChild(explosions[explosions.length-1]);
		
	}