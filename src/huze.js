const canvas = document.getElementById('huze');
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

function drawPyramid() {
  context.clearRect(0, 0, width, height);
  const size = 100;

  const vertices = [
    { x: 0, y: -size / 2, z: 0 },
    { x: -size / 2, y: size / 2, z: -size / 2 },
    { x: size / 2, y: size / 2, z: -size / 2 },
    { x: size / 2, y: size / 2, z: size / 2 },
    { x: -size / 2, y: size / 2, z: size / 2 }
  ];

  const rotatedVertices = vertices.map(vertex => {
    const x = vertex.x * Math.cos(angleY) - vertex.z * Math.sin(angleY);
    const z = vertex.x * Math.sin(angleY) + vertex.z * Math.cos(angleY);
    const y = vertex.y * Math.cos(angleX) + z * Math.sin(angleX);
    return { x, y, z };
  });

  connectVertices(rotatedVertices, [1, 2, 3, 4, 1]);
  connectVertices(rotatedVertices, [0, 1, 2]);
  connectVertices(rotatedVertices, [0, 2, 3]);
  connectVertices(rotatedVertices, [0, 3, 4]);
  connectVertices(rotatedVertices, [0, 4, 1]);
}

function drawSphere() {
  context.clearRect(0, 0, width, height);
  const radius = 100;
  const segments = 50;

  context.beginPath();
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI;
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * (2 * Math.PI);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const rotatedX = x * Math.cos(angleY) - z * Math.sin(angleY);
      const rotatedZ = x * Math.sin(angleY) + z * Math.cos(angleY);
      const rotatedY = y * Math.cos(angleX) + rotatedZ * Math.sin(angleX);

      const screenX = rotatedX + width / 2;
      const screenY = rotatedY + height / 2;

      if (j === 0) {
        context.moveTo(screenX, screenY);
      }
      
      else {
        context.lineTo(screenX, screenY);
      }
    }
  }

  context.strokeStyle = '#000';
  context.stroke();
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
