function createHuze() {
  angleX += 0.01;
  angleY += 0.02;
  drawCube();
  requestAnimationFrame(animate);
}

createHuze();
