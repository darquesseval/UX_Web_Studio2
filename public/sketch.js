// const fill = require("fill-range")

var socket
let engine
let world
let render

let connection
let circleChain
let angleLink

let gap;
let posX;
let posY;
let armY, tentacleY;

let bg, bell, tentacle, arm, mouth, fish_01, fish_02, fish_03, fish_04, fish_01_stunned, fish_02_stunned, fish_03_stunned, fish_04_stunned;
let bgX = 0;
let bgY = 0;
let bgScroll = true;

let fix1, fix2, fix3, fix4, fix5, fix6, fix7, fix8, fix9, fix10, fix11;
let arm1, tentacle1, arm2, tentacle2, arm3, tentacle3, arm4, tentacle4, arm5, tentacle5, tentacle6;
let arm1x, tentacle1x, arm2x, tentacle2x, arm3x, tentacle3x, arm4x, tentacle4x, arm5x, tentacle5x, tentacle6x;
let bellPhysics, bellH, bellW;
let armGap, tentacleGap;

let glowControl = 80;
let x = glowControl;
let negcount = false;
let glow = false;

let wW, wH;

let firstRun = true;
let sX;
let sXc;
let sY;
let sYc;
let sZ;
let sZc;

let stopG = false;
let stopR = false;
let stopL = false;
let stopS = false;

let i = 0;
let j;
let sound_started = false;

let fishCount;
let fishs = [];
let fish = [];
let fishX = [];
let fishXstart = [];
let fishY = [];
let fishDirChoice = [1, -1];
let fishDir = [];
let fishSpeed = [];
let fishFloatMax = [];
let fishFloat = [];
let fishFloatUp = [];
let fishW, fishH;

let fishStunned = [];

let jellyFloat = 0;
let jellyFloatUp = true;
let jellySpeed = 0.2;

let soundArm = false;
let soundTentacle = false;
let soundMove = false;

let arm_sound, move_sound, bg_sound, tentacle_sound;

function preload() {
    bg = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/background.png');
    bell = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/bell.png');
    tentacle = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/tentacle.png');
    arm = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm.png');
    mouth = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/mouth.png');
    arm_link = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm_link.png');
    bell_glow = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/bell_glow.png');
    tentacle_glow = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/tentacle_glow.png');
    arm_glow = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm_glow.png');
    mouth_glow = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/mouth_glow.png');
    arm_link_glow = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm_link_glow.png');
    fish_01 = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish1.png');
    fish_02 = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish2.png');
    fish_03 = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish3.png');
    fish_04 = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish4.png');
    fish_01_stunned = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish1_stunned.png');
    fish_02_stunned = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish2_stunned.png');
    fish_03_stunned = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish3_stunned.png');
    fish_04_stunned = loadImage('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish4_stunned.png');

    soundFormats('mp3');
    arm_sound = createAudio('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/audio/arm_sound.mp3');
    tentacle_sound = createAudio('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/audio/arm_sound.mp3');
    move_sound = createAudio('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/audio/move_fast.mp3');
    bg_sound = createAudio('https://immense-spire-13214-cd2f24de7dd2.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/audio/constant_sound.mp3');

}


