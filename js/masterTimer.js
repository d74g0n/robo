let masterTimer = {
    strikeforce: 80,
    motors: undefined,
    MusicLoop: function () { // THE TICK
        masterTimer.actions.select(masterTimer.measure);
        masterTimer.advanceTimeMeasure();
    },
    advanceTimeMeasure() {
        masterTimer.measure++;
        masterTimer.beatcount++;
        // No Zero's 
        if (masterTimer.measure < 1) {
            masterTimer.measure = 1;
        }
        // roll over at end of 4 bars
        if (masterTimer.measure >= masterTimer.beatsperloop) {
            masterTimer.measure = 0;
        }
    },
    song: {
        track1: [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        track2: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        //        track3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    puppetStates: {
        head: [1],
        neck: [1],
        face: [1],
    },
    actions: {
        select: function (measureaction = masterTimer.measure) {
            // function checks SONG.track for values (snare bassdrum etc) trigger accordingly.
            masterTimer.motors.stop();
            // simutaneous motors (hi hat +)
            if (masterTimer.song.track1[masterTimer.measure] && masterTimer.song.track2[masterTimer.measure]) {
                console.log('both');
                masterTimer.motors.forward(masterTimer.strikeforce);
//                setTimeout(function () {
//                    masterTimer.actions.stop(masterTimer.motors);
//                }, masterTimer.ms_pb / 2);


            } else {
                //individual singles: 
                if (masterTimer.song.track1[masterTimer.measure]) {
//                    console.log('left');
                    masterTimer.leftMotor.forward(masterTimer.strikeforce);

                    setTimeout(function () {
                        masterTimer.actions.stop(masterTimer.leftMotor);
                        masterTimer.leftMotor.reverse(50);
                    }, masterTimer.ms_pb / 8);
                    
                    setTimeout(function () {
                        masterTimer.actions.stop(masterTimer.leftMotor);
                    }, masterTimer.ms_pb / 4);
                    
                }
                if (masterTimer.song.track2[masterTimer.measure]) {
//                    console.log('right');
                    masterTimer.rightMotor.forward(masterTimer.strikeforce);

                    setTimeout(function () {
                        masterTimer.actions.stop(masterTimer.rightMotor);
                        masterTimer.rightMotor.reverse(180);
                    }, masterTimer.ms_pb / 8);
                    
                    setTimeout(function () {
                        masterTimer.actions.stop(masterTimer.rightMotor);
                    }, masterTimer.ms_pb / 4);
                }
            }


        },
        stop: function (motor) {
            return motor.stop();
        },

    },
    init: function (m1, m2, m3) {
        // AKA SETUP::
        masterTimer.motors = m1;
        masterTimer.leftMotor = m2,
            masterTimer.rightMotor = m3,

            //set to first time measure:
            masterTimer.measure = 1;
        //itterations before return to first measure:
        masterTimer.beatsperloop = 16;
        // its essentially half speed with current maths:
        masterTimer.init_ms_pb(120); //miliseconds per beat
    },
    timer: [],
    isActive: false,
    measure: 1,
    beatsperloop: 16,
    beatcount: 0,
    bpm: 120,
    ms_pb: undefined,
    init_ms_pb: function (targetbpm = 120) {
        //set milliseconds per beat.
        let minute = 60000;
        masterTimer.ms_pb = minute / targetbpm;
    },
    start: function (bpm = 120) {
        //gonna have to check for already running
        masterTimer.init_ms_pb(bpm * 2);


        masterTimer.isActive = true;
        masterTimer.timer.unshift(setInterval(masterTimer.MusicLoop, masterTimer.ms_pb));
        console.log(`[masterTimer-start][isActive:${masterTimer.isActive} 83]`);

    },
    stop: function () {
        masterTimer.isActive = false;
        if (masterTimer.timer.length > 0) {
            masterTimer.timer.forEach(function (obj) {
                clearInterval(obj);
            });
        }
        console.log(`[masterTimer-stop][isActive:${masterTimer.isActive}]`);

    },
}

exports.masterTimer = masterTimer;
