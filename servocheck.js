const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five')
// HOOK RPI
const board = new five.Board({
    io: new Raspi(),
    repl: false,
})


//CREATE SERVOS::
let neck_servo = new five.Servo({
    pin: 'P1-38',
    range: [0, 360],
    startAt: 45
});
let head_servo = new five.Servo({
    pin: 'P1-40',
    range: [0, 360],
    startAt: 45
});

// TRAP CTRL-C (REPL FALSE STUFF)
process.on('SIGINT', function () {
    console.log("Shutting Down");
    //    leftMotor.stop()
    //    rightMotor.stop()
    //    motors.stop()
    neck_servo.stop()
    head.stop()
    process.exit();
});



board.on('ready', () => {


neck_servo.sweep();
head_servo.sweep(2000);
//neck_servo.to(90);
//neck_servo.to(0,1500);
//neck_servo.to(0,1000);

})