function setup() {
    frameRate(30)
    background(0);
    cnv = createCanvas(windowWidth * 0.75, windowHeight * 0.875)
    cnv.position(windowWidth*0.125, windowHeight*0.06)
    socket = io.connect('https://fun-of-a-jellyfish-085bbbd48029.herokuapp.com')
    socket.on('forArm', stingingArms);
    socket.on('forTentacle', tentaclesTurn);
    socket.on('forMouth', mouthGlow);
    socket.on('forMouthStop', stopGlow);
    socket.on('forArmStop', stopStun);
    socket.on('forRight', rightMove);
    socket.on('forRightStop', stopMoveRight);
    socket.on('forLeft', leftMove);
    socket.on('forLeftStop', stopMoveLeft);
    engine = Matter.Engine.create();
    world = engine.world;
    posX = windowWidth * 0.75 / 2;
    posY = windowHeight * 0.875 * 0.4;
    bgY = windowHeight * 0.875 / -2
    bgX = windowHeight * 0.875 * -3

    bellW = windowWidth * 0.75 / 13 * 3.5;
    bellH = windowWidth * 0.75 / 10 * 1.75;
    gap = windowWidth * 0.75 / 10
    armGap = windowWidth * 0.75 / gap;
    tentacleGap = windowWidth * 0.75 / gap / 8;

    arm1x = -windowWidth * 0.75 / 40 * 3
    arm2x = -windowWidth * 0.75 / 40 * 1.5
    arm3x = +windowWidth * 0.75 / 40 * 0.25
    arm4x = +windowWidth * 0.75 / 40 * 2
    arm5x = +windowWidth * 0.75 / 40 * 3.75

    tentacle1x = -windowWidth * 0.75 / 40 * 3.25
    tentacle2x = -windowWidth * 0.75 / 40 * 1.5
    tentacle3x = -0
    tentacle4x = +windowWidth * 0.75 / 40 * 1.75
    tentacle5x = +windowWidth * 0.75 / 40 * 3.5
    tentacle6x = +windowWidth * 0.75 / 40 * 5.25

    sX = 0;
    sXc = 0;
    sY = 0;
    sYc = 0;
    sZ = 0;
    sZc = 0;

    wW = windowWidth * 0.75;
    wH = windowHeight * 0.875;

    fishW = wW / 23;
    fishH = wW / 40;

    tentacleY = posY - wW / 70;
    armY = posY - wW / 50;

    rectMode(CENTER);
    world.gravity.y = 0;

    arm1 = new Rope(posX + arm1x, armY, armGap, 9, fix1)
    arm2 = new Rope(posX + arm2x, armY, armGap, 9, fix2)
    arm3 = new Rope(posX + arm3x, armY, armGap, 9, fix3)
    arm4 = new Rope(posX + arm4x, armY, armGap, 9, fix4)
    arm5 = new Rope(posX + arm5x, armY, armGap, 9, fix5)

    tentacle1 = new Rope(posX + tentacle1x, tentacleY, tentacleGap, 70, fix6)
    tentacle2 = new Rope(posX + tentacle2x, tentacleY, tentacleGap, 70, fix7)
    tentacle3 = new Rope(posX + tentacle3x, tentacleY, tentacleGap, 70, fix8)
    tentacle4 = new Rope(posX + tentacle4x, tentacleY, tentacleGap, 70, fix9)
    tentacle5 = new Rope(posX + tentacle5x, tentacleY, tentacleGap, 70, fix10)
    tentacle6 = new Rope(posX + tentacle6x, tentacleY, tentacleGap, 70, fix11)

    bellPhysics = Matter.Bodies.trapezoid(posX + windowWidth * 0.75 / 35, posY - bellH / 3, bellW, bellH, 1, {
        isStatic: true
    })

    Matter.World.add(world, bellPhysics);
    world.gravity.y = 0.5

    fishCount = random(10, 30);
    for (j = 0; j < fishCount; j++) {
        fishs = [
            [fish_01, fish_01_stunned],
            [fish_02, fish_02_stunned],
            [fish_03, fish_03_stunned],
            [fish_04, fish_04_stunned]
        ];
        append(fish, random(fishs));
        append(fishXstart, random(windowWidth * 0.75 * 0.05, windowWidth * 0.75 * 0.95));
        append(fishY, random(windowHeight * 0.875 * 0.05, windowHeight * 0.875 * 0.95));
        append(fishDir, random(fishDirChoice));
        append(fishSpeed, random(0.01, 0.5))
        append(fishX, fishXstart[j]);
        append(fishStunned, false);
        append(fishFloatMax, random(fishH, fishH * 5))
        append(fishFloatUp, random([false, true]));
        append(fishFloat, 0)
    }

}

