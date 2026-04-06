// DrawTriangle.js (c) 2012 matsuda
function main() {
  const canvas = document.getElementById("example");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let vec = new Vector3([2.25, 2.25, 0]);
  drawVector(vec, "red");
}

function resetCanvas(){
  const canvas = document.getElementById("example");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(vec, color){
  const canvas = document.getElementById("example");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.lineTo(canvas.width/2+vec.elements[0]*20, canvas.height/2-vec.elements[1]*20);
  ctx.stroke(); // Render the path
}

function handleDrawEvent(){
  resetCanvas();

  let x1 = document.getElementById("x1").value;
  let y1 = document.getElementById("y1").value;
  let x2 = document.getElementById("x2").value;
  let y2 = document.getElementById("y2").value;

  let vec1 = new Vector3([x1, y1, 0]);
  let vec2 = new Vector3([x2, y2, 0]);
  drawVector(vec1, "red");
  drawVector(vec2, "blue");
}

function handleDrawOperationEvent(){
  let op = document.getElementById("op").value;
  let scalar = document.getElementById("scalar").value;

  handleDrawEvent();
  let x1 = document.getElementById("x1").value;
  let y1 = document.getElementById("y1").value;
  let x2 = document.getElementById("x2").value;
  let y2 = document.getElementById("y2").value;

  let vec1 = new Vector3([x1, y1, 0]);
  let vec2 = new Vector3([x2, y2, 0]);

  switch (op) {
    case "multiply":
      vec1.mul(scalar);
      vec2.mul(scalar);
      drawVector(vec1, "green");
      drawVector(vec2, "green");
      break;
    case "divide":
      vec1.div(scalar);
      vec2.div(scalar);
      drawVector(vec1, "green");
      drawVector(vec2, "green");
      break;
    case "add":
      vec1.add(vec2);
      drawVector(vec1, "green");
      break;
    case "subtract":
      vec1.sub(vec2);
      drawVector(vec1, "green");
      break;
    case "magnitude":
      let m1 = vec1.magnitude();
      let m2 = vec2.magnitude();
      console.log("Magnitude v1: ", m1);
      console.log("Magnitude v2: ", m2);
      break;
    case "normalize":
      vec1.normalize();
      vec2.normalize();
      drawVector(vec1, "green");
      drawVector(vec2, "green");
      break;
    case "angle":
      let angle = Math.acos(Vector3.dot(vec1, vec2) / (vec1.magnitude()*vec2.magnitude())) * 180 / Math.PI;
      console.log("Angle: ", angle);
      break;
    case "area":
      let area = Vector3.cross(vec1, vec2).magnitude() / 2;
      console.log("Area: ", area);
      break;
  } 
}