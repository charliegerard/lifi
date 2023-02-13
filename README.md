# Li-Fi

Prototype of Li-Fi technology to send data via light using Arduino and JavaScript.

Demo transmitting a Stripe Payment Link via light:

![Demo transmitting a Stripe Payment Link via light](./demo-lifi-link.gif)

For more info, check out [my blog post](https://charliegerard.dev/blog/lifi).

## Material needed

- 2 [Arduino UNO](https://store.arduino.cc/products/arduino-uno-rev3)
- A [breadboard](https://www.adafruit.com/product/4539)
- [Jumper wires](https://www.adafruit.com/product/1956)
- A [10k resistor](https://www.adafruit.com/product/2784)
- A [Neopixel Jewel](https://www.adafruit.com/product/2858) (a standard LED will work too but you will need an extra resistor and the transmitter and receiver will have to be set up much closer as an LED is less bright than the Jewel).
- A [phototransistor](https://www.adafruit.com/product/2831)

Assembled following these schematics:

![Schematics showing the 2 Arduinos set up](https://res.cloudinary.com/devdevcharlie/image/upload/v1676255691/LiFi/Ingenious_Leelo-Juttuli_2_e7h6sn.png)

## How to run

### The JavaScript example

1. Change directory to the [./js folder](./js/)
2. Run `npm install`
3. Open 2 terminal windows, one for the transmitter and one for the receiver.
4. In the transmitter window:
    - Run `interchange install git+https://github.com/ajfisher/node-pixel -a uno --firmata` to install the correct firmware on the Arduino.
    - Run `node transmitter.js`
5. [Upload Firmata](https://docs.arduino.cc/hacking/software/FirmataLibrary) on the receiver board
6. Align the transmitter and receiver
7. Run `node transmitter.js` in the trasnmitter terminal window and in the other one, run `node receiver.js`.

If everything is working fine, letters should start printing in the receiver terminal window.

### The Arduino example

1. Change directory to the [./arduino folder](./arduino-example/)
2. Align the transmitter and receiver
3. Upload the receiver sketch on the Arduino set up to the phohotransistor
4. Upload the transmitter sketch on the Arduino set up to the NeoPixel Jewel
5. Open the serial monitor and letters should start printing

