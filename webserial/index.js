const button = document.querySelector('button');
const p = document.querySelector('p');
// const stripeLink = "https://buy.stripe.com/";
let linkOpened = false;

button.onclick = () => {
    getReader()
}

async function getReader() {
    port = await navigator.serial.requestPort({});
    await port.open({ baudRate: 230400 });

    while (port.readable) {

        const reader = port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // |reader| has been canceled.
                    break;
                }
                let t = new TextDecoder().decode(value.buffer)
                // console.log(t)
                if (window.origin.includes('localhost') && !linkOpened) {
                    window.open(t)
                    linkOpened = true
                }
            }
        } catch (error) {
            // Handle |error|...
        } finally {
            reader.releaseLock();
        }
    }
}