
let blueToothRXCharacteristic;
let blueToothTXCharacteristic;
let blueToothMODECharacteristic;
let timeinterval=0;
let blueTooth;//instance of the P5BLE
let isConnected = false;//if connected or not
let firstTime = false;
let textlog;
function setup() {
  blueTooth = new p5ble();
  createCanvas(600, 600);
  const connectButton = createButton('Connect');
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 15);

  clearButton = createButton('Clear');
  clearButton.position(15, 40);
  clearButton.mousePressed(clearLog);

  connectStatus = createElement('p', '');
  connectStatus.id('connectStatusID');
  connectStatus.position(100, 25);
  connect_element = document.querySelector('#connectStatusID');
  connect_element.innerText = "Disconnected";

  textlog = createElement('p', '');
  textlog.id('textlogID');
  textlog.position(15, 50);

  commandInput = createInput('');
  commandInput.position(100, 15);

  //log_element = document.querySelector('#textlogID');
  //log_element.setAttribute('style', 'white-space: pre;');

  //document.body.appendChild(log_element);


  //textlog.text("test2");
}

function draw() {
  if (millis()-timeinterval>10 && isConnected) {
    var enc = new TextEncoder();
    //blueToothRXCharacteristic.writeValue(enc.encode("something\r\n"));
    //blueToothTXCharacteristic.writeValue(enc.encode(" "));
    if (firstTime) {
      blueToothTXCharacteristic.writeValue(enc.encode(""));
      //blueToothRXCharacteristic.writeValue(enc.encode("something\r\n"));
      //blueToothMODECharacteristic.writeValue(enc.encode("1"));
      //read();
      firstTime=false;
    } else {

      blueToothTXCharacteristic.writeValue(enc.encode(""));
      //console.log('trying to send');
    }

    timeinterval = millis();
  }
}
