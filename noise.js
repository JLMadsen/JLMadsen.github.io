let win = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = win.innerWidth || e.clientWidth || g.clientWidth,
    height = win.innerHeight || e.clientHeight || g.clientHeight;

width = height;

let canvas = d.getElementById('canvas');
canvas.width = width-width*0.01;
canvas.height = height-height*0.01;

let ctx = canvas.getContext("2d");
d.body.appendChild(canvas);

let resolution = 100;
let classes = 1;

let cell_height = height / resolution;
let cell_width = cell_height;

let cells = []

function dec2hex(dec) {
    return Number(parseInt( dec , 10)).toString(16);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// greyscale
function float2color( percentage ) {
    var dec = 255 * percentage;
    var hex = Number(parseInt( dec , 10)).toString(16).substring(0,2);
    return "#" + hex + hex + hex;
}

let Cell = function(x, y, v) {

    this.x = x;
    this.y = y;
    this.value = v;

    this.color = function() {
        return float2color((this.value / classes * 100))
    }

}

function init(){
    cells = []
    for(let i=0; i<resolution; i++) {
        cells.push([])
        for(let j=0; j<resolution; j++) {
            
            let new_cell = new Cell(i, j, getRandomInt(classes));

            cells[i].push(new_cell);
        }
    }
}

function average(){
    let new_cells = []
    for(let i=0; i<resolution; i++) {
        new_cells.push([])
        for(let j=0; j<resolution; j++) {  
            
            let adjacent = [[-1,0],[0,-1],[1,0],[0,1]];
            let n = adjacent.length+1;
            let v = cells[i][j].value;

            adjacent.forEach(pos => {
                try {
                    v += cells[pos[0]][pos[1]].value;
                } catch(e) {
                    n--;
                }
            })

            new_cells[i].push(new Cell(i, j, Math.floor(v)%classes))
        }
    }
    return new_cells
}

function draw(){
    for(let i=0; i<resolution; i++) {
        for(let j=0; j<resolution; j++) {
            //if(i&1 && j&1) console.log(cells[i][j].color())
            ctx.fillStyle = cells[i][j].color()
            ctx.fillRect(
                cell_width*j,
                cell_height*i,
                cell_width,
                cell_height
            );
        }
    }
}

let iterations = 10;
let delay = 500

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    init()
    cells = average()
    draw()
    cells = null
    classes++;
}

render();
setInterval(render, delay);
