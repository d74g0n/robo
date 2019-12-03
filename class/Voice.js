//https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
// refactor this:: take out alt voice or something i dunno.
class Voice {
    constructor() {
        this.child = undefined;
        this.lipsMoving = false;
        this.maySpeak = true;
        this.init();
        this.voiceIndex = 0;
        this.syncTimeMS = 1000;
    }

    say(msg) {

        if (this.maySpeak) {

            let vis = this;

            setTimeout(function () {

                vis.lipsMoving = true;

            }, this.syncTimeMS * 1);


            this.maySpeak = false; // <= block the door 
            if (this.voiceIndex === 0) {
                // using festival::
                // this.child = this.shellout.spawn(`echo "${msg}" | festival --pipe --tts`, {
                this.child = this.shellout.spawn(`echo "${msg}" | festival --tts`, {
                    //                this.child = this.shellout.spawn(`fortune | festival --tts`, {
                    // this.child = this.shellout.spawn(`ls`, {
                    stdio: 'inherit',
                    shell: true,
                });
            } else {
                // use google_speech say() command in bash::
                // experiencing issues::
                this.child = this.shellout.spawn(`say "${msg}"`, {
                    //                    stdio: 'inherit',
                    shell: true,
                });
            }


            this.child.on('exit', function (code, signal) {
                //  exit event - mouth open related::
                vis.lipsMoving = false;
                vis.maySpeak = true; // <= Open the door 
                //  console.log(`code: ${code}, signal: ${signal}`);
            });

            //            this.child.on('',function(){});
            this.child.on('error', function (err) {
                console.log(err);
                console.log(`Event Error ^^^`);
            });

            this.child.on('disconnect', function (msg) {
                vis.lipsMoving = false;
                vis.maySpeak = true;
                //                console.log(msg);
                //                console.log(`EVENT disco^`);
            });

            this.child.on('close', function (msg, two) {
                vis.lipsMoving = false;
                vis.maySpeak = true;
                //                console.log(msg);
                //                console.log(two);
                //                console.log(`EVENT close^`);
            });

            //            this.child.on('message', function (msg) {
            //                console.log(msg);
            //
            //                console.log(`EVENT message^`);
            //            });
//            this.syncTimeMS = 2750;

        } else {

            console.log(`voice.say(${msg}) lost to => maySpeak:${this.maySpeak} || TALK BLOCKED`);
            this.lostMsg = msg;
        }

    }

    init() {
        this.shellout = require(`child_process`);
    }


}


exports.Voice = Voice;

// let test = new Voice();
// test.say('I am a good roe bot');
