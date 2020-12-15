
let blueToothRXCharacteristic;
let blueToothTXCharacteristic;
let blueToothMODECharacteristic;
let timeinterval=0;
let scanRateInterval = 0;
let blueTooth;//instance of the P5BLE
let isConnected = false;//if connected or not
let firstTime = false;
let textlog;

let rawAnalogValues = [16];

function setup() {


  blueTooth = new p5ble();
  let cnv = createCanvas(600, 600);
  cnv.position(0, 50);
  
  const connectButton = createButton('Connect');
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 15);

  //clearButton = createButton('Clear');
  //clearButton.position(15, 40);
  //clearButton.mousePressed(clearLog);

  connectStatus = createElement('p', '');
  connectStatus.id('connectStatusID');
  connectStatus.position(100, 5);
  connect_element = document.querySelector('#connectStatusID');
  connect_element.innerText = "Disconnected";
}

function draw() {
  if (millis()-timeinterval>200 && isConnected) {
    var enc = new TextEncoder();
    //blueToothTXCharacteristic.writeValue(enc.encode(""));
    //delay(100);
    blueToothRXCharacteristic.writeValue(enc.encode("scan\n"));
    timeinterval = millis();
    scanRateInterval = millis();
  }
  else
  if (millis()-scanRateInterval>50 && isConnected) {
    var enc = new TextEncoder();
    blueToothTXCharacteristic.writeValue(enc.encode(""));
    //delay(100);
    //blueToothRXCharacteristic.writeValue(enc.encode("scan\n"));
    scanRateInterval = millis();
  }
}
