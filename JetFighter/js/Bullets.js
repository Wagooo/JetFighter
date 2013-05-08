var rightBullets = [];
var rightBulletsCount = -1;

var leftBullets = [];
var leftBulletsCount = -1;
var scoreIncrement = 10;

function repeatBullets(){
				rightBulletsCount++;
				rightBullets[rightBulletsCount] = new PIXI.Sprite(PIXI.Texture.fromImage("images/bullet.png"));

				rightBullets[rightBulletsCount].anchor.x = 0.5;
				rightBullets[rightBulletsCount].anchor.y = 0.5;

				rightBullets[rightBulletsCount].position.x = plane.position.x + 200*scale;
				rightBullets[rightBulletsCount].position.y = plane.position.y - ((plane.height)/2);

				gameCanvas.addChild(rightBullets[rightBulletsCount]);

				leftBulletsCount++;
				leftBullets[leftBulletsCount] = new PIXI.Sprite(PIXI.Texture.fromImage("images/bullet.png"));

				leftBullets[leftBulletsCount].anchor.x = 0.5;
				leftBullets[leftBulletsCount].anchor.y = 0.5;

				leftBullets[leftBulletsCount].position.x = plane.position.x - 140*scale;
				leftBullets[leftBulletsCount].position.y = plane.position.y - ((plane.height)/2);

				gameCanvas.addChild(leftBullets[leftBulletsCount]);
}

function updateBullets(){

			for(var i = 0; i<rightBullets.length; i++){
				if(rightBullets[i].position.y < 0){
					gameCanvas.removeChild(rightBullets[i]);
					rightBullets.splice(i,1);
					rightBulletsCount--;
				}else{
					rightBullets[i].position.y -= 75*scale;

					for(var j = 0; j<enemies.length;j++){
						if(rightBulletsCount>-1){}
							if((rightBullets[i].position.y <= (enemies[j].position.y + enemies[j].height/2)) && (rightBullets[i].position.x <= enemies[j].position.x + (enemies[j].width/2)) && (rightBullets[i].position.x >= enemies[j].position.x -(enemies[j].width/2))){
								
								explode(j);
								gameCanvas.removeChild(enemies[j]);
								enemies.splice(j,1);
								inc.splice(j,1);
								enemyPos.splice(j,1);
								enemyCount--;
								gameCanvas.removeChild(rightBullets[i]);
								rightBullets.splice(i,1);
								rightBulletsCount--;
								score += scoreIncrement;
								break;
							}
					}
					}
					
        		}

        		for(var i = 0; i<leftBullets.length; i++){
				if(leftBullets[i].position.y < 0){
					gameCanvas.removeChild(leftBullets[i]);
					leftBullets.splice(i,1);
					leftBulletsCount--;
				}else{
	        		leftBullets[i].position.y -= 75*scale;

					for(var j = 0; j<enemies.length;j++){
						if(leftBulletsCount>-1){
							if((leftBullets[i].position.y <= (enemies[j].position.y + enemies[j].height/2)) && (leftBullets[i].position.x <= enemies[j].position.x + (enemies[j].width/2)) && (leftBullets[i].position.x >= enemies[j].position.x - (enemies[j].width/2))){
								explode(j);
								gameCanvas.removeChild(enemies[j]);
								enemies.splice(j,1);
								inc.splice(j,1);
								enemyPos.splice(j,1);
								enemyCount--;
								score += scoreIncrement;
								gameCanvas.removeChild(leftBullets[i]);
								leftBullets.splice(i,1);
								leftBulletsCount--;
								break;
							}
						}
					}
					}
					
        		}
		}
		