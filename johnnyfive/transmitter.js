var five = require("johnny-five");
var pixel = require("node-pixel");
var board = new five.Board({ port: "/dev/cu.usbmodem11101" });
const INTERVAL = 100;
var strip = null;
// const string = "https://buy.stripe.com/test_dR6bLT5Ckaz2fWoeVZ";
const string = "Hello, world! ";
const strLength = string.length;

board.on("ready", async function () {
    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [{ pin: 7, length: 7 },],
        gamma: 2.8,
    });


    strip.on("ready", function () {
        strip.color('#fff');
        strip.show();
    });
    await delay(3000);

    sendBytes(strip);
});

const sendBytes = async (strip) => {
    for (var i = 0; i < strLength; i++) {
        strip.off();
        strip.show();
        await delay(INTERVAL);

        const bits = convertToBinary(string[i]);

        for (var y = 0; y < 8; y++) {
            const ledState = bits[y];

            if (ledState === '1') {
                strip.color('#fff');
                strip.show();
            } else {
                strip.off();
                strip.show();
            }
            await delay(INTERVAL);
        }

        strip.color('#fff');
        strip.show();
        await delay(INTERVAL);
    }
    await delay(INTERVAL);
    sendBytes(strip);
}

const convertToBinary = (string) => {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}