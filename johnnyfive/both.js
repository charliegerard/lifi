var five = require("johnny-five");
// Arduino UNO
// var board = new five.Board({ port: "/dev/cu.usbmodem211201" });
const LED_PIN = 9;
const SENSOR_PIN = "A0";
const THRESHOLD = 480;
const PERIOD = 1300;
const string = "https://buy.stripe.com/test_dR6bLT5Ckaz2fWoeVZ";
const strLength = string.length;

// board.on("ready", async function () {
//     var led = new five.Led(LED_PIN);
//     while (true) {
//         for (var i = 0; i < strLength; i++) {
//             sendByte(string[i], led);
//         }
//         await sleep(1000)
//     }
// });

// 

var ports = [
    { id: "Uno", port: "/dev/cu.usbmodem211201" },
    { id: "Mega", port: "/dev/cu.usbserial-21130" }
];

var boards = new five.Boards(ports);

boards.on("ready", function () {
    var led = new five.Led(LED_PIN);
    // var sensor = new five.Pin(SENSOR_PIN);

    // to each initialized board.
    this.each(async function (board) {
        if (board.id === "Uno") {
            // for (var i = 0; i < strLength; i++) {
            //     sendByte(string[i], led);
            // }
            // await sleep(1000)
        } else if (board.id === "Mega") {

            var sensor = new five.Sensor(SENSOR_PIN);

            // var analog = new five.Pin("A0");

            // this.pinMode("A0", five.Pin.INPUT);

            // Query the analog pin for its current state.
            // analog.query(function (state) {
            //     console.log(state);
            // });

            sensor.on('data', function () {
                console.log(this.value)
            })


            // this.analogRead("A0", function (value) {
            //     console.log(value)
            // });
            // sensor.read(function (error, value) {
            //     console.log(value);
            //     // if (value > 350) {
            //     //     console.log('on')
            //     // } else {
            //     //     console.log('off')
            //     // }
            // });
            // sensor.on("data", function () {
            //     console.log(this.value)
            // })
            // sensor.on("change", function () {
            //     console.log(this.level);
            //     // if (this.level > 0.3) {
            //     //     console.log('on')
            //     // } else {
            //     //     console.log('off')
            //     // }
            // });
        }
    });
});

const sendByte = async (byte, led) => {
    led.off();
    await sleep(PERIOD);
    const bins = byte.charCodeAt(0).toString(2);

    for (var i = 0; i < 8; i++) {
        const ledState = bins[i];

        if (ledState === '1') {
            led.on();
            await sleep(PERIOD);
        } else {
            led.off();
            await sleep(PERIOD);
        }
    }

    led.on();
    await sleep(PERIOD);
}

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}