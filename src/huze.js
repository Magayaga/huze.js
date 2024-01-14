const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let angleX = 0;
let angleY = 0;

function drawCube() {
  context.clearRect(0, 0, width, height);
  const size = 100;
  
  const vertices = [
    { x: -size / 2, y: -size / 2, z: -size / 2 },
    { x: size / 2, y: -size / 2, z: -size / 2 },
    { x: size / 2, y: size / 2, z: -size / 2 },
    { x: -size / 2, y: size / 2, z: -size / 2 },
    { x: -size / 2, y: -size / 2, z: size / 2 },
    { x: size / 2, y: -size / 2, z: size / 2 },
    { x: size / 2, y: size / 2, z: size / 2 },
    { x: -size / 2, y: size / 2, z: size / 2 },
  ];

  const rotatedVertices = vertices.map(vertex => {
    const x = vertex.x * Math.cos(angleY) - vertex.z * Math.sin(angleY);
    const z = vertex.x * Math.sin(angleY) + vertex.z * Math.cos(angleY);
    const y = vertex.y * Math.cos(angleX) + z * Math.sin(angleX);
    return { x, y, z };
  });

  // Connect the vertices to form the cube
  connectVertices(rotatedVertices, [0, 1, 2, 3, 0]);
  connectVertices(rotatedVertices, [4, 5, 6, 7, 4]);
  connectVertices(rotatedVertices, [0, 4]);
  connectVertices(rotatedVertices, [1, 5]);
  connectVertices(rotatedVertices, [2, 6]);
  connectVertices(rotatedVertices, [3, 7]);
}

function connectVertices(vertices, indices) {
  context.beginPath();
  for (let i = 0; i < indices.length; i++) {
    const vertex = vertices[indices[i]];
    const x = vertex.x + width / 2;
    const y = vertex.y + height / 2;
    context.lineTo(x, y);
  }
  context.closePath();
  context.stroke();
}
