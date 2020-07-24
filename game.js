/**
 * 
 *  Intro
 * 
 *  Game made in pure javascript and HTML
 * 
 *  Game ideas:
 *      * Bow and arrow thing
 * 
 *  Guides:
 *      * https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
 *      * https://www.graphitedigital.com/blog/build-your-own-basic-physics-engine-in-javascript
 * 
 */

// CONSTS

const MAX_VELOCITY = 1.5;
const MAX_OBJECTS = 500;
const MOVEMENT_SPEED = 1.5;
const SHOT_TTL = 750;
const SHOT_VEL = 4;
const GRAV = 9.81;

// VARS

let frame = 0;
let kw = false, 
    ka = false, 
    ks = false, 
    kd = false;

let score = 0;

// Init

let win = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = win.innerWidth || e.clientWidth || g.clientWidth,
    height = win.innerHeight || e.clientHeight || g.clientHeight;

width *= 0.90;
height *= 0.90;

var physicalObjects = [];
var shots = [];

let canvas = d.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.tabIndex = 1;

d.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

// Define object

let Shot = function(start, stop) {
    this.x = start[0];
    this.y = start[1];

    this.width = 5;
    this.height = 5;

    let vec = normalizeVec(start, stop)

    this.isStuck = false;

    this.xVel = SHOT_VEL*vec[0];
    this.yVel = SHOT_VEL*vec[1];

    this.ttl = SHOT_TTL;

    this.nextFrame = function() {
        if(!this.isStuck) {
            this.yVel += GRAV / 250;
        }

        this.x += this.xVel;
        this.y += this.yVel;

        drawTail(this, 5);

        physicalObjects.forEach(obj => {
            if(!(obj.isPlayer || !obj.isShootable)) {
                if(obj.isRect) {
                    if(isIntersectingRect(this, obj)) {
                        score++;
                        physicalObjects.splice(physicalObjects.indexOf(obj),1);
                    }
                }
                else {
                    if(isIntersectingCirc(this, obj)) {
                        score++;
                        physicalObjects.splice(physicalObjects.indexOf(obj),1);
                    }
                }
            } else if (!obj.isShootable) {
                if(isIntersectingRect(this, obj)) {
                    this.xVel = 0;
                    this.yVel = 0;
                    this.isStuck = true;
                }
            }
        })
    }
}

let PhysicalObject = function(x, y, w, h) {
    this.isPlayer = false;
    this.isShootable = true;
    this.isRect = false;

    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.xVel = 0.0;
    this.yVel = 0.0;

    this.color = randomHex();

    this.addXVel = function(vel) {

        if (!(abs(this.xVel + vel) > MAX_VELOCITY)) {
            this.xVel += vel;
        }

        return this;
    }

    this.addYVel = function(vel) {

        if (!(abs(this.yVel + vel) > MAX_VELOCITY)) {
            this.yVel += vel;
        }

        return this;
    } 

    this.nextFrame = function() {
        if(this.isPlayer) {
            movePlayer();
        } else {
            drawTail(this, 15);
        }

        this.x += this.xVel;
        this.y += this.yVel;

        if(this.isPlayer) {
            screenLoop(this);
        } else {
            if(this.x < 0 || this.x > width) {
                this.xVel = 0;
            }

            if(this.y < 0 || this.y > height) {
                this.yVel = 0;
            }
        }
    }
}

// Define rendering

function frameRender() {
    ctx.clearRect(0, 0, width, height);

    let grd = ctx.createLinearGradient(0, 0, 0, 170);
    grd.addColorStop(0, 'blue');
    grd.addColorStop(1, 'lightblue')

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score.toString(), 10, 50);
    ctx.fillText("Remaining: " + (MAX_OBJECTS-score+1).toString(), 10, 80);

    physicalObjects.forEach(obj => {

        ctx.fillStyle = obj.color;

        if (obj.isRect) {

            ctx.fillRect(
                obj.x,
                obj.y,
                obj.width,
                obj.height
            );
        } else {
            
            fillCircle(obj)
        }

        obj.nextFrame();
        //console.log(player.xVel, player.yVel);

    });

    shots.forEach(obj => {

        if(obj.ttl === 0) {
            shots.splice(shots.indexOf(obj), 1);
        } else {

            ctx.fillStyle = "#000000";
            /*ctx.fillRect(
                obj.x,
                obj.y,
                obj.width,
                obj.height
            );*/

            fillCircle(obj);

            obj.ttl -= 1;
            obj.nextFrame();
        }
    })
}

