/* 
Everything here is related to the seven segement Display. IC2.
J5=johnnyfive Seg7=7 Segment display matrix.

_A holds matrix numbers and alphabet data; basic draw functions

facestate is for animations of segment as face.
*/

const j5Seg7 = {
    init: function (five) {
        j5Seg7.matrix = new five.Led.Matrix({
            controller: "HT16K33",
            repl: false,
        });
        j5Seg7.matrix.on();
        //        return j5Seg7.matrix;
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

const faceConfig = {
    setto: 'pinguTalking',
    setFace: function (str) {
        if (this[str]) {
            this.setto = str;
//            console.log('success');
        } else {
            console.log('face does not exist');
        }
    },
    facestate: undefined,
    normie: function () {
        this.facestate.mouth.state = 0;
        this.facestate.eye.left.state = 3;
        this.facestate.eye.right.state = 3;
    },
    pretalk: function () {
        //thinking
        this.facestate.mouth.state = 1;
        this.facestate.eye.left.state = 3;
        this.facestate.eye.right.state = 3;
    },
    talkmain: function () {
        this.facestate.mouth.state = 4;
        this.facestate.eye.left.state = 3;
        this.facestate.eye.right.state = 3;
    },
    talkglitch: function () {
        this.facestate.mouth.state = 9;
        //                    this.facestate.eye.left.state = 3;
        //                    this.facestate.eye.right.state = 3;
    },
    lowerLeft: function () {
        this.facestate.eye.left.state = 2;
    },
    lowerRight: function () {
        this.facestate.eye.right.state = 2;
    },
    winkisLeft: function (eye = false) {
        if (eye) {
            this.facestate.eye.left.state = 4;
        } else {
            this.facestate.eye.right.state = 4;
        }

    },
    shoutingcrazy: function () {
        faceConfig.talkglitch();
        if (j5Seg7.rnd.bool()) {
            faceConfig.lowerLeft();
        } else {
            faceConfig.lowerRight();
        }

    },
    shoutinggonnacry: function () {
        faceConfig.talkglitch();
        faceConfig.winkisLeft(j5Seg7.rnd.bool());
    },

    shoutingblabbin: function () {
        if (j5Seg7.rnd.bool()) {
            faceConfig.shoutinggonnacry();
        } else {
            faceConfig.shoutingcrazy();
        }
    },

    rndLeftEye: function () {
        this.facestate.eye.left.state = j5Seg7.rnd.getRandomInt(this.facestate.eye.left.statedesc.length - 1);
    },
    rndRightEye: function () {
        this.facestate.eye.right.state = j5Seg7.rnd.getRandomInt(this.facestate.eye.left.statedesc.length - 1);
    },
    shouting: function () {
        faceConfig.talkglitch();
        faceConfig.rndLeftEye();
        faceConfig.rndRightEye();

    },
    pinguTalking: function () {
        if (j5Seg7.rnd.bool()) {
            faceConfig.normie();
        } else {

            if (j5Seg7.rnd.bool()) {
                faceConfig.shoutinggonnacry();
            } else {
                if (j5Seg7.rnd.bool()) {
                    faceConfig.shoutingcrazy();
                } else {
                    faceConfig.shoutingblabbin();
                }
            }
        }
    },

}

exports.j5Seg7 = j5Seg7;
exports._A = _A;
exports.faceConfig = faceConfig;