function draw() {
    if (keyIsPressed && sound_started == false) {
        bg_sound.loop()
        sound_started = true;
    }
    Matter.Engine.update(engine);
    background(0);
    image(bg, bgX, bgY, wH * 6.5, wH * 2);

    bgX += jellySpeed
    if (stopR == true && stopL == true) {
        if (bgScroll == true) {
            jellySpeed = -0.2
            if (bgX <= wH * -6.5 - wW) {
                bgScroll = false;
            }
        } else {
            jellySpeed = 0.2
            if (bgX >= 0) {
                bgScroll = true;
            }
        }
    }
    if (bgX <= wH * -6.5 - wW) {
        bgX = windowHeight * 0.875 * -3;
    } else if (bgX >= 0) {
        bgX = windowHeight * 0.875 * -3;
    }

    for (let k = 0; k < fishCount; k++) {
        push()
        scale(fishDir[k], 1)
        if (fishStunned[k] === false | stopS === true) {
            image(fish[k][0], fishX[k] * fishDir[k], fishY[k], fishW, fishH);
            if (fishX[k] < wW * -0.03) {
                fishDir[k] = 1;
            } else if (fishX[k] > wW * 1.03) {
                fishDir[k] = -1;
            }
            fishY[k] += sin(fishFloat[k]);
            if (fishFloatUp[k] == true) {
                fishFloat[k] += fishH / 70 * fishSpeed[k]
                if (fishFloat[k] >= fishFloatMax[k]) {
                    fishFloatUp[k] = false;
                }
            } else {
                fishFloat[k] -= fishH / 70 * fishSpeed[k]
                if (fishFloat[k] <= fishFloatMax[k] * -1) {
                    fishFloatUp[k] = true;
                }
            }
            fishX[k] = fishX[k] + (fishSpeed[k] * fishDir[k]);
        } else {
            image(fish[k][1], fishX[k] * fishDir[k], fishY[k], fishW, fishH);
        }
        pop()
    }

    if (glow == true) {
        for (let countx = x - 50; countx <= x; countx++) {
            push()
            fill(255, 0, 185, 5);
            noStroke()
            ellipse(posX - wW / 40 * 1.5 + wW / 40 * 2.5, posY - wW / 60 + wW / 40 * 4.25, countx * 1.5 ^ (countx * 0.75), countx * 2.8);
            pop()
        }
    }
    if (x >= glowControl + 45) {
        negcount = true;
    } else if (x <= glowControl) {
        negcount = false;
    }
    if (negcount == false && i % 5) {
        x++
    } else if (i % 5) {
        x = x - 1
    }
    i++
    if (glow == false) {
        image(mouth, posX - wW / 40 * 1.5, posY - wW / 60, wW / 40 * 5, wW / 40 * 8.5)
    } else {
        image(mouth_glow, posX - wW / 40 * 1.5, posY - wW / 60, wW / 40 * 5, wW / 40 * 8.5)
    }

    arm1.showArm();
    arm2.showArm();
    arm3.showArm();
    arm4.showArm();
    arm5.showArm();

    tentacle1.showTentacle();
    tentacle2.showTentacle();
    tentacle3.showTentacle();
    tentacle4.showTentacle();
    tentacle5.showTentacle();
    tentacle6.showTentacle();

    tentacle1.slowMotion();
    tentacle2.slowMotion();
    tentacle3.slowMotion();
    tentacle4.slowMotion();
    tentacle5.slowMotion();
    tentacle6.slowMotion();

    push()
    angleMode(RADIANS);
    translate(bellPhysics.position.x, bellPhysics.position.y);
    rotate(bellPhysics.angle);
    if (glow == false) {
        image(bell, 0 - bellW / 2, 0 - bellH * 0.6, bellW, bellH);
    } else {
        image(bell_glow, 0 - bellW / 2, 0 - bellH * 0.6, bellW, bellH);
    }
    pop()

    if (stopG === true) {
        sX = 0;
        sY = 0;
        sZ = 0;
        glow = false;
        glowControl = 80;
    }

    if (arm1.body.bodies[arm1.n - 1].velocity.x >= 75 |
            arm1.body.bodies[arm1.n - 1].velocity.y >= 75 |
            arm1.body.bodies[arm1.n - 1].velocity.x <= -75 |
            arm1.body.bodies[arm1.n - 1].velocity.y <= -75) {
                if(soundArm == false) {
        soundArm = true
        arm_sound.play()
    }
}
    if (tentacle1.body.bodies[tentacle1.n - 1].velocity.x >= 75 |
            tentacle1.body.bodies[tentacle1.n - 1].velocity.y >= 75 |
            tentacle1.body.bodies[tentacle1.n - 1].velocity.x <= -75 |
            tentacle1.body.bodies[tentacle1.n - 1].velocity.y <= -75) {
                if (soundTentacle == false) {
        soundTentacle = true
        tentacle_sound.play()
    }
}
    if (jellySpeed >= 13 || jellySpeed <= -13) {
        if(soundMove == false){
        soundMove = true
        move_sound.play()
    }
}

    arm_sound.onended(soundFinishedArm)
    tentacle_sound.onended(soundFinishedTentacle)
    move_sound.onended(soundFinishedMove)
}

