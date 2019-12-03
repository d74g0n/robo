const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five')
const board = new five.Board({
    io: new Raspi(),
    repl: false,
})


// construct Motors::
let leftMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M1)
let rightMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M2)

// create Motors::
let motors = new five.Motors([leftMotor, rightMotor])

// trap ctrl-c
process.on('SIGINT', function () {
    console.log("Stopping On Exit");
    leftMotor.stop()
    rightMotor.stop()
    motors.stop()
    process.exit();
});



board.on('ready', () => {

    function goForward(speed) {
        motors.forward(speed)
    }


    function stop() {
        motors.stop()
    }

    function goBackwards(speed) {
        motors.reverse(speed)
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

    function rM(speed = 50, time = 1000) {
        rightMotor.forward(speed);
        setTimeout(function () {
            rightMotor.stop()
        }, time);
    }

    function lM(speed = 50, time = 1000) {
        leftMotor.forward(speed);
        setTimeout(function () {
            leftMotor.stop()
        }, time);
    }


    function snare() {
        leftMotor.stop()
        setTimeout(function () {
            leftMotor.stop()
        }, 20);
        leftMotor.forward(30);

    }

    function bass() {
        rightMotor.stop()
        setTimeout(function () {
            rightMotor.stop()
        }, 20);
        rightMotor.forward(30);

    }

    function playMetro(speed=500) {

//        setInterval(snare, 1000);
//        setTimeout(function () {
//            setInterval(bass, 1000);
//        }, 500);
        setInterval(snare, speed*2);
        setTimeout(function () {
            setInterval(bass, speed*2);
        }, speed);
    }

    motors.stop();


})



