class Servo {
    constructor(five) {
        //        this.init(five);
        this.x = new five.Servo({
            pin: 'P1-38',
            invert:true,
//            range: [0, 180],
//                     range: [0, 90],
//            startAt: 45, //45UP
        });

        this.y = new five.Servo({
            pin: 'P1-40',
            invert:true,
//            range: [0, 150],
//            startAt: 45
        });

    }

//    init(five) {
//        //        this.x = new five.Servo({
//        //            pin: 'P1-38',
//        //            //    range: [0, 360],
//        //            range: [0, 180],
//        //            startAt: 0, //45UP
//        //        });
//        //
//        //        this.y = new five.Servo({
//        //            pin: 'P1-40',
//        //            range: [0, 180],
//        //            startAt: 0
//        //        });
//
//    }

    rndxy() {
        this.x.to(Math.floor((Math.random() * 180)));
        this.y.to(Math.floor((Math.random() * 150)));
    }


}
exports.Servo = Servo;
