const moment = require("moment"); //-clock

class Face {
    constructor(five, brightness = 1) {
        this.brightness = brightness;
        this.matrix = new five.Led.Matrix({
            controller: "HT16K33",
        });
        this.matrix.brightness(this.brightness);
        this.clock = {
            timeColonVisible: true,
        }
        this.isShowingTime = true;
        this.eye = {
            l: {
                isWink: true,
                Xmatrix: 0,
                isOpen: false,
                isLow: true,
            },
            r: {
                isWink: true,
                Xmatrix: 4,
                isOpen: false,
                isLow: false,
            },
        };
        this.mouth = {
            isSpeaking: false,
            isHigh: false,
            MoffX: 0,
            isExtended: false,
            hasSides: false,
        };
        this.data = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
    }
    // -=-=-=-=-=- PROTOTYPE AREA:

    // CLOCK RELATED::
    parseTIME(str4) {
        for (let x = 0; x < 6; x++) {
            this.numberSelect(str4.slice(x, x + 1), x);
        }
    }

    numberSelect(val, x) {
        switch (val) {
            case ':':
                this.dots();
                break;
            case ' ':
                this.setDataCell(x, [0, 0, 0, 0, 0, 0, 0]);
                break;
            case '0':
                this.setDataCell(x, [0, 1, 1, 1, 1, 1, 1]);
                break;
            case '1':
                this.setDataCell(x, [0, 0, 0, 0, 1, 1, 0]);
                break;
            case '2':
                this.setDataCell(x, [1, 0, 1, 1, 0, 1, 1]);
                break;
            case '3':
                this.setDataCell(x, [1, 0, 0, 1, 1, 1, 1]);
                break;
            case '4':
                this.setDataCell(x, [1, 1, 0, 0, 1, 1, 0]);
                break;
            case '5':
                this.setDataCell(x, [1, 1, 0, 1, 1, 0, 1]);
                break;
            case '6':
                this.setDataCell(x, [1, 1, 1, 1, 1, 0, 1]);
                break;
            case '7':
                this.setDataCell(x, [0, 0, 0, 0, 1, 1, 1]);
                break;
            case '8':
                this.setDataCell(x, [1, 1, 1, 1, 1, 1, 1]);
                break;
            case '9':
                this.setDataCell(x, [1, 1, 0, 1, 1, 1, 1]);
                break;
            default:
                this.setDataCell(x, [0, 0, 0, 0, 0, 0, 0]);
                break;
        }
    }

    setDataCell(x, arr) {
        this.data[x] = arr;
    }

    showTime() {
        this.currentTime = this.time();
        this.parseTIME(this.currentTime);
    }

    time(showColon = true) {
        let display = "    " + moment().format(
            showColon ? "h:mm" : "h mm"
        );
        return display.slice(-5);
    }

    dots() {
        this.clock.timeColonVisible = !this.clock.timeColonVisible;
        this.matrix.led(4, 2, this.clock.timeColonVisible);
        this.matrix.led(5, 2, this.clock.timeColonVisible);
    };

    // EXPRESSION RELATED::

    addMouth() {
        //horz lines are O-mid?,3-bot,6-top
        if (this.mouth.isHigh) {
            this.mouth.MoffX = 6;
        } else {
            this.mouth.MoffX = 3;
        }

        //base mouth center;
        this.data[1][this.mouth.MoffX] = true;
        this.data[3][this.mouth.MoffX] = true;

        //        if (this.mouth.isSpeaking) {
        //MIDDLE MOUTH LINE FOR OPENS;
        this.data[1][0] = this.mouth.isSpeaking;
        this.data[3][0] = this.mouth.isSpeaking;

        if (this.mouth.isExtended) {
            //extended lr
            this.data[0][this.mouth.MoffX] = true;
            this.data[4][this.mouth.MoffX] = true;
            //base mouth center open;
            this.data[0][0] = true;
            this.data[4][0] = true;
        }

        if (this.mouth.hasSides && !this.mouth.isExtended && !this.mouth.isHigh) {
            this.data[1][2] = true;
            this.data[3][4] = true;
        }

        if (this.mouth.hasSides && this.mouth.isExtended && !this.mouth.isHigh) {
            this.data[0][2] = true;
            this.data[4][4] = true;
        }

        if (this.mouth.hasSides && !this.mouth.isExtended && this.mouth.isHigh) {
            this.data[1][1] = true;
            this.data[3][5] = true;
        }

        if (this.mouth.hasSides && this.mouth.isExtended && this.mouth.isHigh) {
            this.data[0][1] = true;
            this.data[4][5] = true;
        }

    }