function soundFinishedArm() {
    soundArm = false;
}

function soundFinishedTentacle() {
    soundTentacle = false;

}

function soundFinishedMove() {
    soundMove = false;
}

function stingingArms(dataSmartphone) {

    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    arm1.body.bodies[arm1.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + arm1x;
    arm1.body.bodies[arm1.n - 1].position.y = wH * 0.75 + sensitivityY;

    arm2.body.bodies[arm2.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + arm2x;
    arm2.body.bodies[arm2.n - 1].position.y = wH * 0.75 + sensitivityY;

    arm3.body.bodies[arm3.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + arm3x;
    arm3.body.bodies[arm3.n - 1].position.y = wH * 0.75 + sensitivityY;

    arm4.body.bodies[arm4.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + arm4x;
    arm4.body.bodies[arm4.n - 1].position.y = wH * 0.75 + sensitivityY;

    arm5.body.bodies[arm5.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + arm5x;
    arm5.body.bodies[arm5.n - 1].position.y = wH * 0.75 + sensitivityY;

    arm1.collision();
    arm2.collision();
    arm3.collision();
    arm4.collision();
    arm5.collision();

}

function stopStun(dataSmartphone) {
    if (dataSmartphone.stopStunning === true) {
        stopS = true;
    } else {
        stopS = false;
    }
}

function tentaclesTurn(dataSmartphone) {

    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    angleMode(DEGREES);
    tentacle1.body.bodies[tentacle1.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX;
    tentacle1.body.bodies[tentacle1.n - 1].position.y = wH * 0.75 + sensitivityY;

    tentacle2.body.bodies[tentacle2.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + tentacle2x;
    tentacle2.body.bodies[tentacle2.n - 1].position.y = wH * 0.75 + sensitivityY;

    tentacle3.body.bodies[tentacle3.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + tentacle3x;
    tentacle3.body.bodies[tentacle3.n - 1].position.y = wH * 0.75 + sensitivityY;

    tentacle4.body.bodies[tentacle4.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + tentacle4x;
    tentacle4.body.bodies[tentacle4.n - 1].position.y = wH * 0.75 + sensitivityY;

    tentacle5.body.bodies[tentacle5.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + tentacle5x;
    tentacle5.body.bodies[tentacle5.n - 1].position.y = wH * 0.75 + sensitivityY;

    tentacle6.body.bodies[tentacle6.n - 1].position.x = windowWidth * 0.75 / 2 + sensitivityX + tentacle6x;
    tentacle6.body.bodies[tentacle6.n - 1].position.y = wH * 0.75 + sensitivityY;

}

function mouthGlow(dataSmartphone) {
    stopG = false;
    console.log('X: ' + dataSmartphone.shakeX + ' / ' + sX + ' Y: ' + dataSmartphone.shakeY + ' / ' + sY + ' Z: ' + dataSmartphone.shakeZ + ' / ' + sZ);
    if (sX < 12) {
        if (dataSmartphone.shakeX < 0) {
            sX = dataSmartphone.shakeX * -1;
        } else {
            sX = dataSmartphone.shakeX
        }
    } else {
        sX = sX - 0.1
    }

    if (sY < 12) {
        if (dataSmartphone.shakeY < 0) {
            sY = dataSmartphone.shakeY * -1;
        } else {
            sY = dataSmartphone.shakeY
        }
    } else {
        sY = sY - 0.1
    }

    if (sZ < 12) {
        if (dataSmartphone.shakeZ < 0) {
            sZ = dataSmartphone.shakeZ * -1;
        } else {
            sZ = dataSmartphone.shakeZ
        }
    } else {
        sZ = sZ - 0.1
    }

    if (sX >= 12 || sY >= 12 || sZ >= 12) {
        glow = true;
        glowControl = 80 + (sX + sY + sZ) * 5;

    } else {
        glow = false;
        glowControl = 80
    }
}

function stopGlow(dataSmartphone) {
    if (dataSmartphone.stopGlowing === true) {
        stopG = true
    } else {
        stopG = false
    }
}

function rightMove(dataSmartphone) {
    if (dataSmartphone.shakeX >= 5 && dataSmartphone.shakeX > jellySpeed) {
        jellySpeed = dataSmartphone.shakeX
    } else if (jellySpeed > 0) {
        jellySpeed -= 1
    }


    tentacle1.cN.pointA.x += jellySpeed / 20
    tentacle2.cN.pointA.x += jellySpeed / 20
    tentacle3.cN.pointA.x += jellySpeed / 20
    tentacle4.cN.pointA.x += jellySpeed / 20
    tentacle5.cN.pointA.x += jellySpeed / 20
    tentacle6.cN.pointA.x += jellySpeed / 20
    arm1.cN.pointA.x += jellySpeed / 20
    arm2.cN.pointA.x += jellySpeed / 20
    arm3.cN.pointA.x += jellySpeed / 20
    arm4.cN.pointA.x += jellySpeed / 20
    arm5.cN.pointA.x += jellySpeed / 20
    bellPhysics.position.x += jellySpeed / 20
    posX += jellySpeed / 20
}

function leftMove(dataSmartphone) {

    if (dataSmartphone.shakeX <= -5 && dataSmartphone.shakeX < jellySpeed) {
        jellySpeed = dataSmartphone.shakeX
    } else if (jellySpeed < 0) {
        jellySpeed += 1
    }

    tentacle1.cN.pointA.x += jellySpeed / 20
    tentacle2.cN.pointA.x += jellySpeed / 20
    tentacle3.cN.pointA.x += jellySpeed / 20
    tentacle4.cN.pointA.x += jellySpeed / 20
    tentacle5.cN.pointA.x += jellySpeed / 20
    tentacle6.cN.pointA.x += jellySpeed / 20
    arm1.cN.pointA.x += jellySpeed / 20
    arm2.cN.pointA.x += jellySpeed / 20
    arm3.cN.pointA.x += jellySpeed / 20
    arm4.cN.pointA.x += jellySpeed / 20
    arm5.cN.pointA.x += jellySpeed / 20
    bellPhysics.position.x += jellySpeed / 20
    posX += jellySpeed / 20
}

function stopMoveRight(dataSmartphone) {
    if (dataSmartphone.stopMovingRight === true) {
        stopR = true
    } else {
        stopR = false
    }
}

function stopMoveLeft(dataSmartphone) {
    if (dataSmartphone.stopMovingLeft === true) {
        stopL = true
    } else {
        stopL = false
    }
}

class Rope {
    constructor(ropeX, ropeY, r, n, connectionName) {
        this.r = r;
        this.x = ropeX;
        this.y = ropeY;
        this.n = n;
        this.cN = connectionName;
        this.body = Matter.Composites.stack(this.x, this.y, 1, this.n, 0, this.r / 5, function (x, y) {
            return Matter.Bodies.circle(x, y, r * 2, {
                restitution: 0.9,
                density: 1,
                friction: 0.5,
            });
        })
        Matter.Composites.chain(this.body, 0, 0, 0, 0, {
            stiffness: 1,
            // damping: 0.5,
            length: Matter.Common.clamp(this.r * 4, this.r * 3.9, this.r * 4.1),
        });
        Matter.Composite.add(this.body, this.cN = Matter.Constraint.create({
            bodyB: this.body.bodies[0],
            pointB: {
                x: 0,
                y: this.r * -1
            },
            pointA: {
                x: this.body.bodies[0].position.x,
                y: this.body.bodies[0].position.y
            },
            stiffness: 1,
            // damping: 0.5,
        }));
        Matter.Composite.add(world, [
            this.body
        ]);

    }

    slowMotion() {

        this.body.timeScale = 0.6;

    }

    collision() {
        for (let l = 0; l < fishCount; l++) {
            for (let m = 0; m < this.n; m++) {
                if (fishX[l] < this.body.bodies[m].position.x + armGap &&
                    fishX[l] + fishW > this.body.bodies[m].position.x &&
                    fishY[l] < this.body.bodies[m].position.y + armGap &&
                    fishY[l] + fishH > this.body.bodies[m].position.y) {
                    fishStunned[l] = true;
                }
            }
        }

    }
    showTentacle() {
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            imageMode(CENTER);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle);
            fill(0, 0, 0, 0);
            noStroke();
            if (glow == false) {
                image(tentacle, 0, 0, this.body.bodies[f].circleRadius * 3, this.body.bodies[f].circleRadius * 3.5);
            } else {
                image(tentacle_glow, 0, 0, this.body.bodies[f].circleRadius * 3, this.body.bodies[f].circleRadius * 3.5);
            }
            pop();

            if (f > 0) {
                stroke(255);

                line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y + this.body.bodies[f].circleRadius, this.body.bodies[f].position.x, this.body.bodies[f].position.y - this.body.bodies[f].circleRadius);
            }
        }


        line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y - this.body.bodies[0].circleRadius);
    }
    showArm() {
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            imageMode(CENTER);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle + 90);
            fill(0, 0, 0, 0);
            noStroke();
            if (glow == false) {
                image(arm, 0, 0, this.body.bodies[f].circleRadius * 1.2, this.body.bodies[f].circleRadius * 1.2);
            } else {
                image(arm_glow, 0, 0, this.body.bodies[f].circleRadius * 1.2, this.body.bodies[f].circleRadius * 1.2);
            }
            pop();

            if (f > 0) {
                stroke(55, 255, 0)
                push()
                angleMode(RADIANS);
                imageMode(CENTER);
                translate(this.body.bodies[f - 1].position.x + (this.body.bodies[f].position.x - this.body.bodies[f - 1].position.x) / 2,
                    this.body.bodies[f - 1].position.y + (this.body.bodies[f].position.y - this.body.bodies[f - 1].position.y) / 2)
                angleLink = Math.atan2(this.body.bodies[f - 1].position.x - this.body.bodies[f].position.x, this.body.bodies[f - 1].position.y - this.body.bodies[f].position.y)
                rotate(-angleLink)
                let imgHeight = Math.sqrt(Math.pow(this.body.bodies[f].position.x - this.body.bodies[f - 1].position.x, 2) + (Math.pow(this.body.bodies[f].position.y - this.body.bodies[f - 1].position.y, 2)))
                if (glow == false) {
                    image(arm_link, 0, 0, this.body.bodies[f].circleRadius * 0.25, imgHeight * 0.75)
                } else {
                    image(arm_link_glow, 0, 0, this.body.bodies[f].circleRadius * 0.25, imgHeight * 0.75)
                }
                pop()
            }
        }
        push()
        translate(this.cN.pointA.x + (this.body.bodies[0].position.x - this.cN.pointA.x) / 2,
            this.cN.pointA.y + (this.body.bodies[0].position.y - this.cN.pointA.y) / 2)
        angleLink = Math.atan2(this.cN.pointA.x - this.body.bodies[0].position.x, this.cN.pointA.y - this.body.bodies[0].position.y)
        rotate(-angleLink);
        let imgHeightFirst = Math.sqrt(Math.pow(this.body.bodies[0].position.x - this.cN.pointA.x, 2) + (Math.pow(this.body.bodies[0].position.y - this.cN.pointA.y, 2)))
        if (glow == false) {
            image(arm_link, 0, 0, this.body.bodies[0].circleRadius * 0.25, imgHeightFirst * 0.75)
        } else {
            image(arm_link_glow, 0, 0, this.body.bodies[0].circleRadius * 0.25, imgHeightFirst * 0.75)
        }
        pop()
    }
}
