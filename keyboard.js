function keyPressed() {
  if (keyCode === ENTER) {
    var enc = new TextEncoder();
    blueToothRXCharacteristic.writeValue(enc.encode(commandInput.value()+"\n"));
  }

}
