const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
let cameraState = false;
// let text = "A";
// let text = "https://buy.stripe.com/test_dR6bLT5Ckaz2fWoeVZ";
let text = "Hello";
let transferFinished = false;
let button = document.querySelector('.switch');

const PERIOD = 1000;
let track;

function delayPromise() {
    return new Promise(resolve => {
        setTimeout(resolve, PERIOD);
    });
}

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
            track = stream.getVideoTracks()[0];
            const bins = text2Binary(text);
            const splitText = bins.split('').filter(s => s != ' ');

            // const splitText = ['0', '1', '0', '0', '0', '0', '0', '1']; // 'A'
            // const splitText = ['0', '1', '0', '1', '0', '1', '0', '1']; // 'A'

            button.addEventListener('click', () => {
                // track.applyConstraints({
                //     advanced: [{ torch: false }]
                // });

                // const mainTimeout = setTimeout(() => {
                splitText.map(async (b, i) => {

                    // Turn light off and delay 1s
                    const first = setTimeout(() => {
                        console.log('beep',)


                        const second = setTimeout(() => {
                            console.log('boop', i)
                        }, PERIOD * i + 1)

                    }, PERIOD * i);

                    // if (i % 8 === 0) {
                    //     const beginningTimeout = setTimeout(() => {
                    //         console.log('initial off', i)
                    //         //     //         // track.applyConstraints({
                    //         //     //         //     advanced: [{ torch: true }]
                    //         //     //         // });
                    //         clearTimeout(beginningTimeout);
                    //     }, PERIOD * i + 1);
                    // }

                    // const delay = setTimeout(() => {
                    //     console.log('every second 8 times', i)
                    //     // if (b === '1') {
                    //     //     track.applyConstraints({
                    //     //         advanced: [{ torch: true }]
                    //     //     });
                    //     // } else if (b === '0') {
                    //     //     track.applyConstraints({
                    //     //         advanced: [{ torch: false }]
                    //     //     });
                    //     // }

                    //     // if (i > 0 && (i + 1) % 8 === 0) {
                    //     //     //     transferFinished = true
                    //     //     const endTimeout = setTimeout(() => {
                    //     //         console.log('end pin high')
                    //     //         // track.applyConstraints({
                    //     //         //     advanced: [{ torch: true }]
                    //     //         // });
                    //     //         clearTimeout(mainTimeout);
                    //     //         clearTimeout(delay);
                    //     //         clearTimeout(endTimeout);
                    //     //     }, PERIOD)
                    //     // }

                    // }, PERIOD * i);


                    // if (i % 8 === 0) {

                    //     // if (i > 0 && i % 8 === 0) {
                    //     //     //     transferFinished = true
                    //     //     const endTimeout = setTimeout(() => {
                    //     //         console.log('end pin high')
                    //     //         // track.applyConstraints({
                    //     //         //     advanced: [{ torch: true }]
                    //     //         // });
                    //     //         clearTimeout(mainTimeout);
                    //     //         clearTimeout(delay);
                    //     //         clearTimeout(endTimeout);
                    //     //     }, PERIOD * i + 2)
                    //     // }

                    //     const beginningTimeout = setTimeout(() => {
                    //         console.log('initial off')
                    //         //     //         // track.applyConstraints({
                    //         //     //         //     advanced: [{ torch: true }]
                    //         //     //         // });
                    //     }, PERIOD * i)
                    // }
                    // const delay = setTimeout(() => {
                    //     console.log('every second 8 times', i)
                    //     // if (b === '1') {
                    //     //     track.applyConstraints({
                    //     //         advanced: [{ torch: true }]
                    //     //     });
                    //     // } else if (b === '0') {
                    //     //     track.applyConstraints({
                    //     //         advanced: [{ torch: false }]
                    //     //     });
                    //     // }

                    //     // if (i > 0 && i % 8 === 0) {
                    //     //     //     transferFinished = true
                    //     //     const endTimeout = setTimeout(() => {
                    //     //         console.log('end pin high')
                    //     //         // track.applyConstraints({
                    //     //         //     advanced: [{ torch: true }]
                    //     //         // });
                    //     //         clearTimeout(mainTimeout);
                    //     //         clearTimeout(delay);
                    //     //         clearTimeout(endTimeout);
                    //     //     }, PERIOD)
                    //     // }

                    // }, PERIOD * i + 1);


                    // const delay = setTimeout(() => {
                    //     console.log('every second 8 times', i)
                    //     // if (b === '1') {
                    //     //     track.applyConstraints({
                    //     //         advanced: [{ torch: true }]
                    //     //     });
                    //     // } else if (b === '0') {
                    //     //     track.applyConstraints({
                    //     //         advanced: [{ torch: false }]
                    //     //     });
                    //     // }

                    //     // if (i > 0 && i % 8 === 0) {
                    //     //     //     transferFinished = true
                    //     //     const endTimeout = setTimeout(() => {
                    //     //         console.log('end pin high')
                    //     //         // track.applyConstraints({
                    //     //         //     advanced: [{ torch: true }]
                    //     //         // });
                    //     //         clearTimeout(mainTimeout);
                    //     //         clearTimeout(delay);
                    //     //         clearTimeout(endTimeout);
                    //     //     }, PERIOD)
                    //     // }

                    // }, PERIOD * i + 1);

                });
                // }, PERIOD);
            })
        });
    });
}

const setLightOff = () => {
    // track.applyConstraints({
    //     advanced: [{ torch: false }]
    // });
    return new Promise(resolve => {
        setTimeout(resolve, PERIOD);
    });
}

const sendBytes = () => {

}

const test = () => {
    console.log('every second')
}




const noop = () => { };

const requestTimeout = (fn, delay, registerCancel) => {
    const start = new Date().getTime();

    const loop = () => {
        const delta = new Date().getTime() - start;

        if (delta >= delay) {
            fn();
            registerCancel(noop);
            return;
        }

        const raf = requestAnimationFrame(loop);
        registerCancel(() => cancelAnimationFrame(raf));
    };

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
};

let cancel = noop;
const registerCancel = fn => cancel = fn;


// if ("AmbientLightSensor" in window) {
//     // const sensor = new AmbientLightSensor();
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

// navigator.permissions.query({ name: 'ambient-light-sensor' }).then(result => {
//     if (result.state === 'denied') {
//         console.log('Permission to use ambient light sensor is denied.');
//         return;
//     }

//     const als = new AmbientLightSensor({ frequency: 10 });
//     als.addEventListener('activate', () => console.log('Ready to measure EV.'));
//     als.addEventListener('error', event => console.log(`Error: ${event.error.name}`));
//     als.addEventListener('reading', () => {
//         // Defaut ISO value.
//         const ISO = 100;
//         // Incident-light calibration constant.
//         const C = 250;

//         let EV = Math.round(Math.log2((als.illuminance * ISO) / C));
//         console.log(`Exposure Value (EV) is: ${EV}`);
//     });

//     als.start();
// });

function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}



