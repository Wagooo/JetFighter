$(window).resize(resize)
window.onorientationchange = resize;

document.addEventListener('DOMContentLoaded', init, false);

var w = 1024;
var h = 768;
var scoreText;
var level =1;
var leveltext;
var game = true;
var bg1;
var bg2;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

function init() {

		renderer = PIXI.autoDetectRenderer(w, h);
		
		stage = new PIXI.Stage(0x11290b,true);
		bg1 = new PIXI.Sprite(PIXI.Texture.fromImage("images/bg1.png"));
		bg2 = new PIXI.Sprite(PIXI.Texture.fromImage("images/bg2.png"));
		
		bg2.position.y = -675;
		
				

		gameCanvas.addChild(bg1);
		gameCanvas.addChild(bg2);
		
		document.body.appendChild(renderer.view);
		document.addEventListener('keydown',checkKeyDown,false);
		
		resize();
		createPlane();
		buttons();	
		pause();
		if(isAndroid){
			createFireButton();
		}
		scoreText = new PIXI.Text("Score: 0", "bold 40px Calibri", "#ffffff");
		leveltext = new PIXI.Text("Level : ", "bold 30px Calibri", "#ffffff");
		leveltext.position.x = 270;
		leveltext.position.y = 5;
		
		stage.addChild(gameCanvas)

		requestAnimFrame(update);

	}

function resize()
	{
		w = $(window).width();
		h = $(window).height();

		if(w/h > 1.8){
			w =w/2;
			document.body.style.marginLeft=w/2 + "px";
		}else{
			document.body.style.marginLeft="0px";
		}
	
		renderer.resize(w, h);
	}
	var time = 0;
	var x2time = 1;
	var levelchange = false ;
	var enemytime = 40;
	function update()
	{
		if(score >= 1000 && !levelchange)
		{
			level++
			levelchange = true;
	
		}
		if(level == 2)
		{
			enemytime = 10;
		}
		else
		{
			enemytime = 40;
		}
		if(pclick)
			{
				gameCanvas.removeChild(pbut);
				pause();
				pclick = false;
			}
			if(click)
			{
				gameCanvas.removeChild(but);
				buttons();
				click = false;
			}
		time ++;
		if(game){
				bg1.position.y+=2;
				bg2.position.y+=2;
				if(bg1.position.y>h)
				{
					bg1.position.y=-670;
				}
				if(bg2.position.y>h)
				{
					bg2.position.y=-670;
				}
				if(fired){
					updateBullets();
				}
				if(time%600 == 0){
					createToken();
				}
				if(tokExist){
					updateTokens();
				}
				updateEnemies();
				if(time%enemytime == 0){
					createEnemy();
				}
				if(hit)
				{
					x2time++;

				}
				if(x2time % 300 == 0)
				{
					hit = false;
					scoreIncrement = 10;
					x2time++;
				}
				for(var i=0; i < explosions.length;i++){
					if(explosionsTime[i] > 10){
						gameCanvas.removeChild(explosions[i]);
						explosions.splice(i,1);
						explosionsTime.splice(i,1);
					}else{
						explosionsTime[i]++;
					}
				}	
				gameCanvas.addChild(scoreText);
				scoreText.setText("Score: " + score);
				gameCanvas.addChild(leveltext);
				leveltext.setText("Level: " + level);
				
		}
		renderer.render(stage);
		requestAnimFrame(update);
	}