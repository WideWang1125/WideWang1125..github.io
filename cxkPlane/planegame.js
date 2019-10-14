
//获取画笔准备工作
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


// 定义游戏过程中的各种状态
const PLAN = 0;
const START = 1;
const STARTRUNNING = 2;
const RUNNING = 3;
const PAUSE = 4;
const GAMEOVER = 5;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
var grade = 0;
var life = 3;
var count = 1;
var state = PLAN;
var oper = true;



// 绘制背景图片
var background = new Image();
background.src = 'images/background.png';
// 定义一个背景图片的相关属性
var BG = {
	img : background,
	width : WIDTH,
	height : HEIGHT
}
var start = {
	img : start,
}
// 构造函数方法画出背景图片
function Bg(obj){
	this.width = obj.width;
	this.height = obj.height;
	this.img = obj.img;
	this.x = 0;
	this.y = 0;
	this.draw = function () {
		context.drawImage(this.img,this.x,this.y,this.width,this.height);
		context.drawImage(this.img,this.x,this.y-this.height,this.width,this.height);
		this.y++;
		if(this.y==this.height){
			this.y=0;
		}
	}	
}

var sky = new Bg(BG);//实例化背景图片的对象

// 0.2游戏的logo的绘制
var logo = new Image();
logo.src = 'images/start.png';

function Logo(){
	context.drawImage(logo,40,0);
}
canvas.onclick=function(){
	if(state==GAMEOVER){
		state = PLAN;
		life=3;
		grade=0;
		enemies=[];
		bullets=[];
	}else if(state == PLAN){
		state = STARTRUNNING;
	}
	
	
}
// 1.1我方飞机出场阶段   游戏过度阶段
var loading1 = new Image();
loading1.src="images/game_loading1.png";
var loading2 = new Image();
loading2.src="images/game_loading2.png";
var loading3 = new Image();
loading3.src="images/game_loading3.png";
var loading4 = new Image();
loading4.src="images/game_loading4.png";

var LOADING = {
	img1:loading1,
	img2:loading2,
	img3:loading3,
	img4:loading4,
	height:50,
}
function Loading(LOADING){
	this.img = LOADING;
	this.n=1;
	this.index = 1;
	this.height = LOADING.height;
	this.draw = function(){
		this.n++;
		if(this.n%5==0){
			context.drawImage(this.img[`img${this.index}`],0,HEIGHT-this.height);
			this.index++;
			if(this.index==5){
				state = RUNNING;
				HERO.draw();
				this.index=1;
			}
		}
	}
}
var gameLoading = new Loading(LOADING);

// 1.2飞机待机状态

var hero1 = new Image();
hero1.src="images/timg.png";
var hero2 = new Image();
hero2.src="images/timg2.png";
// 飞机撞击状态
var blowup1 = new Image(); 
blowup1.src="images/hero_blowup_n1.png";
var blowup2 = new Image(); 
blowup2.src="images/hero_blowup_n2.png";
var blowup3 = new Image(); 
blowup3.src="images/hero_blowup_n3.png";
var blowup4 = new Image(); 
blowup4.src="images/hero_blowup_n4.png";
var heros = [hero1,hero2,blowup1,blowup2,blowup3,blowup4];
var hero = {
	imgs:heros,
	height:130,
	width:100,
}
function Hero(hero){
	this.imgs = hero.imgs;
	this.width = hero.width;
	this.height = hero.height;
	this.x = WIDTH/2-50;
	this.y = HEIGHT-130;
	this.n = 1;
	this.index=0;
	this.draw = function(){
		context.drawImage(this.imgs[this.index],this.x,this.y,this.width,this.height);
	}
	this.step = function(){
		if(this.down){
			this.index++;
			 // 播放飞机碰撞的动画直到播放完成
			 if(this.index == this.imgs.length){
			 	life--;
			 	this.down=false;
			 	if(life==0){
			 		this.index=this.imgs.length-1;
			 		state=GAMEOVER;
			 	}else{
			 		this.index=0;
			 		hero = new Hero(hero);
			 	}
			 }
		}else{
			 	// 没有发生碰撞切换索引
			 	// 改变this.index的值
			 	if(this.index==0){
			 		this.index=1;
			 	}else{
			 		this.index=0;
			 	}

			 }
	}
	// 碰撞方法
	this.down = false;
	this.bang = function(){
		this.down = true;
	}
	//记录飞机碰撞后是否完成碰撞动画
	this.candel = false;
	// 发射子弹方法
	// 定义一个子弹发射的速度
	this.time = 0;
	this.shoot = function(){
		this.time++;
		if(this.time%3==0){
			// 存放在子弹的弹匣里，新增一个子弹对象
			bullets.push(new Bullet(BULLET));
		}
	}
}
var HERO = new Hero(hero);


