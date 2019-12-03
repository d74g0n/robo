const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five')
const board = new five.Board({
    io: new Raspi(),
    repl: false,
})


const j5Seg7 = {
    init: function () {
        j5Seg7.matrix = new five.Led.Matrix({
            controller: "HT16K33",
            repl: false,
        });
        j5Seg7.matrix.on();
        return j5Seg7.matrix;
    },
    matrix: undefined,
    clear: function () {
        j5Seg7.matrix.clear();
    },
    rnd: {
        bool: function () {
            return Math.random() >= 0.5;
        },
        getRandomInt: function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
    },
    draw: {
        dotstate: false,
        dots: function (state = j5Seg7.draw.dotstate) {
            j5Seg7.matrix.led(4, 2, state);
            j5Seg7.matrix.led(5, 2, state);
        },
        allOn: function (s = 0) {
            j5Seg7.matrix.led(0, s, 1); //top
            j5Seg7.matrix.led(1, s, 1); //tr
            j5Seg7.matrix.led(2, s, 1); //br
            j5Seg7.matrix.led(3, s, 1); //b
            j5Seg7.matrix.led(4, s, 1); //bl
            j5Seg7.matrix.led(5, s, 1); //tl
            j5Seg7.matrix.led(6, s, 1); //middle
            // matrix.led(7, s, 1); //decimal row
        },
        rnd: function () {
            //            j5Seg7.clear();

            for (y = 0; y < 8; y++) {
                for (x = 0; x < 5; x++) {

                    if (j5Seg7.rnd.bool()) {
                        j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                    } else {
                        if (j5Seg7.rnd.bool()) {
                            j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                        } else {
                            if (j5Seg7.rnd.bool()) {
                                j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                            } else {
                                if (j5Seg7.rnd.bool()) {
                                    j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                } else {
                                    if (j5Seg7.rnd.bool()) {
                                        j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                    } else {
                                        if (j5Seg7.rnd.bool()) {
                                            j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                        } else {
                                            if (j5Seg7.rnd.bool()) {
                                                j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                            } else {
                                                if (j5Seg7.rnd.bool()) {
                                                    j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                                } else {
                                                    if (j5Seg7.rnd.bool()) {
                                                        j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                                    } else {
                                                        if (j5Seg7.rnd.bool()) {
                                                            j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                                        } else {
                                                            if (j5Seg7.rnd.bool()) {
                                                                j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                                            } else {
                                                                if (j5Seg7.rnd.bool()) {
                                                                    j5Seg7.matrix.led(y, x, j5Seg7.rnd.bool());
                                                                } else {
                                                                    _A.parseSentance('LOVE');
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }


        }

    },
}

let matrix = j5Seg7.init();

const _A = {
    parseSentance: function (str4) {

        let x = 0;
        //           console.log(_A.letter[(str4.charAt(x).toUpperCase())]);
        _A.drawLetter(_A.letter[(str4.charAt(x).toUpperCase())], x);
        x++;
        _A.drawLetter(_A.letter[(str4.charAt(x).toUpperCase())], x);
        x++;
        _A.drawLetter(_A.letter[(str4.charAt(x).toUpperCase())], x + 1);
        x++;
        _A.drawLetter(_A.letter[(str4.charAt(x).toUpperCase())], x + 1);
        x++;

    },
    drawLetter: function (letterarray, x) {
        letterarray.forEach(function (val, index) {
            j5Seg7.matrix.led(index, x, val);
        });
    },
    letter: {
        //  MiTlBlBoBrTrTo
        A: [1, 1, 1, 0, 1, 1, 1],
        B: [1, 1, 1, 1, 1, 1, 1],
        C: [0, 1, 1, 1, 0, 0, 1],
        D: [0, 1, 1, 1, 1, 1, 1],
        E: [1, 1, 1, 1, 0, 0, 1],
        F: [1, 1, 1, 0, 0, 0, 1],
        G: [1, 1, 1, 1, 1, 0, 1],
        H: [1, 1, 1, 0, 1, 1, 0],
        I: [0, 1, 1, 0, 0, 0, 0],
        Ir: [0, 0, 0, 0, 1, 1, 0],
        J: [0, 0, 1, 1, 1, 1, 0],
        K: [undefined],
        L: [0, 1, 1, 1, 0, 0, 0],
        M: [undefined],
        N: [undefined],
        O: [0, 1, 1, 1, 1, 1, 1],
        P: [1, 1, 1, 0, 0, 1, 1],
        Q: [undefined],
        R: [1, 1, 1, 0, 1, 1, 1],
        S: [1, 1, 0, 1, 1, 0, 1],
        T: [undefined],
        U: [0, 1, 1, 1, 1, 1, 0],
        V: [0, 1, 1, 1, 1, 1, 0],
        W: [undefined],
        X: [undefined],
        Y: [1, 1, 0, 0, 1, 1, 0],
        Z: [1, 0, 1, 1, 0, 1, 1],
    },
    nums: {
        _0: [0, 1, 1, 1, 1, 1, 1],
        _1: [0, 1, 1, 0, 0, 0, 0],
        _1l: [0, 1, 1, 0, 0, 0, 0],
        _1r: [0, 0, 0, 0, 1, 1, 0],
        _2: [1, 0, 1, 1, 0, 1, 1],
        _3: [1, 0, 0, 1, 1, 1, 1],
        _4: [1, 1, 0, 0, 1, 1, 0],
        _5: [1, 1, 0, 1, 1, 0, 1],
        _6: [1, 1, 1, 1, 1, 0, 1],
        _7: [0, 0, 0, 0, 1, 1, 1],
        _8: [1, 1, 1, 1, 1, 1, 1],
        _9: [1, 1, 0, 1, 1, 1, 1],
    },

}

let facestate = {
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



process.on('SIGINT', function () {
    console.log("Stopping On Exit");
    //    leftMotor.stop()
    //    rightMotor.stop()
    //    motors.stop()
    j5Seg7.clear();
    process.exit();
});



board.on('ready', () => {

    j5Seg7.clear();

})
