module.load("_sgf","path","inherits","./EventEmitter",function(j,e,g,h){function a(b,a){this.a=!1;this.path=b;this.container=a;this.renderables=[];this.updateCount=this.renderCount=0;a.style.margin=a.style.padding="0px";var c=this,d=module.load(e.absolutize(i,b+"/main"),function(){c.emit("start");c.resume()})[0].global;d.game=d;for(var f in this)"function"===typeof this[f]&&function(b){d[b]=function(){return c[b].apply(c,arguments)}}(f)}var i=e.parse(module.main.id);g(a,h);module.exports=a;a.prototype.isRunning=
function(){return this.a};a.prototype.resume=function(){if(!this.a)this.a=!0,this.emit("resume")};a.prototype.pause=function(){if(this.a)this.a=!1,this.emit("pause")};a.prototype.add=function(b,a,c){this.renderables.push(b);b.parent=this;this._s.appendChild(b._e);if(a!==!1)b._pu=function(a){b.update&&b.update(a)},this.on("update",b._pu);if(c!==!1)b._pr=function(a){b.render&&b.render(a)},this.on("render",b._pr)};a.prototype.remove=function(){};a.prototype.toString=function(){return"[object Game]"}});