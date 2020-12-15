
function connectToBle() {
  // Connect to a device by passing the service UUID
  blueTooth.connect("331a36f5-2459-45ea-9d95-6142f0c4b307", gotCharacteristics);
  console.log('trying to connect');
}


// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  console.log('looking for characteristics');
  if (error) { 
    console.log('error: ', error);
  }
  console.log('characteristics: ', characteristics);

  console.log(characteristics.length);
  if (characteristics.length != 3) {
    return;
  }
  for (let i=0; i<3; i++) {
    if (characteristics[i].uuid == 'a73e9a10-628f-4494-a099-12efaf72258f') {
      console.log('found tx');
      blueToothTXCharacteristic = characteristics[i];
      blueTooth.startNotifications(blueToothTXCharacteristic, TXgotValue, 'string');
      //blueToothTXCharacteristic.writeValue("something\r\n");
    }
    if (characteristics[i].uuid == 'a9da6040-0823-4995-94ec-9ce41ca28833') {
      console.log('found rx');
      blueToothRXCharacteristic = characteristics[i];
    }
    if (characteristics[i].uuid == '75a9f022-af03-4e41-b4bc-9de90a47d50b') {
      console.log('found mode');
      blueToothMODECharacteristic = characteristics[i];
    }
  }

  //blueTooth.startNotifications(blueToothRXCharacteristic, RXgotValue, 'string');
  //blueTooth.startNotifications(blueToothMODECharacteristic, ModegotValue, 'string');
  firstTime=true;
  isConnected = blueTooth.isConnected();
  connect_element = document.querySelector('#connectStatusID');
  connect_element.innerText = "Connected";
  //isConnected = true;
  timeinterval=millis();
  // Add a event handler when the device is disconnected

  blueTooth.onDisconnected(onDisconnected);
}


// A function that will be called once got values
function TXgotValue(value) {
  let blewaitTime = millis();
  while (millis()-blewaitTime <10) {
  }
  //timeinterval=millis();
  //var enc = new TextEncoder();
  //blueToothTXCharacteristic.writeValue(enc.encode(""));
  console.log('value: ', value);
  let splitString = split(value, ',');
  if (splitString[0] == "<#") {
    for (let i=0; i<16; i++) {
      if (splitString[i+1] >=0 && splitString[i+1]<=1023) {
        rawAnalogValues[i] = splitString[i+1];
      } else {
        return;
      }
    }
    if (rawAnalogValues[15] >=0 && rawAnalogValues[15] <=1023) {
      drawScreen();
    }
  }
}

//function RXgotValue(value) {
//  console.log('rxvalue: ', value);
//}

//function ModegotValue(value) {
//  console.log('modevalue: ', value);
//}

function onDisconnected() {
  connect_element = document.querySelector('#connectStatusID');
  connect_element.innerText = "Disconnected";

  blueTooth.stopNotifications(blueToothTXCharacteristic);
  console.log('Device got disconnected.');
  isConnected = false;
}