    addLeftEye() {
        this.addEye(this.eye.l.Xmatrix, this.eye.l.isOpen, this.eye.l.isLow, this.eye.l.isWink);
    }

    addRightEye() {
        this.addEye(this.eye.r.Xmatrix, this.eye.r.isOpen, this.eye.r.isLow, this.eye.r.isWink);
    }

    addEye(c = 0, isOpen = false, isLow = false, isWink = false) {
        this.data[c][0] = true; //mid:
        if (isLow == false) {
            //            this.data[c][0] = false; //unset MID - without this looks like open eye without sides..
            this.data[c][6] = true; //china eye slit Top:
            if (isWink == false) {
                this.data[c][5] = true; //tl:
                this.data[c][1] = true; //tr:
            }
        } else {
            //            this.data[c][0] = false; //unset MID - without this looks like open eye without sides..            
            this.data[c][3] = true; //china eye slit Top:
            if (isWink == false) {
                this.data[c][4] = true; //tl:
                this.data[c][2] = true; //tr:
            }
        }
    }

    // CORE::

    setBrightness(val = 1) {
        this.brightness = val;
        this.matrix.brightness(this.brightness);
    }

    renderData(x, arr) {
        // this renders the this.DATA to this.MATRIX
        this.matrix.led(0, x, arr[0]); //top
        this.matrix.led(1, x, arr[1]); //tr
        this.matrix.led(2, x, arr[2]); //br
        this.matrix.led(3, x, arr[3]); //b
        this.matrix.led(4, x, arr[4]); //bl
        this.matrix.led(5, x, arr[5]); //tl
        this.matrix.led(6, x, arr[6]); //middle
    }

    drawFaceData() {
        this.renderData(0, this.data[0]);
        this.renderData(1, this.data[1]);
        //        this.renderData(2, this.data[2]);
        this.renderData(3, this.data[3]);
        this.renderData(4, this.data[4]);
    }

    tick() {
        this.clear();

        if (this.isShowingTime) {
            this.showTime();

        } else {
            this.addLeftEye();
            this.addRightEye();
            this.addMouth();
        }
        this.drawFaceData();
    }

    clear() {
        this.data = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

        this.matrix.led(4, 2, false);
        this.matrix.led(5, 2, false);
    }

    rndbool() {
        return Math.random() >= 0.5;
    }

    rndInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /*

        presetTrollFace() {
            this.mouth.MoffX = 3;
            this.data[1][this.mouth.MoffX] = true;
            this.data[3][this.mouth.MoffX] = true;
            this.data[1][this.mouth.MoffX - 3] = true;
            this.data[3][this.mouth.MoffX - 3] = true;
            this.data[0][this.mouth.MoffX] = true;
            this.data[4][this.mouth.MoffX] = true;
            this.data[0][this.mouth.MoffX - 3] = true;
            this.data[4][this.mouth.MoffX - 3] = true;
            this.data[0][6] = true;
            this.data[4][6] = true;
        }

    */
    rndEye() {
        if (true) {
            //        this.eye.l.isOpen = this.rndbool();
            this.eye.r.isWink = false;
            this.eye.l.isWink = false;
        }

        this.eye.l.isLow = this.rndbool();
        this.eye.l.isOpen = this.rndbool();
        this.eye.r.isLow = this.rndbool();
        this.eye.r.isOpen = this.rndbool();
    }

    rndMouth() {
        this.mouth.isHigh = this.rndbool();
        this.mouth.isExtended = this.rndbool();
        this.mouth.hasSides = this.rndbool();
    }

}

exports.Face = Face;
