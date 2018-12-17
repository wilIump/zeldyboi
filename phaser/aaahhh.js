var game;
var player;

window.onload = function() {
    game = new Phaser.Game(400, 300, Phaser.CANVAS, 'phaser-example ', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
}

function preload() {
    game.load.crossOrigin = true;
    game.load.tilemap('map', 'zelda_stuff/zelda._Tile Layer 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map2', 'zelda_stuff/zelda._Tile Layer 2.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'zelda_sprite_sheet_overworld.png');
    game.load.image('spawns', 'zelda_stuff/spawn_locations.png');
    game.load.image('sword', 'zelda_stuff/link_sword_sprite_sheet.png');
    game.load.spritesheet('player', 'zelda_stuff/zeda_sprite_sheet_link.png', 16, 16, 40, 0, 14);
    game.load.spritesheet('enemy', 'zelda_stuff/sprite_sheet_enemy.png', 16, 16, 16, 0, 14);

}
var map;
var map2;
var layer;
var player;
var enemy1, enemy2, enemy3, enemy4;
var sword;
var linkSpawn;
//var orange_boi_spawn = [];
var orange_boi_spawn1; var orange_boi_spawn2; var orange_boi_spawn3; var orange_boi_spawn4;
var direction;
var up, down, left, right;
var up_attack, down_attack, left_attack, right_attack;
var key_Z;

function create() {
    game.world.setBounds(0, 0, 1600, 1600);

    map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('tiles', null, 16, 16, 0, 1);
    map2 = game.add.tilemap('map2', 16, 16);
    map2.addTilesetImage('spawns', null, 16, 16, 1, 2);
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(0, 7);
    map.setCollisionBetween(9, 125);
    //map.setTileIndexCallback([0,7], sword_hide, sword);
    //map.setTileIndexCallback([9,125], sword_hide, sword);
    linkSpawn = map2.searchTileIndex(10); orange_boi_spawn1 = map2.searchTileIndex(1); orange_boi_spawn2 = map2.searchTileIndex(1, 1); orange_boi_spawn3 = map2.searchTileIndex(1, 2); orange_boi_spawn4 = map2.searchTileIndex(1, 3);
    player = game.add.sprite(linkSpawn.x * 16, linkSpawn.y * 16, 'player', 1);
    //spawn_enemy();
    enemy1 = game.add.sprite(orange_boi_spawn1.x * 16, orange_boi_spawn1.y * 16, 'enemy', 0);
    enemy2 = game.add.sprite(orange_boi_spawn2.x * 16, orange_boi_spawn2.y * 16, 'enemy', 0);
    enemy3 = game.add.sprite(orange_boi_spawn3.x * 16, orange_boi_spawn3.y * 16, 'enemy', 0);
    enemy4 = game.add.sprite(orange_boi_spawn4.x * 16, orange_boi_spawn4.y * 16, 'enemy', 0);
    sword = game.add.sprite(linkSpawn.x * 15, linkSpawn.y * 16, 'sword');
    sword.visible = false;
    // doki doki oyo class
    up = player.animations.add('up', [2, 16], 10, true);
    down = player.animations.add('down', [0, 14], 10, true);
    left = player.animations.add('left', [1, 15], 10, true);
    right = player.animations.add('right', [3, 17], 10, true);
    up_attack = player.animations.add('up_attack', [30,2], 7, false);
    down_attack = player.animations.add('down_attack', [28,0], 7, false);
    left_attack = player.animations.add('left_attack', [29,1], 7, false);
    right_attack = player.animations.add('right_attack', [31,3], 7, false);
    up_attack.isFinished = true; down_attack.isFinished = true; left_attack.isFinished = true; right_attack.isFinished = true;

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(enemy1, Phaser.Physics.ARCADE);
    game.physics.enable(enemy2, Phaser.Physics.ARCADE);
    game.physics.enable(enemy3, Phaser.Physics.ARCADE);
    game.physics.enable(enemy4, Phaser.Physics.ARCADE);
    player.body.setSize(14, 14);
    game.physics.enable(sword, Phaser.Physics.ARCADE);
    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    key_Z = game.input.keyboard.addKey(90);
}

function update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(sword, layer, sword_hide);
    game.physics.arcade.overlap(sword, enemy1, sword_hide);
    game.physics.arcade.overlap(sword, enemy2, sword_hide);
    game.physics.arcade.overlap(sword, enemy3, sword_hide);
    game.physics.arcade.overlap(sword, enemy4, sword_hide);
    player.body.velocity.set(0);

    attack();
    walk();
    

}

function render() {
    //game.debug.cameraInfo(game.camera, 16, 16);
    //game.debug.spriteInfo(player, 32, 32);
}

function walk() {
    if (cursors.left.isDown) {
        player.body.velocity.x = -100;
        player.play('left');
        direction = 2;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 100;
        player.play('right');
        direction = 3;
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -100;
        player.play('up');
        direction = 0;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 100;
        player.play('down');
        direction = 1;
    } else if (up_attack.isFinished && down_attack.isFinished && left_attack.isFinished && right_attack.isFinished) {
        player.animations.stop();
    }
}

function attack() {
    if (key_Z.isDown && !sword.visible && up_attack.isFinished && down_attack.isFinished && left_attack.isFinished && right_attack.isFinished) {
        if (direction == 0) {
            player.play('up_attack')
            sword.x = player.x; sword.y = player.y;
            sword.visible = true;
            sword.body.rotation = 0;
            sword.body.velocity.y = -300;
        } else if (direction == 1) {
            player.play('down_attack')
            sword.x = player.x + 8; sword.y = player.y + 8;
            sword.visible = true;
            sword.body.rotation = 180;
            sword.body.velocity.y = 300;
        } else if (direction == 2) {
            player.play('left_attack')
            sword.x = player.x; sword.y = player.y + 10;
            sword.visible = true;
            sword.body.rotation = -90;
            sword.body.velocity.x = -300;
        } else {
            player.play('right_attack')
            sword.x = player.x + 16; sword.y = player.y + 8;
            sword.visible = true;
            sword.body.rotation = 90;
            sword.body.velocity.x = 300;
        }
    }
}

function sword_hide(){
    sword.visible = false;
}
function spawn_enemy(){
    /*
    for(var i = 0; i < 4; i += 1){
        orange_boi_spawn[i] = map2.searchTileIndex(1, i);
    }
    */
    enemy1 = game.add.sprite(orange_boi_spawn1.x * 16, orange_boi_spawn1.y * 16, 'enemy', 1);
    enemy2 = game.add.sprite(orange_boi_spawn2.x * 16, orange_boi_spawn2.y * 16, 'enemy', 1);
    enemy3 = game.add.sprite(orange_boi_spawn3.x * 16, orange_boi_spawn3.y * 16, 'enemy', 1);
    enemy4 = game.add.sprite(orange_boi_spawn4.x * 16, orange_boi_spawn4.y * 16, 'enemy', 1);
}

function orgboi_walk(){

}
