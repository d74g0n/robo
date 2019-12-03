// Hardcoded Default Control.
const _Defaults = {
    repl: false,
}
// Init j5 with Rpi::
const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
    io: new Raspi(),
    //    repl: true,
    repl: _Defaults.repl,
});

const {
    Face
} = require('/root/dev/node/robo/class/Face.js');
const F = new Face(five, 1)


//Init Motors::
let _M = { // M IS FOR MOTOR!
    leg: {
        left: undefined,
        right: undefined,
    },
    legs: undefined,
    arm: {
        left: undefined,
        right: undefined,
    },
    speed: {
        up: 30,
        down: 40,
    },
    arms: undefined,
    all: undefined,
    stop: function () {
        _M.all.stop();
    },
    //    testSequence: [],
    sequenceIndex: 0,
    seqSpeed: 60,
    seqTimer: undefined,
    seqTimeout: 10,
    runcheck: function (timeout = 100) {
        if (timeout > _M.seqTimeout) {
            _M.seqTimeout = timeout;
        }
        _M.seqTimer = setInterval(_M.systemCheck, _M.seqTimeout);
        console.log(`seqtimer started`);
    },
    systemCheck: function (cycles) {
        //this is a loop to cycle through the motors functions.
        //        _M.stop();

        switch (_M.sequenceIndex) {
            case 0:
                _M.all.forward(_M.seqSpeed);
                break;
            case 1:
                _M.all.reverse(_M.seqSpeed);
                break;
            case 2:
                _M.leg.left.forward(_M.seqSpeed);
                break;
            case 3:
                _M.leg.left.reverse(_M.seqSpeed);
                break;
            case 4:
                _M.leg.right.forward(_M.seqSpeed);
                break;
            case 5:
                _M.leg.right.reverse(_M.seqSpeed);
                break;
            case 6:
                _M.arm.left.forward(_M.seqSpeed);
                break;
            case 7:
                _M.arm.left.reverse(_M.seqSpeed);
                break;
            case 8:
                _M.arm.right.forward(_M.seqSpeed);
                break;
            case 9:
                _M.arm.right.reverse(_M.seqSpeed);
                break;
            case 10:
                _M.legs.forward(_M.seqSpeed);
                break;
            case 11:
                _M.legs.reverse(_M.seqSpeed);
                break;
            case 12:
                _M.arms.forward(_M.seqSpeed);
                break;
            case 13:
                _M.arms.reverse(_M.seqSpeed);
                break;
            default:
                clearInterval(_M.seqTimer);
                _M.stop();
                break;



        }

        _M.sequenceIndex++;
        if (_M.sequenceIndex == 13) {
            _M.sequenceIndex = 0;
        }


    },

    //percussive strike::
    _strike(moto = _M.leg.right, speedUp = _M.speed.up, speedDown = _M.speed.down) {
        setTimeout(function () {
            moto.forward(speedDown);
            setTimeout(function () {
                moto.stop();
            }, 38);
        }, 25);
        moto.reverse(speedUp);
    },
    //percussive strike::
    _Revstrike(moto = _M.leg.right, speedUp = _M.speed.up, speedDown = _M.speed.down) {
        setTimeout(function () {
            moto.reverse(speedDown * 2);
            setTimeout(function () {
                moto.stop();
            }, 38);
        }, 25);
        moto.forward(speedUp * 2);
    },
    //percussive strike::
    _Crashstrike(moto = _M.leg.right, speedUp = _M.speed.up, speedDown = _M.speed.down) {
        setTimeout(function () {
            moto.reverse(speedDown * 4);
            setTimeout(function () {
                moto.stop();
            }, 38);
        }, 25);
        moto.forward(speedUp * 1);
    },

}; // end of dataobject _M

function init_M() {
    _M.leg.left = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M2);
    _M.leg.right = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M1);
    _M.legs = new five.Motors([_M.leg.left, _M.leg.right]);
    _M.arm.left = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M4);
    _M.arm.right = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M3);
    _M.arms = new five.Motors([_M.arm.left, _M.arm.right]);
    _M.lside = new five.Motors([_M.arm.left, _M.leg.left]);
    _M.rside = new five.Motors([_M.arm.right, _M.leg.right]);
    _M.all = new five.Motors([_M.arm.left, _M.arm.right, _M.leg.left, _M.leg.right]);
}

// -=-==- EXECUTION:::
init_M();


// -=-=-=--= EXPERIMENTING::


