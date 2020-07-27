/**
 *  Intro
 * 
 *  Game made in pure javascript and HTML
 * 
 *  Game ideas:
 *      * Bow and arrow thing 
 *      * PHYSICS
 */

// CONSTS

const MAX_VELOCITY = 1.5;
const MAX_OBJECTS = 500;
const MOVEMENT_SPEED = 4;
const SHOT_TTL = 1500;
const SHOT_VEL = 4;
const GRAV = 9.81;
const PLAYER_SVG = new Path2D

// VARS

let frame = 0;
let fps = 0;
let kw = false, 
    ka = false, 
    ks = false, 
    kd = false;

let score = 0;
let hold = false; // holding mouse down
let mouseFrame = 0;
let mouseX  = 0,
    mouseY = 0;

let physicalObjects = [];
let shots = [];
let player;

// Init

let win = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = win.innerWidth || e.clientWidth || g.clientWidth,
    height = win.innerHeight || e.clientHeight || g.clientHeight;

width *= 0.85;
height *= 0.85;

let canvas = d.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.tabIndex = 1;

d.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

// Define object

let Shot = function(start, stop) {
    this.x = start[0]; this.y = start[1];
    let vec = normalizeVec(start, stop)
    this.xVel = SHOT_VEL*vec[0];
    this.yVel = SHOT_VEL*vec[1];
    this.width = 5; this.height = 5;
    this.isStuck = false;
    this.ttl = SHOT_TTL;

    this.nextFrame = function() {
        if(!this.isStuck) {
            this.yVel += GRAV / 250;
            this.x += this.xVel;
            this.y += this.yVel;
        }
        drawTail(this, 5);

        physicalObjects.forEach((obj, index) => {
            if(obj.isShootable) {
                if(obj.isRect) {
                    if(isIntersectingRect(this, obj)) {
                        obj.hit();
                        score++;
                        delInd(physicalObjects, index)
                    }
                }
                else {
                    if(isIntersectingCirc(this, obj)) {
                        obj.hit();
                        score++;
                        delInd(physicalObjects, index)
                    }
                }
            } else {
                if(isIntersectingRect(this, obj)) {
                    obj.hit();
                    obj.attached.push(this);
                    this.isStuck = true;
                }
            }
        })
    }
}

let PhysicalObject = function(x, y, w, h) {
    this.id = "";
    this.isShootable = true;
    this.isRect = false;
    this.isPlayer = false;
    this.isBalloon = false;
    this.isGhost = false;
    this.isFree = true;
    this.hit = function() {};

    this.hasGravity = false;

    this.x = x;      this.y = y;
    this.xVel = 0.0; this.yVel = 0.0;
    this.width = w;  this.height = h;

    this.attached = [];
    this.color = randomHex();

    this.addXVel = function(vel) {
        if (!(abs(this.xVel + vel) > MAX_VELOCITY)) { this.xVel += vel; }
        return this; }

    this.addYVel = function(vel) {
        if (!(abs(this.yVel + vel) > MAX_VELOCITY)) { this.yVel += vel; }
        return this; } 

    this.nextFrame = function() {
        if(this.isPlayer) {
            movePlayer();
        }
        if(this.isBalloon) {
            drawTail(this, 20);
        }
        if(this.hasGravity) {
            this.yVel += GRAV / 1000;
        }       

        if(!this.isGhost) {
            physicalObjects.forEach(obj => {
                if(!obj.isGhost && this.id !== obj.id) {
                    if(obj.isRect) {
                        if(isIntersectingRect(this, obj)) {
                            //console.log('hit', this.id, obj.id);
                            this.xVel = 0;
                            this.yVel = 0;
                        }
                    }
                    else {
                        if(isIntersectingCirc(this, obj)) {
                            this.xVel = 0;
                            this.yVel = 0;
                        }
                    }
                }
            })
        }

        if(this.isPlayer) {
            screenLoop(this);
        } else {
            if(this.x-this.width/2 < 0 || this.x+this.width/2 > width) {
                this.xVel = 0;
            }

            if(this.y-this.height/2 < 0 || this.y+this.height/2 > height) {
                this.yVel = 0;
            }
        }

        this.x += this.xVel;
        this.y += this.yVel;

        this.attached.forEach(obj => {
            obj.x += this.xVel;
            obj.y += this.yVel;
        })
    }
}

// Define rendering

function frameRender() {
    ctx.clearRect(0, 0, width, height);

    let grd = ctx.createLinearGradient(width/2, 0, width/2, height-50);
    grd.addColorStop(0, '#65DDEF');
    grd.addColorStop(1, '#C9F6FF');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#000000';
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score.toString(), 10, 50);
    ctx.fillText("Remaining: " + (MAX_OBJECTS-score).toString(), 10, 90);
    ctx.fillText("FPS: " + fps.toString(), width-150, 50 );

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
            
            fillCircle(obj);
        }


        obj.nextFrame();

    });

    shots.forEach((obj, index) => {

        if(obj.ttl === 0) {
            delInd(shots, index);
        } else {

            ctx.fillStyle = "brown";

            fillCircle(obj);

            obj.ttl -= 1;
            obj.nextFrame();
        }
    })

    // draw player

    ctx.save();
    ctx.translate(player.x+player.width/2, player.y+player.height/2);

    let rr = rad(normalizeVec([player.x, player.y], [mouseX, mouseY]));
    console.log(rr);
    let mm = -abs(rr) + 3 ;
    console.log(mm);
    
    ctx.rotate(rr);
    ctx.translate(-player.x-player.width/2, -player.y-player.height/2);
    
    ctx.fillText('👽', player.x, player.y)
    /*ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );*/
    ctx.restore();
    player.nextFrame();
}

