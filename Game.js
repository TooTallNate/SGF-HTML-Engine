module.load("_sgf","path","inherits","./EventEmitter",function(j,e,g,h){function a(a,c){this.a=!1;this.path=a;this.container=c;this.renderables=[];c.style.margin=c.style.padding="0px";var b=this,d=module.load(e.absolutize(i,a+"/main"),function(){b.emit("start");b.resume()})[0].global;d.game=d;for(var f in this)"function"===typeof this[f]&&function(a){d[a]=function(){return b[a].apply(b,arguments)}}(f)}var i=e.parse(module.main.id);g(a,h);module.exports=a;a.prototype.isRunning=function(){return this.a};
a.prototype.resume=function(){if(!this.a)this.a=!0,this.emit("resume")};a.prototype.pause=function(){if(this.a)this.a=!1,this.emit("pause")};a.prototype.add=function(a){this.renderables.push(a);this._s.appendChild(a._e);a.parent=this};a.prototype.remove=function(){}});