let qtune = {
    init: function (bpm) {
        qtune.init_ms_pb(bpm);
        //        qtune.songlen = qtune.song.track1.length;
        qtune.songlen = 16;
        // bass, snare, hihat
        qtune.limbtrack = [_M.leg.right, _M.arm.right, _M.arm.left, _M.leg.left];
    },
    ms_pb: undefined,
    init_ms_pb: function (targetbpm = 480) {
        let minute = 60000;
        qtune.ms_pb = minute / targetbpm;
    },
    limbtrack: undefined,
    song: {


        track1: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], //basic kick

        //        track2: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], //basic snare
        //        track3: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], //basic snare

        track4: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], //hats


        //        track2: [2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 1, 0, 1, 0],

        //        track2: [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 2], //lstart
        //        track2: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], //lstart
        //        track3: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], //lstart
        //        track2: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], //lstart
        //        track3: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], //lstart
        track2: [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0], //lstart
        //        track1: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], //lstart
        //        track4: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //lstart
        //        track3: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], //lstart
        //        track1: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], //lstart
        track3: [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],

        //song:
        //        track1: [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    measurecount: 0,
    stanzacount: 1,
    progressMeasure: function () {
        qtune.measurecount++;
        if (qtune.measurecount >= qtune.songlen) {
            qtune.measurecount = 0;
            qtune.stanzacount++;
        }
    },
    playloop: function () {
        qtune.trackReact();
        qtune.progressMeasure();

        //movement twitches hack::
        if (qtune.measurecount % 5 == 0) {
            if (qtune.stanzacount % 3 == 0) {
                F.rndMouth();
            }
            F.rndEye();
            F.isShowingTime = false;
            F.clear();
            F.tick();

        }
    },

    trackReact: function () {

        let track1 = false;
        let track2 = false;
        let track3 = false;
        let track4 = false;

        let t1Inverted = false;
        let t2Inverted = false;
        let t3Inverted = false;
        let t4Inverted = false;

        // SET INITIAL BITs::
        if (qtune.song.track1[qtune.measurecount] == 1) {
            track1 = true;
        }
        if (qtune.song.track2[qtune.measurecount] == 1) {
            track2 = true;
        }
        if (qtune.song.track3[qtune.measurecount] == 1) {
            track3 = true;
        }
        if (qtune.song.track4[qtune.measurecount] == 1) {
            track4 = true;
        }

        //        // SET ADVANCED BIT::
        //        //lfoot kickup
        //        if (qtune.song.track1[qtune.measurecount] == 2 && qtune.stanzacount % 4 == 0) {
        //            t1Inverted = true;
        //        }
        //

        if (qtune.song.track2[qtune.measurecount] == 2 && qtune.stanzacount % 4 == 0) {
            t2Inverted = true;
        }
        //
        //        //alt rhand
        //        if (qtune.song.track3[qtune.measurecount] == 2 && qtune.stanzacount % 4 == 0) {
        //            t3Inverted = true;
        //        }
        //
        //        //       Rfoot
        //        if (qtune.song.track4[qtune.measurecount] == 2 && qtune.stanzacount % 4 == 0) {
        //            t4Inverted = true;
        //        }


        // forcebits off::
        // FORCE OFF - MECHANICAL MUTE
        track1 = false;
        track2 = false;
        track3 = false;
        track4 = false;

        t1Inverted = false;
        t2Inverted = false;
        t3Inverted = false;
        t4Inverted = false;

        // Execute state data (SIMPLE)
        // KICK
        if (track1 || t1Inverted) {
            if (t1Inverted) {
                _M._Revstrike(qtune.limbtrack[0]);
            } else {
                //                _M._strike(qtune.limbtrack[0],100,120);
                _M._strike(qtune.limbtrack[0], 160, 200); // tuned for 'heavy leg'
            }
        }

        // MAIN HAND
        if (track2 || t2Inverted) {
            if (t2Inverted) {
                _M._Crashstrike(qtune.limbtrack[1]);
            } else {
                _M._strike(qtune.limbtrack[1], 50, 160);
            }
        }

        // ALT HAND
        if (track3 || t3Inverted) {
            if (t3Inverted) {
                _M._Crashstrike(qtune.limbtrack[2]);
            } else {
                _M._strike(qtune.limbtrack[2], 50, 160);
            }
        }

        // HAT-FOOT
        if (track4 || t4Inverted) {
            if (t4Inverted) {
                _M._Revstrike(qtune.limbtrack[3]);
            } else {
                //                _M._strike(qtune.limbtrack[3], 30, 200); // custom hit hat foot forces. no up all pedal push-pop
                _M._strike(qtune.limbtrack[3], 30, 200); // custom hit hat foot forces. no up all pedal push-pop
            }
        }


    },


    start: function () {

        setInterval(qtune.playloop, qtune.ms_pb);



    },



} //qtunened

qtune.init(240);
//qtune.init(120);
//qtune.init(480);
//qtune.init(960);
qtune.start();









// -=-=-=- EXPERIMENTAL END









// -=-=-=- CLOSE / SHUTDOWN
// TRAP CTRL-C (REPL FALSE STUFF)
process.on('SIGINT', function () {
    console.log("Shutting Down");
    //stop Motors::
    _M.stop();
    process.exit();
});