function frameRenderLoop() {

    requestAnimationFrame(frameRenderLoop);
    frameRender();
}



function screenLoop(obj) 
{    
    // Drifted off of right edge 
    if (obj.x - (obj.width / 2) > canvas.width)
        obj.x = -obj.width / 2;
    
    // Drifted off of left edge
    if (obj.x + (obj.width / 2) < 0)
        obj.x = canvas.width + obj.width / 2;
    
    // Drifted off of bottom edge 
    if (obj.y - (obj.height / 2) > canvas.height)
        obj.y = -obj.height / 2;
    
    // Drifted off of top edge
    if (obj.y + (obj.height / 2) < 0)
        obj.y = canvas.height + obj.height / 2;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomHex() {
    return '#'+Math.floor(random(0, 16777215)).toString(16);
}

function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y];
}

function drawTail(obj, length) {

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.moveTo(obj.x, obj.y);
    ctx.lineTo(obj.x - obj.xVel * length, obj.y - obj.yVel * length);
    ctx.stroke();
}

function fillCircle(obj) {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.width/2, 0,2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
}

function abs(a) {return Math.abs(a)}

function normalizeVec(pos1, pos2) {
    let dist      = [pos1[0] - pos2[0], pos1[1] - pos2[1]];
    let norm      = Math.sqrt( Math.pow(dist[0], 2) + Math.pow(dist[1], 2));
    let direction = [dist[0]/norm, dist[1]/norm];
    let vector    = [-direction[0]*Math.sqrt(2), -direction[1]*Math.sqrt(2)];
    return vector;
}

function isIntersectingRect(obj1, obj2) {
    return !((obj1.x-obj1.width/2)  > (obj2.x+obj2.width/2) ||
             (obj1.x+obj1.width/2)  < (obj2.x-obj2.width/2) ||
             (obj1.y-obj1.height/2) > (obj2.y+obj2.height/2) ||
             (obj1.y+obj1.height/2) < (obj2.y-obj2.height/2))
}

function isIntersectingCirc(obj1, obj2) {
    let dx = obj2.x - obj1.x;
    let dy = obj2.y - obj1.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    return dist < obj1.width/2 + obj2.width/2;
}

function mouseClick(e) {
    let pos = getCursorPosition(e);

    shots.push(
        new Shot([player.x, player.y], pos)
    );

}

function movePlayer() {
    if (kw) {player.y += -MOVEMENT_SPEED;}
    if (ka) {player.x += -MOVEMENT_SPEED;}
    if (ks) {player.y +=  MOVEMENT_SPEED;}
    if (kd) {player.x +=  MOVEMENT_SPEED;}

}

canvas.addEventListener('mousedown', mouseClick);
canvas.addEventListener('keydown', onKeyDown);
canvas.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: //d
        kd = true;
        break;
        case 83: //s
        ks = true;
        break;
        case 65: //a
        ka = true;
        break;
        case 87: //w
        kw = true;
        break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: //d
        kd = false;
        break;
        case 83: //s
        ks = false;
        break;
        case 65: //a
        ka = false;
        break;
        case 87: //w
        kw = false;
        break;
    }
}


















// Start
frameRenderLoop();

let rand = MAX_OBJECTS;

for(let i = 0 ; i < rand ; i++) {
    let temp = new PhysicalObject(width/2, height-20, 20, 20);
    temp.addXVel(random(-1, 1)).addYVel(random(-1.49, -1));
    physicalObjects.push(temp);
}

let ground1 = new PhysicalObject(0, height-20, width, 80)
ground1.isRect = true;
ground1.color = '#556B2F';
ground1.isShootable = false;

let ground2 = new PhysicalObject(0, height-10, width, 50)
ground2.isRect = true;
ground2.color = '#808000';
ground2.isShootable = false;

physicalObjects.push(
    ground1
)
physicalObjects.push(
    ground2
)

let player = new PhysicalObject(100, 100, 10, 10);
player.color = "#000000";
player.isPlayer = true;
player.isRect = true;
physicalObjects.push(player);
