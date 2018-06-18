import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {

  constructor (context)
  {
    super('GameScene');
    this.context = context
    this.tiles = {}
  }

  preload ()
  {
    this.load.image('tile-empty', "tile-empty.png");
      // this.load.image('asuna', 'assets/sprites/asuna_by_vali233.png');
  }

  create ()
  {
    var camera1 = this.cameras.main;
    camera1.scrollX = -400
    camera1.scrollY = -300

    let {state, props} = this.context
    // Get the tile count
    this.context.contracts.RealmBase.methods.GetTileCount().call().then((tileCount) => {
      // Get data for each tile
      for (let id = 0; id < tileCount; id++) {
        this.context.contracts.RealmBase.methods.GetTile(id).call().then((data) => {
          // Parse data
          let tile = {
            owner: data[0].toString(),
            x: data[1].toString(),
            y: data[2].toString()
          }
          console.log("TILE DATA: ", data)
          // Add data to tiles object
          if (this.tiles[tile.x] == null) {
            this.tiles[tile.x] = {}
          }
          this.tiles[tile.x][tile.y] = tile
          // Create sprite
          var sprite = this.add.sprite(tile.x*24+12, tile.y*24+12, 'tile-empty').setInteractive();

          sprite.on('pointerup', this.onTileClick)
        })
      }
    })
    // for (let x = 0; x < 10; x++) {
    //   // create new array for this x position
    //   for (let y = 0; y < 10; y++) {
    //     let tileData = state.world[x][y]
    //     console.log("Tile Data: ", tileData)
    //     // if (tileData.owner == props.account) {

    //     // }
    //     // Get the data for this specific tile
    //     var tile = this.add.sprite(x*24+12, y*24+12, 'tile-empty').setInteractive();
    //     // var tile = new Phaser.Geom.Rectangle(x*55, y*55, 50, 50);
    //     // var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    //     // graphics.fillRectShape(tile); 
    //     tile.on('pointerup', this.onTileClick)
    //   }
    // }
  }

  update() {
    let {state, props} = this.context
    
  }

  onTileClick (pointer)
  {
    console.log("CLICK")
  }

}
