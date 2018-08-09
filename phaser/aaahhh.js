var game;
var player;

window.onload = function() {
    game = new Phaser.Game(1600, 1600, Phaser.CANVAS, 'phaser-example ', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
}

function preload() {
    game.load.crossOrigin = true;
    game.load.tilemap('map', 'zelda_stuff/zelda.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map2', 'zelda_stuff/zelda_Tile Layer 2.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'zelda_sprite_sheet_overworld.png');
    game.load.image('spawns', 'zelda_stuff/spawn_locations.png');
    game.load.image('sword', 'zelda_stuff/link_sword_sprite_sheet.png');
    game.load.spritesheet('player', 'zelda_stuff/zeda_sprite_sheet_link.png', 16, 16, 40, 0, 14);

}
var map;
var map2;
var layer;
var player;
var sword;
var linkSpawn;
var direction;
var up, down, left, right;
var up_attack, down_attack, left_attack, right_attack;
var key_Z;

function create() {
    map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('tiles', null, 16, 16, 0, 1);
    map2 = game.add.tilemap('map2', 16, 16);
    map2.addTilesetImage('spawns', null, 16, 16, 1, 2);
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(0, 7);
    map.setCollisionBetween(9, 125);
    linkSpawn = map2.searchTileIndex(10);
    player = game.add.sprite(linkSpawn.x * 16, linkSpawn.y * 16, 'player', 1);
    sword = game.add.sprite(linkSpawn.x * 15, linkSpawn.y * 16, 'sword');
    // doki doki oyo class
    up = player.animations.add('up', [2, 16], 10, true);
    down = player.animations.add('down', [0, 14], 10, true);
    left = player.animations.add('left', [1, 15], 10, true);
    right = player.animations.add('right', [3, 17], 10, true);
    up_attack = player.animations.add('up_attack', [30,2], 7, false);
    down_attack = player.animations.add('down_attack', [28,0], 7, false);
    left_attack = player.animations.add('left_attack', [29,1], 7, false);
    right_attack = player.animations.add('right_attack', [31,3], 7, false);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    key_Z = game.input.keyboard.addKey(90);
}

function update() {
    game.physics.arcade.collide(player, layer);

    player.body.velocity.set(0);

    attack();
    walk();

}

function render() {

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
    if (key_Z.isDown) {
        if (direction == 0) {
            player.play('up_attack')
        } else if (direction == 1) {
            player.play('down_attack')
        } else if (direction == 2) {
            player.play('left_attack')
        } else {
            player.play('right_attack')
        }
    }
}