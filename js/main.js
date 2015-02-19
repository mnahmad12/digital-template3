var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

function preload() {

    game.load.image('wall','assets/block.png');
    game.load.image('car','assets/car.png')
}	

var wall;
var car;

function create() {

	
	//bounds of the world
    game.world.setBounds(0, 0, 1920, 1920);
	//physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

	wall = game.add.sprite(95, 95, 'wall');
    car = game.add.sprite(game.world.centerX, game.world.centerY, 'car');

	
	//  And add 10 sprites to it
    for (var i = 0; i < 10; i++)
    {
        //  Create a new sprite at a random world location
        wall.create(game.world.randomX, game.world.randomY,'wall');
		
    }
	
    game.physics.arcade.enable(wall);
	game.physics.arcade.enable(car);
	
    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);


	
}

function update() {

    //player.body.setZeroVelocity();
	car.body.velocity.x=0;
	car.body.velocity.y=0;
	
    if (cursors.up.isDown)
    {
        car.body.velocity.y=-200;
    }
    else if (cursors.down.isDown)
    {
        car.body.velocity.y=200;
    }

    if (cursors.left.isDown)
    {
        car.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        car.body.velocity.x=200;
    }
	

	if(game.physics.arcade.overlap(car,wall,null,null,this))
			{
				game.physics.arcade.collide(car,wall);
				car.body.bounce.set(1);
			}
			
	
 
}
	



