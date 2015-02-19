var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

function preload() {

    game.load.image('wall','assets/block.png');
    game.load.image('dude','assets/phaser-dude.png');
	game.load.spritesheet('policedude','assets/cops.png');
	game.load.image('bag','assets/money.png');
	game.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
	game.load.audio('pick','assets/pick.mp3')
	game.load.audio('scanner','assets/scanner.mp3');
	game.load.audio('siren','assets/siren.mp3')
}	

var wall;
var dude;
var cop;
var bag;
var score=0;
var text;
var winText;
var loseText;
var actionTime=0;
var cop2;
var sound;
var scanner;
var siren;

function create() {

	scanner=game.add.audio('scanner');
	scanner.play();
	sound=game.add.audio('pick');
	siren=game.add.audio('siren');
	text = game.add.bitmapText(50, 50, 'desyrel','Collect the Money, Avoid the Cops!',32);
	
	game.world.setBounds(0,0,1200,600);
	//physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

	wall=game.add.group();
	wall.enableBody=true;
	
	bag=game.add.group();
	bag.enableBody=true;
	
    dude = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
	
	cop=game.add.sprite(1100,200,'policedude',0);
	cop2=game.add.sprite(100,500,'policedude',0);
	
	
	for (var i = 0; i < 4; i++)
    {
        //  They are evenly spaced out on the X coordinate, with a random Y coordinate
        var wallItem=wall.create(game.rnd.integerInRange(90,1110), game.rnd.integerInRange(90,510), 'wall', null);
		if(game.physics.arcade.overlap(wallItem,dude,null,null,this))
			{
				wallItem.exists=false;
				i--;
			}
		wallItem.body.immovable =true;
		
		
    }
	
	for(var i=0;i<50;i++)
	{
		var bagItem=bag.create(game.rnd.integerInRange(90,1110), game.rnd.integerInRange(90,510), 'bag', null)
		if(game.physics.arcade.overlap(bagItem,wall,null,null,this))
			{
				bagItem.exists=false;
				i--;
			}
	}
	
	game.physics.arcade.enable(bag);
	game.physics.arcade.enable(cop);
	game.physics.arcade.enable(cop2);
    game.physics.arcade.enable(wall);
	game.physics.enable(dude, Phaser.Physics.ARCADE);
	
	
	dude.body.collideWorldBounds = true;
	dude.body.bounce.set(1);
	cop.body.collideWorldBounds = true;
	cop.body.bounce.set(1);
	cop2.body.collideWorldBounds=true;
	cop2.body.bounce.set(1);
	
    cursors = game.input.keyboard.createCursorKeys();
	
	
	game.physics.arcade.moveToObject(cop2,dude, 50 );
	
	
}

function update() {

    
	
	if(score==50)
	{
		game.paused=true;
		winText = game.add.bitmapText(500, 500, 'desyrel','You Win!',52);
	}
	
	dude.body.velocity.x=0;
	dude.body.velocity.y=0;
	dude.body.bounce.set(1);
	
	cop.body.velocity.x=0;
	cop.body.velocity.y=0;
	
	
	
	
	
	
    if (cursors.up.isDown)
    {
		
        dude.body.velocity.y=-150;
		cop.body.velocity.y=-500;
		cop2.body.velocity.y=-250;
    }
    else if (cursors.down.isDown)
    {
        dude.body.velocity.y=150;
		cop.body.velocity.y=500;
		cop2.body.velocity.y=250;
    }

    else if (cursors.left.isDown)
    {
		
        dude.body.velocity.x = -150;
		cop.body.velocity.x=-500;
		cop2.body.velocity.x=-250;
    }
    else if (cursors.right.isDown)
    {
			
		dude.body.velocity.x=150;
		cop.body.velocity.x=500;
		cop2.body.velocity.x=250;
		
    }
	
	if(game.physics.arcade.overlap(dude,wall,null,null,this))
	{
		game.physics.arcade.collide(wall,dude);
	}
	
	if(game.physics.arcade.overlap(cop,wall,null,null,this))
	{
		game.physics.arcade.collide(wall,cop);
	}
	
	if(game.physics.arcade.overlap(cop2,wall,null,null,this))
	{
		game.physics.arcade.collide(wall,cop2);
	}
	
	if(game.physics.arcade.overlap(cop,dude,null,null,this)&&siren.isPlaying==false)
	{
		//lose!
		scanner.stop();
		siren.play();
		cop.body.velocity=0;
		cop2.body.velocity=0;
		dude.body.velocity=0;
		
		loseText = game.add.bitmapText(500, 500, 'desyrel','You Lose, Refresh=Replay!',52);
		
	}
	
	if(game.physics.arcade.overlap(cop2,dude,null,null,this)&&siren.isPlaying==false)
	{
		//lose!
		scanner.stop();
		siren.play();
		cop.body.velocity=0;
		cop2.body.velocity=0;
		dude.body.velocity=0;
		loseText = game.add.bitmapText(500, 500, 'desyrel','You Lose, Refresh=Replay!',52);
		
	}
	
	if(game.physics.arcade.overlap(dude,bag,null,null,this))
		{
			game.physics.arcade.collide(dude, bag, collisionHandler, null, this);
		}
		
	
	
	
 
}



function collisionHandler (player, mon) {


    sound.play();
    mon.kill();
	mon.exists=false;
    score++;

}
	
	