function frameRenderLoop() {
    frame++;
    requestAnimationFrame(frameRenderLoop);
    frameRender();
}

function ffps() {
    let prev = frame;
    setTimeout(() => {
        fps = frame - prev;
        ffps();
    }, 1000)
}

function screenLoop(obj) {
    if (obj.x - (obj.width / 2)  > canvas.width)  obj.x = -obj.width / 2;
    if (obj.x + (obj.width / 2)  < 0)             obj.x = canvas.width + obj.width / 2;
    if (obj.y - (obj.height / 2) > canvas.height) obj.y = -obj.height / 2;
    if (obj.y + (obj.height / 2) < 0)             obj.y = canvas.height + obj.height / 2;
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

function random(min, max) {return Math.random() * (max - min) + min;}
function randomHex()      {return '#'+Math.floor(random(100, 16777215)).toString(16);}
function rad(vec)         {return Math.atan2(vec[1], vec[0]);}
function angle(rad)       {return rad * 180 / Math.PI;}
function abs(a)           {return Math.abs(a);}
function delObj(arr, el)  {arr.splice(arr.indexOf(el), 1);}
function delInd(arr, ind) {arr.splice(ind, 1);}
function stopObj(obj)     {obj.xVel = 0; obj.yVel = 0;}

function normalizeVec(pos1, pos2) {
    let dist      = [pos1[0] - pos2[0], pos1[1] - pos2[1]];
    let norm      = Math.sqrt( Math.pow(dist[0], 2) + Math.pow(dist[1], 2));
    let direction = [dist[0]/norm, dist[1]/norm];
    let vector    = [-direction[0]*Math.sqrt(2), -direction[1]*Math.sqrt(2)];
    return vector;
}

function isIntersectingRect(obj1, obj2) {
    return !((obj1.x)             > (obj2.x+obj2.width)  ||
             (obj1.x+obj1.width)  < (obj2.x)             ||
             (obj1.y)             > (obj2.y+obj2.height) ||
             (obj1.y+obj1.height) < (obj2.y))
}

function isIntersectingCirc(obj1, obj2) {
    let dx   = obj2.x - obj1.x;
    let dy   = obj2.y - obj1.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    return dist < obj1.width/2 + obj2.width/2;
}

function mouseClick(e) {
    hold = true;
    setMousePos(e);
    shoot();
}

function shoot() {
    shots.push(
        new Shot([player.x, player.y], [mouseX, mouseY])
    );
}

function setMousePos(e) {
    let pos = getCursorPosition(e);
    mouseX = pos[0];
    mouseY = pos[1];
}

function movePlayer() {
    if (kw) {player.y += -MOVEMENT_SPEED;}
    if (ka) {player.x += -MOVEMENT_SPEED;}
    if (ks) {player.y +=  MOVEMENT_SPEED;}
    if (kd) {player.x +=  MOVEMENT_SPEED;}

}

function mouseMove(e) {
    if(frame > mouseFrame && frame & 1) {
        setMousePos(e);
        mouseFrame = frame;
    }
}

function scroll() {
    shoot();
}

canvas.addEventListener('mousedown', mouseClick);
canvas.addEventListener('mouseup', () => {hold = false;});
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('keydown', onKeyDown);
canvas.addEventListener('keyup', onKeyUp);
document.addEventListener('wheel', scroll);


function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: kd = true; break;
        case 83: ks = true; break;
        case 65: ka = true; break;
        case 87: kw = true; break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: kd = false; break;
        case 83: ks = false; break;
        case 65: ka = false; break; 
        case 87: kw = false; break;
    }
}




















for(let i = 0 ; i < MAX_OBJECTS ; i++) {
    let temp = new PhysicalObject(width/2, height-40, 20, 20);
    temp.addXVel(random(-1, 1)).addYVel(random(-1.49, -1));
    temp.isBalloon = true;
    temp.isGhost = true;
    temp.id = "ballon" + i;
    physicalObjects.push(temp);
}

let box1 = new PhysicalObject(width/4, height/2, 60, 60);
box1.isRect = true;
box1.isShootable = false;
box1.hasGravity = true;
box1.id = "box1";
physicalObjects.push(box1);

let box2 = new PhysicalObject((width/4)+width/2, height/2, 60, 60);
box2.isRect = true;
box2.isShootable = false;
box1.id = "box2";
box2.hit = function() {
    box2.hasGravity = true;
}
physicalObjects.push(box2);

let box3 = new PhysicalObject(width/4 + 20, height/4, 60, 60);
box3.isRect = true;
box3.isShootable = false;
box3.hasGravity = true;
box3.id = "box3";
physicalObjects.push(box3);

let ground = new PhysicalObject(0, (height-50), width, 50);
let grndgrad = ctx.createLinearGradient(0, ground.y, 0, height);
grndgrad.addColorStop(0.4, 'DarkGreen');
grndgrad.addColorStop(1, 'Tan');
ground.color = grndgrad;
ground.isShootable = false;
ground.isRect = true;
ground.id = "ground";
physicalObjects.push(ground);

player = new PhysicalObject(100, 100, 20, 20);
player.color = "#000000";
player.isPlayer = true;
player.isRect = true;
player.id = "player";

// Start
frameRenderLoop();
ffps();