let boxDim = 80;

function drawScreen() {
  boxDim = width/4;
  background(255);
  let valueIndex=0;
  for (let y=3; y>=0; y--) {
    for (let x=0; x<4; x++) {
      //stroke(0);
      noStroke();
      let redColor = int(map(rawAnalogValues[valueIndex], 0, 1023, 0, 255));
      let greenColor = int(map(rawAnalogValues[valueIndex], 0, 1023, 100, 0));
      fill(redColor, greenColor, 0);

      //fill(map(rawAnalogValues[valueIndex], 512, 1023, 0,255),map(rawAnalogValues[valueIndex], 0, 512, 255,0), 0);
      if (x>0 && x<3) {
        rect(600/4*x, 600/4*y+10, boxDim-2, boxDim-2);
      } else {
        rect(600/4*x, 600/4*y, boxDim-2, boxDim-2);
      }

      textAlign(CENTER, CENTER);

      fill(255);
      textSize(50);
      text(rawAnalogValues[valueIndex], 600/4*x+boxDim/2, 600/4*y+boxDim/2);
      valueIndex++;
    }
  }
}
