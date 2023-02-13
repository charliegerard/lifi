var five = require("johnny-five");
var board = new five.Board({ port: "/dev/cu.usbmodem21101" });
const SENSOR_PIN = "A0";
const THRESHOLD = 400;
const INTERVAL = 100;
let previousState;
let currentState;
let lightValue;
let detectionStarted = false;
let testString = "";
let decodedText = "";

board.on("ready", function () {
    var sensor = new five.Sensor(SENSOR_PIN);

    sensor.on("data", async function () {
        lightValue = this.value;
    })

    this.loop(10, () => {
        if (!detectionStarted) {
            decode();
        }
    })
});

const decode = () => {
    currentState = getLDRState(lightValue);

    if (!currentState && previousState) {
        detectionStarted = true;
        getByte();
    }

    previousState = currentState;
}

const getLDRState = (value) => {
    return value > THRESHOLD ? 1 : 0;
}

const getByte = async () => {
    await delay(INTERVAL * 1.5);

    for (var i = 0; i < 8; i++) {
        const newValue = getLDRState(lightValue)
        testString += newValue
        await delay(INTERVAL);
    }

    decodedText += convertBinaryToASCII(testString)
    process.stdout.write(convertBinaryToASCII(testString));
    testString = ""
    detectionStarted = false;
}

const convertBinaryToASCII = (str) => {
    var bits = str.split(" ");
    var text = [];

    for (i = 0; i < bits.length; i++) {
        text.push(String.fromCharCode(parseInt(bits[i], 2)));
    }
    return text.join("");
}

const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
