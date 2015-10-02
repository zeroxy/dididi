var getGridLine = function(startx, starty, width, height, xCount, yCount){
  var xStep =  width / xCount;
  var yStep = height / yCount;
  var result=[];
  for (var x = 0 ; x <= xCount ; x++){
    result.push({from:cc.p(startx+x*xStep,starty), to:cc.p(startx+x*xStep,starty+height)});
  }
  for (var y = 0 ; y <= yCount ; y++){
    result.push({from:cc.p(startx,starty+y*yStep), to:cc.p(startx+width,starty+y*yStep)});
  }
  return result;
}
var sampleMapData = "0aa1aaaaaaaaaaaaaaa2"+
                    "b  b               b"+
                    "b  b               b"+
                    "b  b               b"+
                    "b  b               b"+
                    "b  b       b       b"+
                    "b  b       b       b"+
                    "b  6aaaaaaa4aa     b"+
                    "b          b       b"+
                    "b          9       b"+
                    "b                  b"+
                    "b  aaaaaaaaaaaaaaaa5"+
                    "b                  b"+
                    "b  b aaaaaaaaaaaaaa5"+
                    "b  b               b"+
                    "b  b  a1aaa1aa   b b"+
                    "b  b   bcccb     b b"+
                    "b  3aaa7aaa7aaaa b b"+
                    "b  b             b b"+
                    "6aa7aaaaaaaaaaaaa7a8";

