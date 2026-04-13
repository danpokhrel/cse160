var scale = 1;
var posx = 0; posy = 0;
var curShape = "triangle";
var shapeColor = [1, 1, 1];
var segmentCount = 5;
var shapes = []

function main() {
    gl = setupWebGL();
    if (!gl) {
        console.log("Failed to get WebGL context.");
        return -1;
    }

    colorUniform = bindShaders();
    
    updateRed();
    updateGreen();
    updateBlue();
    updateSize();
    updateSegments();

    paint();
}

function setupWebGL(){
    return document.getElementById("canvas").getContext('webgl', {preserveDrawingBuffer: true});
}

function bindShaders(){
    if (!initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER)) console.log("Failed to init shaders");

    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) console.log("Failed to create Buffer");

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let vertPosition = gl.getAttribLocation(gl.program, "u_Position");
    gl.vertexAttribPointer(vertPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertPosition);

    return(gl.getUniformLocation(gl.program, "u_Color"));
}

function clearCanvas() {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function render() {
    clearCanvas();
    for (let shape of shapes){
        shape.draw();
    }
}

function paint() {
    clearCanvas();
    let painting = new Painting(gl, colorUniform);
    painting.draw();
}

function drawShape(){
    shapes.push(new Shape(gl, colorUniform, curShape, posx, posy, scale, shapeColor, segmentCount));
    render();
}

function clearShapes(){
    shapes = [];
    clearCanvas();
}

function _onMouseMove(event){
    updateMousePos(event);
    if (event && (event.buttons & 1)) {
        drawShape();
    }
}

function updateMousePos(e){
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    posx = (x / rect.width) * 2 - 1;
    posy = -((y / rect.height) * 2 - 1);
}

function dmTriangles() {curShape = "triangle";}
function dmSquares() {curShape = "square";}
function dmCircles() {curShape = "circle";}

function updateRed() {
    shapeColor[0] = document.getElementById("redSlider").value/255;
}
function updateGreen() {
    shapeColor[1] = document.getElementById("greenSlider").value/255;
}
function updateBlue() {
    shapeColor[2] = document.getElementById("blueSlider").value/255;
}
function updateSize() {
    scale = document.getElementById("sizeSlider").value/100;
}
function updateSegments() {
    segmentCount = document.getElementById("segmentSlider").value;
}