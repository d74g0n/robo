// This is the robots main project.
const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

//Timing control - mentronome+animation.
const masterTimer = require('/root/dev/node/robo/js/masterTimer.js').masterTimer;

// HOOK RPI
const board = new five.Board({
    io: new Raspi(),
    repl: true,
});

// FACEPLATE DISPLAY::
const j5Seg7 = require('/root/dev/node/robo/js/j5Seg7.js').j5Seg7;
j5Seg7.init(five);
const _A = require('/root/dev/node/robo/js/j5Seg7.js')._A;

//let facestate = require('/root/dev/node/robo/js/j5Seg7.js').facestate;
const facestate = {
    eye: {
        left: {
            statedesc: [`OPEN-FULL`, `OPEN-HIGH`, `OPEN-LOW`, `CLOSED-SLIT`, `halfclosed`],
            state: 3,
            draw: function () {
                facestate.eye.logic.docalc(facestate.eye.left.state, 0);
            },
        },
        right: {
            state: 3,
            draw: function () {
                facestate.eye.logic.docalc(facestate.eye.right.state, 4);
            },
        },
        logic: {
            bound: function () {
                //using statedesc which is only on left eye rn
                if (facestate.eye.left.state >= facestate.eye.left.statedesc.length - 1) {
                    facestate.eye.left.state = 0;
                }
                if (facestate.eye.right.state >= facestate.eye.left.statedesc.length - 1) {
                    facestate.eye.right.state = 0;
                }

            },
            incrementState: function () {

                //                if (j5Seg7.rnd.bool()) {
                facestate.eye.left.state++;
                //                } else {
                facestate.eye.right.state++;
                //                }

            },
            docalc: function (state, eye) {

                //                facestate.eye.logic.bound(); //bounding

                switch (state) {
                    case 0:
                        //OPEN-WIDE
                        _A.drawLetter([1, 1, 0, 0, 0, 1, 1, 0], eye);
                        break;
                    case 1:
                        //OPEN-LOW
                        _A.drawLetter([0, 1, 1, 1, 1, 1, 1, 0], eye);
                        break;
                    case 2:
                        //SLIT
                        _A.drawLetter([1, 0, 1, 1, 1, 0, 0, 0], eye);
                        break;
                    case 3:
                        //OPEN-TOP 
                        _A.drawLetter([1, 1, 0, 0, 0, 1, 1, 0], eye);
                        break;
                    case 4:
                        _A.drawLetter([1, 0, 0, 0, 0, 0, 0, 0], eye);

                        break;
                    default:
                        console.log(`default hit: ${state} eye:${eye}`);
                        break;
                }
                //                console.log(`docalc:${state} | e:${eye}`);
            },
        },
    },
    mouth: {
        statedesc: [`CLOSED-BOT`, `CLOSED-MID`, `CLOSED-TOP`, `OPEN-TOP`, `OPEN-BOTTOM`],
        state: 0,
        sides: {
            left: true,
            right: false,
            flip: function () {
                facestate.mouth.sides.left = !facestate.mouth.sides.left;
                facestate.mouth.sides.right = !facestate.mouth.sides.right;
            }
        },
        draw: function () {
            facestate.mouth.logic.doCalcs(facestate.mouth.state);
        },
        logic: {
            //            toggleSides: function () {
            //
            //            },
            doCalcs: function (state) {
                facestate.mouth.logic.bound();

                switch (state) {
                    case 9:
                        //OPEN bot
                        _A.drawLetter([j5Seg7.rnd.bool(), 0, j5Seg7.rnd.bool(), j5Seg7.rnd.bool(), 0, 0, 0, 0], 1);
                        _A.drawLetter([j5Seg7.rnd.bool(), 0, 0, j5Seg7.rnd.bool(), j5Seg7.rnd.bool(), 0, 0, 0], 3);
                        break;
                    case 4:
                        //OPEN bot
                        _A.drawLetter([1, 0, facestate.mouth.sides.left, 1, 0, 0, 0, 0], 1);
                        _A.drawLetter([1, 0, 0, 1, facestate.mouth.sides.right, 0, 0, 0], 3);
                        break;
                    case 3:
                        //OPEN top
                        _A.drawLetter([1, facestate.mouth.sides.left, 0, 0, 0, 0, 1, 0], 1);
                        _A.drawLetter([1, 0, 0, 0, 0, facestate.mouth.sides.right, 1, 0], 3);
                        break;
                    case 2:
                        //topline
                        _A.drawLetter([0, 0, 0, 0, 0, 0, 1, 0], 1);
                        _A.drawLetter([0, 0, 0, 0, 0, 0, 1, 0], 3);
                        break;
                    case 1:
                        //midline
                        _A.drawLetter([1, 0, 0, 0, 0, 0, 0, 0], 1);
                        _A.drawLetter([1, 0, 0, 0, 0, 0, 0, 0], 3);
                        break;
                    case 0:
                        //botline
                        _A.drawLetter([0, 0, 0, 1, 0, 0, 0, 0], 1);
                        _A.drawLetter([0, 0, 0, 1, 0, 0, 0, 0], 3);
                        break;
                    default:
                        console.log(`defaultmouth`);
                        break;
                }

            },
            bound: function () {
                if (facestate.mouth.state >= facestate.mouth.statedesc.length - 1) {
                    facestate.mouth.state = 0;
                }
            },
        },
    }
}

