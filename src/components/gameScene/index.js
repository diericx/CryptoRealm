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
    this.load.image('tile-dirt', "tile-dirt.png");
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
            id,
            owner: data[0].toString(),
            x: data[1].toString(),
            y: data[2].toString()
          }
          console.log(tile)
          // Create sprite and add data to the sprite
          if (this.tiles[tile.x] == null) {
            this.tiles[tile.x] = {}
          }
          var x = 70 * (Math.sqrt(3) * tile.x  +  Math.sqrt(3)/2 * tile.y)
          var y = 70 * (3./2 * tile.y)

          var sprite = this.add.sprite(x, y, 'tile-dirt').setInteractive();
          sprite.tileData = tile
          this.tiles[tile.x][tile.y] = sprite

          // Check for ownership
          console.log(sprite.tileData.owner)
          console.log(this.context.props.account)
          console.log(sprite.tileData.owner === this.context.props.account)
          if (sprite.tileData.owner === this.context.props.account) {
            sprite.setTint(0xff0000);
          }

          sprite.on('pointerup', pointer => {
            this.context.contracts.RealmBase.methods.ClaimTile(id).send().then((response) => {
              console.log(response)
            })
          })

        })
      }
    })
  }

  update() {
    let {state, props} = this.context
    
  }

  claimTile(id) {
    
  }

  onTileClick (id)
  {
    console.log("CLICK: ", this.tileData)
    this.claimTile(this.tileData.id)
  }

}
