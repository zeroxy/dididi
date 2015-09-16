var TitleLayer = cc.Layer.extend({
  helloLabel:null,
  sprite:null,

  init:function () {

    this._super();

    var size = cc.director.getWinSize();

    cc.MenuItemFont.setFontSize(25);
    cc.MenuItemFont.setFontName("Impact");
    var closeItem = new cc.MenuItemFont.create(
      "Game Start !",
      function () {
        var scene = new GameScene();
        cc.director.runScene(scene);
      },this);
    closeItem.setAnchorPoint(0.5, 0.5);
    closeItem.setPosition(size.width /2, size.height /2 -50);
    
    var menu = new cc.Menu(closeItem);
    menu.setPosition(0, 0);
    this.addChild(menu, 1);
    

    this.helloLabel = new cc.LabelTTF("RETURN!!\n   Undead!!", "Impact", 70);
    this.helloLabel.setPosition(size.width / 2 , size.height /2  + 40);
    this.addChild(this.helloLabel, 5);

  }
});

var TitleScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new TitleLayer();
    this.addChild(layer);
    layer.init();
  }
});
