//requirements
var c     = require("../config/constantes");
var world = require("../world");
var addRenderSystem = require("../modules/render");
var ennemis= require("../models/ennemis");
function getLevel(){
	var splines = [
		[
			[ 1280,200],[1280,170],[1280,145],[1145,125],[1180,120],[1140,155],[1000,185],[955,225],[905,195],[875,155],[845,125],[790,125],[745,160],[720,195],[685,230],[645,195],[615,160],[570,135],[535,160],[510,195],[475,230],[520,275],[445,315],[515,370],[445,420],[515,470],[395,520],[285,570],[170,615],[75,675],[0,710]
		],
	]
	var waves = [
	/* Ici on cree la wave 0*/		
		[
			{ennemis:1, x: 40,y : 160, spline:0},
			{ennemis:1, x: 50,y : 210, spline:0}
		],
	]
	var levelDesign = [
		{time :2000, wave :0, y: 0},
	]
	return { splines: splines ,waves : waves, levelDesign: levelDesign };
}
world.manageTime = function(){
	for (var i = 0; i < this.level.levelDesign.length; i++) {
		if (this.level.levelDesign[i].time <= this.elapsedTime){
			var waveId =this.level.levelDesign[i].wave;
			var ywave =this.level.levelDesign[i].y;
			var wave = this.level.waves[waveId];
				for (var j=0; j<wave.length; j++){
					var splineId = wave[j].spline;
					if (wave[j].ennemis ==1){
						this.ennemis.push(new ennemis(ennemis,wave[j].x, ywave+ wave[j].y,this.level.splines[splineId],1))
						}	
					}
			//console.log(game.elements.enemy_1,game.level.levelDesign[i].time, game.elapsedTime)
			this.level.levelDesign.splice(i,1);
			i--;
		}
	}		
}
addRenderSystem(manageTime.prototype);

module.exports = manageTime;