canvas.onmousemove=function(e){
	if(state==RUNNING){
		HERO.x = e.offsetX-HERO.width/2;
		HERO.y = e.offsetY-HERO.height/2;
	}
	
}
// 3.2子弹的绘制
var bullet = new Image();
bullet.src="images/bullet2.png";
// 3.2.2初始化子弹的基本信息
var BULLET = {
	imgs:bullet,
	width:20,
	height:21
}
// 3.2.3子弹的构造函数
function Bullet(config){
	this.imgs = config.imgs;
	this.width = config.width;
	this.height = config.height;
	this.x = HERO.x+HERO.width/2-this.width/2;
	this.y = HERO.y-this.height;
	// 绘制
	this.draw = function(){
		context.drawImage(this.imgs,this.x,this.y,this.width,this.height);
	}
	// 子弹的运动
	this.step = function(){
		this.y-=10;
	}
	// 判断是否发生碰撞
	this.candel = false;
	// 碰撞的方法修改canval的值
	this.bang = function(){
		this.candel=true;
	}
	// this.candel = true;
}
// 创建数组用来存储子弹
var bullets = [];
//3.2.4 绘制数组中的所有子弹
function bulletsPaint(){
	for(var i=0;i<bullets.length;i++){
		bullets[i].draw();
	}
}
// 3.2.5数组中的子弹运动
function bulletsStep(){
	for(var i=0;i<bullets.length;i++){
		bullets[i].step();
	}
}
// 3.26删除超出画布的子弹以及发生碰撞的子弹  （从数组中删除）
function bulletsDel(){
	for(var i=0;i<bullets.length;i++){
		if(bullets[i].y < -bullets[i].height||bullets[i].candel){
			bullets.splice(i,1);
		}

	}
}
// 3.31敌机的绘制
var enemys = [];//小飞机
enemys[0] = new Image();
enemys[0].src = "images/enemy1.png";
enemys[1] = new Image();
enemys[1].src = "images/enemy1_down1.png";
enemys[2] = new Image();
enemys[2].src = "images/enemy1_down2.png";
enemys[3] = new Image();
enemys[3].src = "images/enemy1_down3.png";
enemys[4] = new Image();
enemys[4].src = "images/enemy1_down4.png";

