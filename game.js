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

    this.xVel = SHOT_VEL*vec[0];
    this.yVel = SHOT_VEL*vec[1];

    this.ttl = SHOT_TTL;

    this.nextFrame = function() {
        this.yVel += GRAV / 250;

        this.x += this.xVel;
        this.y += this.yVel;

        physicalObjects.forEach(obj => {
            if(!obj.isPlayer) {
                if(isIntersecting(this, obj)) {
                    score++;
                    physicalObjects.splice(physicalObjects.indexOf(obj),1);
                }
            }
        })
    }
}

let PhysicalObject = function(x, y, w, h) {
    this.isPlayer = false;
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
        }

        this.x += this.xVel;
        this.y += this.yVel;

        if(this.isPlayer) {
            screenLoop(this);
        }
    }
}

// Define rendering

function frameRender() {
    ctx.clearRect(0, 0, width, height);

    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score.toString(), 10, 50);

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

// Start

frameRenderLoop();

let rand = MAX_OBJECTS;

for(let i = 0 ; i < rand ; i++) {
    let temp = new PhysicalObject(width/2, height, 20, 20);
    temp.addXVel(random(-1, 1)).addYVel(random(-2, -0.5));
    physicalObjects.push(temp);
}

let player = new PhysicalObject(100, 100, 10, 10);
player.color = "#000000";
player.isPlayer = true;
player.isRect = true;
physicalObjects.push(player);


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

// TODO: draw a tail, so its like a arrow or something ¯\_(ツ)_/¯
function drawTail(shot) {

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

function isIntersecting(obj1, obj2) {
    return !((obj1.x-obj1.width/2) > (obj2.x+obj2.width/2) ||
             (obj1.x+obj1.width/2) < (obj2.x-obj2.width/2) ||
             (obj1.y-obj1.height/2) > (obj2.y+obj2.height/2) ||
             (obj1.y+obj1.height/2) < (obj2.y-obj2.height/2))
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
    if (ks) {player.y += MOVEMENT_SPEED;}
    if (kd) {player.x += MOVEMENT_SPEED;}

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