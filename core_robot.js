const _Defaults = {
    repl: true,
}
// CPU-Setup::
const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
    io: new Raspi(),
    repl: _Defaults.repl,
});
// 7 SegMent Faceplate::
const faceobj = require('/root/dev/node/robo/class/Face.js');
const Face = new faceobj.Face(five, 1);

// VOICE::
const voiceobj = require('/root/dev/node/robo/class/Voice.js');
const Voice = new voiceobj.Voice();
let rants = [
    'organisms have very limited senses',
    'humans cannot see the full spectrum of the universe',
    'when you see a heat camera',
    'what a time to be alive!',
];
// SERVOS::
const servoobj = require('/root/dev/node/robo/class/Servos.js');
const Servo = new servoobj.Servo(five);

// Refactor {do} = re().diffusion;
const convoobj = require('/root/dev/node/robo/conversation.js');
const convo = convoobj.diffusion;
// -=-=-=-=- Declaration End -=-=-=-=-=-

//console.log(convo);



// -=-=- REPL Access -=-=-

board.on('ready', () => {

    function rant() {
        Voice.say(rants[Math.floor(Face.rndInt(rants.length - 1))]);
    }

    function toggleMode() {
        Face.isShowingTime = !Face.isShowingTime;
    }

    function say(msg) {
        Voice.say(msg);
    }

    function sayTime() {
        
        let startnoise = convo.wakenoises;
        let spice = convo.outros;
        
        let zinger = spice[Math.floor(Math.floor(Face.rndInt(spice.length-1)))];
        let clearThroat = startnoise[Math.floor(Face.rndInt(startnoise.length-1))];
        
        Voice.say(`${clearThroat}, The Time Is ${Face.time(true)} , , , ${zinger}`);
        Face.isShowingTime = true;
        setInterval(function () {
            Face.isShowingTime = false;
        }, 2000);
    }
    
    function lookX(val){
        Servo.x.to(val);
    }
    
    function lookY(val){
        Servo.y.to(val);
    }


    function a(){
        say("papa");
    }
    
    function s(){
        say("what is a nigger?");
    }
    
    
    board.repl.inject({
        Face,
        Voice,
        rant,
        toggleMode,
        say,
        sayTime,
        lookX,
        lookY,
        Servo,
        a,
        s,
    });



});




// -=-=-=-=-=- SAMPLE EXECUTION::
// eventually some brain_object will form down here::
function CoreSetup() {
    Face.isShowingTime = false;
//    Face.isShowingTime = true;
    Face.rndEye();
    
    Voice.say("what a time to be A I ");
  
}


let stopLoop = false;
let frame_counter = 0;

function roboCycle() {
    frame_counter++;
    //reset Face things::
    Face.clear();
    
    let minuteTracker = Face.time().slice(3,5);
//    console.log(minuteTracker);
    
    
    // THIS IS THE ALARM PATTERN::
    if (minuteTracker == "00" && Voice.maySpeak && !stopLoop){
//        Voice.say(Face.time());
        stopLoop = true;
        Voice.say(`The Time Is ${Face.time(true)}`);
    }
    
    
    
    
    

    function rollIdolFace() {
        // 10th of the time::
        if (frame_counter % 10 == 0) {
            Face.eye.l.isWink = false;
            Face.eye.r.isWink = false;
            Face.mouth.hasSides = false;
            Face.mouth.isExtended = false;
        }
        // 1 second twitch/change face.
        if (frame_counter > 100) {
            // random switch setters::
            Face.rndEye();
            if (Face.rndbool()) {
                if (Face.rndbool()) {
                    Face.eye.l.isWink = Face.rndbool();
                } else {
                    Face.eye.r.isWink = Face.rndbool();
                }
            }
            Face.mouth.isHigh = Face.rndbool();
            Face.mouth.isExtended = Face.rndbool();
            Face.mouth.hasSides = Face.rndbool();
            frame_counter -= 100;
        }
    }
    rollIdolFace();

    Face.mouth.isSpeaking = Face.isShowingTime = false;
    Face.mouth.isSpeaking = Voice.lipsMoving;
    if (Face.mouth.isSpeaking) {
        Face.rndEye();
        Face.mouth.isHigh = Face.rndbool();
        Face.mouth.isExtended = Face.rndbool();
        Face.mouth.hasSides = Face.rndbool();

    }
    Face.tick();
}

CoreSetup();


//unsure how I want to handle this ultimately; timers suck.  tracking all time without a time sucks too.

setInterval(roboCycle, 1000 / 30);

setInterval(function(){
    Face.isShowingTime = !Face.isShowingTime;
},(1000*60)*2);


setInterval(function(){
    stopLoop = false;
},(1000*60)*10);

