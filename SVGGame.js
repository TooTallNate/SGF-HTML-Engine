module.load("_sgf","inherits","./Game",function(a,c,d){function b(b,c){d.call(this,b,c);this._s=a._svg("svg",{xmlns:a.SVG_NS,version:"1.1",width:"100%",height:"100%"});this.container.appendChild(this._s)}module.provide("Circle",a.root+"/SVGCircle.js");module.provide("Container",a.root+"/SVGContainer.js");module.provide("Rectangle",a.root+"/SVGRectangle.js");module.provide("Sprite",a.root+"/SVGSprite.js");c(b,d);module.exports=b});