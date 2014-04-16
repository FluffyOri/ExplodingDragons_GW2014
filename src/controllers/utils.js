var utils = {
    getDistance : function(pos1, pos2)
    {
        var distance = Math.sqrt(Math.pow(pos1.x-pos2.x , 2) + Math.pow(pos1.y-pos2.y , 2));
        return distance;
    },
    getAngle : function(pos1, pos2, angleType)
    {
        var angleRad = (Math.atan2(pos1.x - pos2.x, pos1.y - pos2.y) + Math.PI/2) * -1;
        var angleDeg = angleRad*180/Math.PI;
        
        if (angleType === "degree") {
            return angleDeg;
        } else {
            return angleRad;
        }
    },
}

module.exports = utils;