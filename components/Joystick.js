import { useEffect, useState } from "react";

export default function Joystick() {
  const [joyPos, setPos] = useState();
  // INITAL VALUES
  var joystickMin = 0;
  var joystickMax = 99; // total number of json objects in array
  var joystickPosition = joystickMin;
  var tiltReset;
  let device;

  useEffect(() => {
    if (!("hid" in navigator)) {
      console.log("WebHID is not available yet.");
    }

    navigator.hid.getDevices().then((devices) => {
      if (devices.length === 0) {
        console.log(
          `No HID devices selected. Press the "request device" button.`
        );
        return;
      }
      device = devices[0];
      console.log(
        `User previously selected "${device.productName}" HID device.`
      );
      console.log(`Now press "open device" button to receive input reports.`);
    });
  });
  //request device
  const requestDeviceButton = async (event) => {
    try {
      const filters = [{ vendorId: 1133, productId: 49685 }];

      [device] = await navigator.hid.requestDevice({ filters });
      if (!device) return;

      console.log(`User selected "${device.productName}" HID device.`);
      console.log(`Now press "open device" button to receive input reports.`);
    } finally {
      return;
    }
  };

  // open connection
  const openButton = async (event) => {
    if (!device) return;

    await device.open();
    console.log(`Waiting for user to press button...`);

    device.addEventListener("inputreport", (event) => {
      const { data, device, reportId } = event;

      // Handle only the Joystick
      if (device.productId !== 49685 && reportId !== 1133) return;

      //get input data
      const value = data.getUint16(0);
      var ch = value
        .toString(16)
        .match(/.{1,2}/g)
        .map(function (c) {
          return parseInt(c, 16);
        });

      //controls from input data - only using roll
      var controls = {
        roll: ((ch[1] & 0x03) << 8) + ch[0],
      };

      var roll = JSON.stringify(controls.roll) / 100;

      if (roll > 4 && roll < 6) {
        // joystickPosition = joystickPosition;
        tiltReset = true;
      }
      if (tiltReset === true) {
        if (roll > 9 && roll < 10.5) {
          increment(joystickPosition);
        }
        if (roll < 1 && roll > 0.5) {
          decrement(joystickPosition);
        }
      }
      console.log("Position: " + joystickPosition);
      console.log("Roll: " + roll);
    });
  };

  //close connection
  const closeButton = async (event) => {
    if (!device) return;

    await device.close();
    console.log(`connection closed`);
  };

  //increment upon joystick move
  const increment = () => {
    tiltReset = false;
    joystickPosition++;
    if (joystickPosition > joystickMax) {
      joystickPosition = joystickMin;
    }
    props.onChange(joystickPosition);
    return;
  };

  //decrement upon joystick move
  const decrement = () => {
    tiltReset = false;
    joystickPosition--;
    if (joystickPosition < joystickMin) {
      joystickPosition = joystickMax;
    }
    props.onChange(joystickPosition);
    return;
  };
  return <></>;
}