// 3.32小飞机的相关属性
var enemy = {
	imgs:enemys,
	length:enemys.length,
	width:57,
	height:51,
	type:1,
	life:1,
	score:1,
	frame:1
}
// 3.321中飞机
var menemys = [];
menemys[0] = new Image();
menemys[0].src = "images/enemy2.png";
menemys[1] = new Image();
menemys[1].src = "images/enemy2_down1.png";
menemys[2] = new Image();
menemys[2].src = "images/enemy2_down2.png";
menemys[3] = new Image();
menemys[3].src = "images/enemy2_down4.png";
menemys[4] = new Image();
menemys[4].src = "images/enemy2_down4.png";
// 3.322中飞机的相关信息
var menemy ={
	imgs:menemys,
	length:menemys.length,
	width:69,
	height:95,
	type:2,
	life:3,
	score:3,
	frame:1
}
// 3.331大飞机的绘制
var bigenemys = [];
bigenemys[0] = new Image();
bigenemys[0].src = "images/enemy3_n1.png";
bigenemys[1] = new Image();
bigenemys[1].src = "images/enemy3_n2.png";
bigenemys[2] = new Image();
bigenemys[2].src = "images/enemy3_hit.png";
bigenemys[3] = new Image();
bigenemys[3].src = "images/enemy3_down1.png";
bigenemys[4] = new Image();
bigenemys[4].src = "images/enemy3_down2.png";
bigenemys[5] = new Image();
bigenemys[5].src = "images/enemy3_down3.png";
bigenemys[6] = new Image();
bigenemys[6].src = "images/enemy3_down4.png";
bigenemys[7] = new Image();
bigenemys[7].src = "images/enemy3_down5.png";
bigenemys[8] = new Image();
bigenemys[8].src = "images/enemy3_down6.png";
// 3.332打飞机的相关信息
var bigenemy = {
	imgs:bigenemys,
	length:bigenemys.length,
	width:165,
	height:261,
	type:3,
	life:10,
	score:5,
	frame:2
}
// 3.33地方飞机的构造函数
function Enemy(config){
	this.imgs = config.imgs;
	this.length = config.length;
	this.width = config.width;
	this.height = config.height;
	this.type = config.type;
	this.life = config.life;
	this.score = config.score;
	this.frame = config.frame;
	// 坐标  x坐标范围 不能超过画布的宽度
	this.x = Math.random()*(WIDTH-this.width);
	// 初始化的敌人飞机是在画布的上方
	this.y = -this.height;
	this.index = 0;
	// 碰撞标识
	this.down = false;
	// 发生碰撞后动画有没有执行完毕
	this.candel = false;
	// 敌人的飞机绘制
	this.draw = function(){
		context.drawImage(this.imgs[this.index],this.x,this.y);
	}
	// 敌人的飞机运动
	this.step = function(){	
		if(this.down){
			this.index++;
			if(this.index==this.length){
				this.candel=true;
				this.index=this.length-1;
			}
		}else{
			this.y++;	
			this.index ++ ; 
			this.index = this.index % this.frame; 					
		}
	}
	// 撞击的方法
	this.bang = function(){
		this.life--;
		if(this.life==0){
			this.down = true;
			grade += this.score;
		}

	}
	this.checkHit = function(obj){
	return	obj.x+obj.width>this.x &&
		obj.x<this.x+this.width &&
		obj.y+obj.height>this.y &&
		obj.y<this.y+this.height
	}
}
// 3.34创建一个数组用来存储敌方飞机
var enemies = [];
// 3.35想数组中添加飞机
function pushEnemies(){
	// 随机添加三种飞机
	var numRand = Math.floor(Math.random()*100);
	if(numRand<10){
		// 随机添加一个小飞机
		enemies.push(new Enemy(enemy));
	}else if(numRand >98){
		enemies.push(new Enemy(menemy));
	}else if(numRand==50){
		enemies.push(new Enemy(bigenemy));
	}
}
// 3.36绘制敌方飞机数组中的飞机
function drawEnemies(){
	for(var i =0 ; i<enemies.length;i++){
	enemies[i].draw();		
	}
}
// 3.37敌方飞机的运动
function stepEnemies(){
	for(var i =0 ; i<enemies.length;i++){
		enemies[i].step();
	}
}
// 3.38删除敌方飞机
function delEnemies(){
	for(var i=0;i<enemies.length;i++){
		if(enemies[i].y==HEIGHT||enemies[i].candel){
			enemies.splice(i,1);
		}
	}
}
// 3.39检查敌方飞机是否发生碰撞
function bangEnemies(){
	for(var i=0;i<enemies.length;i++){
		// 判断子弹是否与敌机发生碰撞
		for(var j=0;j<bullets.length;j++){
			if(enemies[i].checkHit(bullets[j])){
				enemies[i].bang();
				bullets[j].bang();
				
			}
		}
		// 判断我方飞机是否与敌机发生碰撞
		if(enemies[i].checkHit(HERO)){
			enemies[i].bang();
			HERO.bang();
		}

	}
}
// 3.4绘制成绩 和 我方生命值
function gradeLife(){
	context.font="30px SieHer";
	var gr = "得分数："+grade;
	context.fillText(gr,0,50);
	var li ="生命值："+life;
	context.fillText(li,300,50);
}
// 4.1游戏暂停
canvas.onmouseout=function(){
	if(state==RUNNING){
		state=PAUSE;
	}
	
}
canvas.onmouseover=function(){
	if(state==PAUSE){
		state=RUNNING;
	}
	
}
// 5.1游戏结束画面
var over = new Image();
over.src="images/over.png";
var pause = new Image();
pause.src="images/game_pause_nor.png";
function gameover(){
	for(var i=0;i<enemies.length;i++){
		enemies[i].draw();
	}
	for(var i=0;i<bullets.length;i++){
		bulletsPaint();
	}
	HERO.draw();
	gradeLife();
	if(state==GAMEOVER){
		context.drawImage(over,30,0,);
	}else if(state==PAUSE){
		context.drawImage(pause,WIDTH/2,HEIGHT/2,);
	}
	
}
var timer = setInterval(function () {
	sky.draw();
	switch(state){
		case PLAN:Logo();
			break;
		case STARTRUNNING:gameLoading.draw();
			break;
		case RUNNING:
				HERO.draw();
				HERO.step();
				HERO.shoot();
				bulletsPaint();//子弹的绘制
				bulletsStep();//子弹的运动
				bulletsDel();//子弹的删除


				pushEnemies();//初始化敌方飞机数据
				drawEnemies();//绘制敌方飞机
				stepEnemies();//敌方飞机的运动
				bangEnemies();//检查敌方飞机是否发生碰撞
				bulletsDel();//删除已碰撞的子弹
				delEnemies();//删除已击毁的敌机
				gradeLife();
				break;
		case PAUSE:gameover();
				break;
		case GAMEOVER:gameover();
				break;
	}
},31);

