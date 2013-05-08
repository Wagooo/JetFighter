var enemies = [];
var enemyPos = [];
var inc = [];
var enemyCount = -1;
var enemyWidth;
var enemySize;

function createEnemy(){
			enemyCount++;
		
			var enemy = new PIXI.Sprite(PIXI.Texture.fromImage("images/enemy.png"));
			
			enemy.anchor.x = 0.5;
			enemy.anchor.y = 0.5;

			enemyWidth = enemy.width;
			
			enemySize = 0.2 + Math.random()*w/1024;

			enemy.scale.x = enemySize;
			enemy.scale.y = enemySize;

			enemy.position.x = enemy.width/2 + Math.random() * (w - enemy.width);
			enemy.position.y = 0;
			
			enemies[enemyCount] = enemy;
			enemyPos[enemyCount] = 0;
			inc[enemyCount] = 1;
			gameCanvas.addChild(enemies[enemyCount]);
			
		}
		var enemyspeed = 15;
function updateEnemies(){
			for(var i = 0; i<enemies.length; i++){
				if(enemies[i].position.y > (h+50)){
					gameCanvas.removeChild(enemies[i]);
					enemies.splice(i,1);
					inc.splice(i,1);
					enemyPos.splice(i,1);
					enemyCount--;
				}else{
					enemyPos[i] ++;
					if(enemyPos[i]%50==0)
					{
						inc[i]*=-1;
					}
					if(level == 2)
					{
						enemyspeed = 35;
					}
					else
						enemyspeed = 20;
					enemies[i].position.x += 5*inc[i]*scale;
					enemies[i].position.y += enemyspeed*scale;

					if(enemies[i].position.x > w - enemies[i].width/2 || enemies[i].position.x < enemies[i].width/2){
						inc[i] *= -1;
					}
						
        		}

        		if((plane.position.y + (plane.height/2) >= (enemies[i].position.y - enemies[i].height/2)) &&
        			(plane.position.y - (plane.height/2) <= (enemies[i].position.y + enemies[i].height/2)) && 
        			(plane.position.x - (plane.width/2) <= enemies[i].position.x + (enemies[i].width/2) - 40) &&
        			(plane.position.x + (plane.width/2)>= enemies[i].position.x - (enemies[i].width/2) + 40)){
								

								explode(i);
								gameCanvas.removeChild(enemies[i]);
								enemies.splice(i,1);
								inc.splice(i,1);
								enemyPos.splice(i,1);
								enemyCount--;
								gameCanvas.removeChild(planeLives[lives-1]);
								planeLives.splice(lives-1,1);
								lives--;
								gameCanvas.removeChild(plane);
								if(lives>0)
									createPlane();
								else{
									destroyGame();
									stage.addChild(gameOver);
								}
								break;
				}
			}

		}

		function destroyGame(){
			score = 0;
			scoreIncrement = 10;
			level = 1;
			game = false;
			game = false;

			clearInterval(t);

			stage.removeChild(gameCanvas);
			createReplayButton();
			for(var i=0; i<enemies.length;i++){
				gameCanvas.removeChild(enemies[i]);
				enemies.splice(i,1);
				enemyPos.splice(i,1);
				inc.splice(i,1)
				enemyCount--;
			}
			for(var i=0; i<explosions.length;i++){
				gameCanvas.removeChild(explosions[i]);
				explosions.splice(0,explosions.length);
				explosionsTime.splice(0,explosionsTime.length);
			}

			for(var i = 0; i<rightBullets.length; i++){
					gameCanvas.removeChild(rightBullets[i]);
					rightBullets.splice(i,1);
					rightBulletsCount--;
				}
				for(var i = 0; i<leftBullets.length; i++){
					gameCanvas.removeChild(leftBullets[i]);
					leftBullets.splice(i,1);
					leftBulletsCount--;
				}
				if(tokExist)
					gameCanvas.removeChild(tok);



		}