var MapLayer = cc.Layer.extend({
  tile: function(hexnum){ 
    var spriteXY = [{x:0,y:0}, {x:4,y:0}, {x:2,y:0},
                    {x:3,y:1}, {x:4,y:1}, {x:5,y:1},
                    {x:0,y:2}, {x:4,y:2}, {x:2,y:2},
                    {x:1,y:1}, {x:1,y:0}, {x:0,y:1}, {x:3,y:0},{x:2,y:1}];
    var tempxy = spriteXY[parseInt(hexnum,16)];
    return new cc.Sprite(wall, cc.rect( 16*tempxy.x, 48+16*tempxy.y,16,16));
  },
  ctor: function(){
    this._super();
    this.init();
  },
  init: function(){
    this._super();
    var winSize = cc.director.getWinSize();
    var gridStartX = 10;
    var gridStartY = winSize.height-winSize.width;
    var gridWidth = winSize.width-20;
    var gridHeight = winSize.width-20;
    var gridXCount = 20;
    var gridYCount = 20;
    var charSizeX = gridWidth/gridXCount;
    var charSizeY = gridHeight/gridYCount;
    
    /// 그리드 그리기 시작
    getGridLine(gridStartX, gridStartY, gridWidth, gridHeight, gridXCount, gridYCount)
    .map(function(elem){
      var line = new cc.DrawNode();
      line.drawSegment(elem.from, elem.to, 2, cc.color(30,50,70));
      this.addChild(line);
    },this);
    /// 그리드 그리기 끝
    for (var x = 0; x < gridXCount ; x++){
      for (var y = 0; y < gridYCount ; y++){
        var tiletype = sampleMapData[y*gridXCount+x];
        if (tiletype==" ")
          var temptile = new cc.Sprite(tile, cc.rect(0,0,16,16));
        else 
          var temptile = this.tile(tiletype);
        temptile.setAnchorPoint(0,0);
        temptile.setPosition(gridStartX+charSizeX*x, gridStartY+charSizeY*(gridYCount-y-1));
        temptile.setScaleX( charSizeX / temptile.getContentSize().height);
        temptile.setScaleY( charSizeY / temptile.getContentSize().width);

        this.addChild(temptile);
      }
    }
    
    
  }
});
var CharacterLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    this.init();
  },
  init: function(){
    this._super();
    var winSize = cc.director.getWinSize();
    var gridStartX = 10;
    var gridStartY = winSize.height-winSize.width;
    var gridWidth = winSize.width-20;
    var gridHeight = winSize.width-20;
    var gridXCount = 20;
    var gridYCount = 20;
    var charSizeX = gridWidth/gridXCount;
    var charSizeY = gridHeight/gridYCount;
    
    /// 케릭터 이미지 그리기 시작
    var Character = new cc.Sprite(player, cc.rect( 0, 128,16,16));
    Character.setAnchorPoint(0, 0);
    Character.setPosition(gridStartX+charSizeX*10, gridStartY+charSizeY*10);
    Character.setScaleX( charSizeX / Character.getContentSize().height * 0.9);
    Character.setScaleY( charSizeY / Character.getContentSize().width * 0.9);
    this.addChild(Character);
    /// 케릭터 이미지 그리기 끝
    
  }
});
var ButtonLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    this.init();
  },
  init: function(){
    this._super();
    var winSize = cc.director.getWinSize();
    var buttonSize = (winSize.height-winSize.width)/4.5;
    
    /// 방향키 상 그리기 시작
    var upButton = new cc.Sprite(GUI, cc.rect(80,16,16,16));
    upButton.setAnchorPoint(0.5, 0.5);
    upButton.setPosition(buttonSize*6,buttonSize*3.8);
    upButton.setScaleX( buttonSize / upButton.getContentSize().height * 0.9);
    upButton.setScaleY( buttonSize / upButton.getContentSize().width * 0.9);
    /// 방향키 상 그리기 끝
    /// 방향키 좌 그리기 시작
    var leftButton = new cc.Sprite(GUI, cc.rect(80,64,16,16));
    leftButton.setAnchorPoint(0.5, 0.5);
    leftButton.setPosition(buttonSize*5.2,buttonSize*2.6);
    leftButton.setScaleX( buttonSize / leftButton.getContentSize().height * 0.9);
    leftButton.setScaleY( buttonSize / leftButton.getContentSize().width * 0.9);
    /// 방향키 좌 그리기 끝
    /// 방향키 우 그리기 시작
    var rightButton = new cc.Sprite(GUI, cc.rect(80,32,16,16));
    rightButton.setAnchorPoint(0.5, 0.5);
    rightButton.setPosition(buttonSize*6.2,buttonSize*2.6);
    rightButton.setScaleX( buttonSize / rightButton.getContentSize().height * 0.9);
    rightButton.setScaleY( buttonSize / rightButton.getContentSize().width * 0.9);
    /// 방향키 우 그리기 끝
    /// 방향키 하 그리기 시작
    var downButton = new cc.Sprite(GUI, cc.rect(80,48,16,16));
    downButton.setAnchorPoint(0.5, 0.5);
    downButton.setPosition(buttonSize*5.6,buttonSize*1.5);
    downButton.setScaleX( buttonSize / downButton.getContentSize().height * 0.9);
    downButton.setScaleY( buttonSize / downButton.getContentSize().width * 0.9);
    /// 방향키 하 그리기 끝

    /// 버튼 동작 정의
    upButton.pushed = function(){
      console.log("윗버튼 눌림!!");
    };
    leftButton.pushed = function(){
      console.log("왼버튼 눌림!!");
    };
    rightButton.pushed = function(){
      console.log("우버튼 눌림!!");
    };
    downButton.pushed = function(){
      console.log("밑버튼 눌림!!");
    };
    /// 버튼 동작 정의 끝
    
    /// ButtonLayer 에 button sprite 추가 
    this.addChild(upButton);
    this.addChild(leftButton);
    this.addChild(rightButton);
    this.addChild(downButton);
    /// ButtonLayer 에 button sprite 추가 끝
    
    /// button touch listener 생성
    var buttonTouchListener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE ,
      swallowTouces: true,
      onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0,0,s.width, s.height);
        if( cc.rectContainsPoint(rect, locationInNode)){
          target.pushed();
        }
      }
    });
    //cc.eventManager.addListener(
    //  cc.EventListener.create({
    //    event: cc.EventListener.MOUSE ,
    //    onMouseDown: function (event) {
    //      var target = event.getCurrentTarget();
    //      var locationInNode = target.convertToNodeSpace(event.getLocation());
    //      var s = target.getContentSize();
    //      var rect = cc.rect(0,0,s.width, s.height);
    //      if( cc.rectContainsPoint(rect, locationInNode)){
    //        console.log("upup!!mouse", locationInNode, target);
    //        target.pushed();
    //      }
    //      
    //    }
    //  }),
    //upButton);
    /// button touch listener 생성 끝
    
    //http://opengameart.org/content/dawnlike-16x16-universal-rogue-like-tileset-v181
    
    
    /// 개별 버튼에 생성해둔 버튼 리스너를 event Manager로 붙임
    cc.eventManager.addListener(buttonTouchListener, upButton);
    cc.eventManager.addListener(buttonTouchListener.clone(), leftButton);
    cc.eventManager.addListener(buttonTouchListener.clone(), rightButton);
    cc.eventManager.addListener(buttonTouchListener.clone(), downButton);
    /// 개별 버튼에 생성해둔 버튼 리스너를 event Manager로 붙임
    
  }
});
/*
var GameOverLayer = cc.LayerColor.extend({
  ctor: function(){
    this._super();
    this.init();
  },
  init: function(){
    this._super(cc.color(100,0,0,100));
    var winSize = cc.director.getWinSize();
    var centerPos = cc.p(winSize.width/2, winSize.height/2);
    cc.MenuItemFont.setFontSize(30);
    cc.MenuItemFont.setFontName("Impact");
    var menuItemRestart = new cc.MenuItemFont.create(
      "Game Restart",
      this.onRestart,this);
    var menu = new cc.Menu(menuItemRestart);
    menu.setPosition(centerPos);
    this.addChild(menu,105);
  },
  onRestart:function(sender){
    cc.director.resume();
    score=0;
    life=3;
    cc.director.runScene( new PhyTestScene() );
  }
});

var GameLayer = cc.Layer.extend({
  helloLabel:null,
  sprite:null,
  space:null,
  
  collisionCoinBegin:function(arbiter, space){
    cc.director.pause();
    this.addChild(new GameOverLayer());
  },
  initPhysics:function(){
    this.space = new cp.Space();
    this.space.gravity = cp.v(0,-360);
    this.space.addCollisionHandler(1, 0, this.collisionCoinBegin.bind(this), null, null, null);
  },
  update:function(dt){
    this.space.step(dt);
    this.helloLabel.setString("Score "+score+" Life "+life);
  },
  
  init:function () {

    this._super();

    var that = this;
    var size = cc.director.getWinSize();
    this.initPhysics();
    
    var floor = new cp.SegmentShape(this.space.staticBody, cp.v(-100, 70), cp.v(1000,70),10);
    floor.setElasticity(1);
    floor.setFriction(0);
    this.space.addStaticShape(floor);
    
    var checkCollision = new cp.SegmentShape(this.space.staticBody, cp.v(0, 81), cp.v(1000,81),1);
    checkCollision.setElasticity(1);
    checkCollision.setFriction(0);
    checkCollision.setCollisionType(1);
    this.space.addStaticShape(checkCollision);
    
    var circle = new cc.PhysicsSprite(buque);  // img of buque
    circle.setScale(0.25);
    var contentsize = circle.getContentSize();
    
    var myBody = new cp.Body(100, cp.momentForBox(100, contentsize.width/4, contentsize.height/4));
    myBody.p = cc.p(size.width/2, size.height / 7 *4);
    this.space.addBody(myBody);

    var myShape = new cp.BoxShape(myBody, contentsize.width/4, contentsize.height/4);
    myShape.setElasticity(1);
    myShape.setFriction(0);
    this.space.addShape(myShape);
    myShape.setCollisionType(0);
    
    circle.setBody(myBody);
    
    this.addChild(circle,90);
    
    
    var gamebg = new cc.Sprite(bg);
    gamebg.setAnchorPoint(0.5, 0.5);
    gamebg.setPosition(size.width/2, size.height /2+150);
    gamebg.setScale(1.3);
    this.addChild(gamebg,-400);
    
    
    var target = new cc.Sprite(target_png);  // shadow img of buque
    target.setAnchorPoint(0.5, 0.5);
    target.setPosition(size.width/2, size.height /7 *2);
    //target.setScale(0.5);
    this.addChild(target,80);
    
    this.helloLabel = new cc.LabelTTF("Score "+score+" Life "+life, "Impact", 38);
    this.helloLabel.setPosition(size.width / 2, size.height - 40);
    this.addChild(this.helloLabel, 5);

    
    
    var childrens1=[];
    var childrens2=[];
    for(var i = 0; i<30 ; i ++){
      var sprite_action1 = cc.MoveBy.create(20,cc.p(-3000,0));
      childrens1[i] = new cc.Sprite(bgbg);
      childrens1[i].setAnchorPoint(0,0);
      childrens1[i].setPosition(100*i,100);
      childrens1[i].setScale(0.1);
      childrens1[i].runAction(sprite_action1);
      this.addChild(childrens1[i],-50);
    }
    for(var i = 0; i<40 ; i ++){
      var sprite_action2 = cc.MoveBy.create(20,cc.p(-2100,0));
      childrens2[i] = new cc.Sprite(bgbg);
      childrens2[i].setAnchorPoint(0,0);
      childrens2[i].setPosition(75*i,190);
      childrens2[i].setScale(0.07);
      childrens2[i].runAction(sprite_action2);
      this.addChild(childrens2[i],-88);
    }
    //var debugNode = new cc.PhysicsDebugNode(this.space);
    //debugNode.visible = true;
    //this.addChild(debugNode);
    
    this.scheduleUpdate();
    if(cc.sys.capabilities.hasOwnProperty( 'mouse') || cc.sys.capabilities.hasOwnProperty( 'touches') ){
      cc.eventManager.addListener({
        event:cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan:function(touch,event){
          if(myBody.vy<0){
            var distance = Math.abs((size.height / 7 *2) - myBody.p.y);
            if(distance<50) {
              score +=1;
              if(score>7){
                cc.director.pause();
                that.addChild(new GameEndingLayer(),100);
              }
            } else {
              life-=1;
              if(life<1){
                cc.director.pause();
                that.addChild(new GameOverLayer(),99);//GameOverLayer
              }
            }
            myBody.vy*=-1;
            myBody.vy-=6;
          }
          return true;
        }
      },this);
    }
  }
});
*/
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var mapLayer = new MapLayer();
        var characterLayer = new CharacterLayer();
        var buttonLayer = new ButtonLayer();
        this.addChild(mapLayer);
        this.addChild(characterLayer);
        this.addChild(buttonLayer);
    }
});
