// cycles through fibonnaci factors under 100, sets corresponding keys
// requires framecounter value each tick.
class FibMod {
    constructor() {
        this.factor = [2, 3, 5, 8, 13, 21, 34, 55, 89];
    }
    tick(frame) {
        let vis = this;
        this.factor.forEach(function (obj) {
            if (frame % obj == 0) {
                vis[`i${obj}`] = true;
            } else {
                vis[`i${obj}`] = false;
            }
        });
    }



}

exports.FibMod = FibMod;

//
//let IC = new IntervalControl();
//IC.tick(21);
//console.log(IC);
