const look = {
    head: undefined,
    neck: undefined,
    d: 180,
    u: 90,
    range: {
      x: 90,
      y: 90,
        s: 2,
    },
    init: function(neckservo, headservo) {
        look.head = headservo;
        look.neck = neckservo;
    },
    up: function(speed, steps=1) {
//        look.neck.to(45, speed, steps);
        look.head.to(look.u, speed, steps);
    },
    down: function(speed, steps=1) {
//        look.neck.to(45, speed, steps);
        look.head.to(look.d, speed, steps);
    },
    left: function (speed,steps=1){
        look.neck.to(0,speed,steps);
    },
    right: function (speed,steps){
        look.neck.to(180,speed,steps);
    },
    middle: function (speed,steps){
        look.neck.to(90,speed,steps);
        look.head.to(90, speed, steps);
    },
    rndxy: function (speed,steps){
        look.neck.to(Math.floor((Math.random()*look.range.x)-look.range.s)+45);
        look.head.to(Math.floor((Math.random()*look.range.y)*look.range.s+1)+40);
    },
}

exports.look = look;
