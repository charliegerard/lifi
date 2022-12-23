const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
let cameraState = false;
// let text = "AAA";
let text = "https://buy.stripe.com/test_dR6bLT5Ckaz2fWoeVZ";
let transferFinished = false;

if (SUPPORTS_MEDIA_DEVICES) {
    navigator.mediaDevices.enumerateDevices().then(devices => {

        const cameras = devices.filter((device) => device.kind === 'videoinput');

        if (cameras.length === 0) {
            throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];

        // Create stream and get video track
        navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: camera.deviceId,
                facingMode: ['user', 'environment'],
                height: { ideal: 1080 },
                width: { ideal: 1920 }
            }
        }).then(stream => {
            const track = stream.getVideoTracks()[0];
            const bins = text2Binary(text);
            const splitText = bins.split('');

            setInterval(function () {
                splitText.map((b, i) => {
                    const delay = setTimeout(() => {

                        if (b === '1') {
                            track.applyConstraints({
                                advanced: [{ torch: true }]
                            });
                        } else if (b === '0') {
                            track.applyConstraints({
                                advanced: [{ torch: false }]
                            });
                        }
                        if (i === bins.length - 1) {
                            transferFinished = true
                        }
                    }, 100)
                })
            }, 1000)

            // if (transferFinished) {
            //     track.applyConstraints({
            //         advanced: [{ torch: false }]
            //     });
            //     transferFinished = false
            // }
        });
    });
}


// if ("AmbientLightSensor" in window) {
//     // const sensor = new AmbientLightSensor();
//     // console.log(sensor)

//     // sensor.addEventListener("reading", (event) => {
//     //     console.log("Current light level:", sensor.illuminance);
//     // });
//     // sensor.addEventListener("error", (event) => {
//     //     console.log(event.error.name, event.error.message);
//     // });
//     // sensor.start();

//     const sensor = new AmbientLightSensor();
//     sensor.onreading = () => console.log(sensor.illuminance);
//     sensor.onerror = event => console.log(event.error.name, event.error.message);
//     sensor.start();
// }

function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}