const faceConfig = require('/root/dev/node/robo/js/j5Seg7.js').faceConfig;
faceConfig.facestate = facestate;
faceConfig.setto = 'pinguTalking';
//lazyalias::
const _F = faceConfig;


// DC_MOTORS::
let leftMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M1);
let rightMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M2);

// Bind Motors Together::
let motors = new five.Motors([leftMotor, rightMotor]);

// SERVOS::
//X Axis
let neck_servo = new five.Servo({
    pin: 'P1-38',
    //    range: [0, 360],
    range: [0, 180],
    startAt: 45, //45UP
});
//Y Axis
let head_servo = new five.Servo({
    pin: 'P1-40',
    range: [0, 180],
    startAt: 110
});

//BOARD READY CAN MOVE UP TO INCLUDE EVERYTHINGS DECLARATIONS
board.on('ready', () => {

    //-=-=-=-REPL SETUP::
    function goForward(speed) {
        motors.forward(speed)
    }

    function goBackward(speed) {
        motors.reverse(speed)
    }

    function stop() {
        motors.stop()
    }

    function stopAll() {
        motors.stop()
        stopServos();
    }

    function turnRight(speed) {
        leftMotor.forward(speed)
        rightMotor.stop()
    }

    function turnLeft(speed) {
        rightMotor.forward(speed)
        leftMotor.stop()
    }

    function spinRight(speed) {
        leftMotor.forward(speed)
        rightMotor.reverse(speed)
    }

    function spinLeft(speed) {
        rightMotor.forward(speed)
        leftMotor.reverse(speed)
    }

    function stopServos() {
        neck_servo.stop();
        head_servo.stop();
    }

    // -=-=-=-= Servos (neck/head position)
    let look = require('/root/dev/node/robo/js/replLook.js').look;
    look.init(neck_servo, head_servo);

    // -=-=-=-=-=- DRUMS:::
    let stopper = 30;
    let mpow = 50;

    function snare() {
        leftMotor.stop()
        setTimeout(function () {
            leftMotor.reverse(30)
            setTimeout(function () {
                leftMotor.stop();
            }, stopper / 2);
        }, stopper);
        leftMotor.forward(mpow);
    }

    function bass() {



        rightMotor.stop()
        setTimeout(function () {
            rightMotor.reverse(30)

            setTimeout(function () {
                rightMotor.stop();
            }, stopper / 2);

        }, stopper);
        rightMotor.forward(mpow);

    }

    function playMetro(speed = 500, fancy = false) {
        _A.drawLetter([1, 1, 0, 0, 0, 1, 1], 0);
        _A.drawLetter([0, 0, 0, 1, 0, 0, 0], 1);
        _A.drawLetter([0, 0, 0, 1, 0, 0, 0], 3);
        _A.drawLetter([1, 1, 0, 0, 0, 1, 1], 4);

        setInterval(bass, speed * 2);

        if (fancy) {
            setInterval(bass, speed * 2.5);
        }

        setTimeout(function () {
            setInterval(snare, speed * 2);
            if (fancy) {
                setInterval(snare, speed * 2.25);
            }
        }, speed);
    }

    // -=-=-=-=- FACEPLATES:::

    function facelogicLoop() {
        //execute whatever face is set update (basically reroll for rnd parts);
        faceConfig[faceConfig.setto]();

        function drawExpression() {
            facestate.eye.right.draw();
            facestate.eye.left.draw();
            facestate.mouth.draw();
        }

        if (j5Seg7.rnd.bool()) {
            facestate.mouth.sides.flip();
        }

        drawExpression();
    }


    //-=-=-=-REPL INJECT::
    board.repl.inject({
        leftMotor,
        rightMotor,
        motors,
        goForward,
        goBackward,
        stop,
        stopAll,
        turnRight,
        turnLeft,
        spinRight,
        spinLeft,
        stopServos,
        snare,
        bass,
        playMetro,
        neck_servo,
        head_servo,
        masterTimer,
        j5Seg7,
        faceConfig,
        facestate,
        look,
    })


    setInterval(facelogicLoop, 100);


    look.sequence = [look.left, look.right, look.up, look.down, look.up, look.left, look.down, look.up, look.down, look.right, look.middle];
    _F.sequence = ['normie',
                   'shouting',
                   'shoutingcrazy',
                   'shoutinggonnacry',
                   'pretalk',
                   'normie',
                   'pinguTalking',
                   'talkglitch'];
    look.seqmod = look.sequence.length - 1;
    look.seqcount = look.sequence.length - 1;
    //quick little startup checky thing.

    function sequenceloop (looptime=1000) {
         return setInterval(function () {
        _F.setFace(_F.sequence[look.seqcount % _F.sequence.length]);
//        console.log(`Face: ${_F.sequence[look.seqcount % _F.sequence.length]}`);
        look.sequence[look.seqcount % look.seqmod]();
        look.seqcount++;

        if (look.seqcount >= (look.seqmod * 2) + 1) {
            clearInterval(startupstretch);
            console.log(`warm up stretch complete`);
            console.log(`now double time!`);
//            look.seqcount = 1;
            let startupstretch2 = sequenceloop(500);
            
            
        } else {
            console.log(`count:${look.seqcount} mod:${look.seqcount % look.seqmod}`);
        }

    }, looptime);
    }
    
    let startupstretch = sequenceloop(1000);
  

})

// -=-=-=- CLOSE / SHUTDOWN
// TRAP CTRL-C (REPL FALSE STUFF)
process.on('SIGINT', function () {
    console.log("Shutting Down");
    //stop Motors::
    //    j5Seg7.clear()
    //    leftMotor.stop()
    //    rightMotor.stop()
    motors.stop()
    //stop Servos::
    neck_servo.stop()
    head_servo.stop()
    process.exit();
});


// -=-=-=- CUTS::
//    neck_servo.stop()
//    head_servo.stop()
//-=-=-=-EXECUTION BEGIN::      


//    playMetro(500, true);

//    logicLoop();
//    setTimeout(function () {
//        head_servo.stop();
//        neck_servo.stop();
//    }, 1000);

//    head_servo.to(180);
//    neck_servo.to(0);
//    neck_servo.sweep();
//    head_servo.sweep();
