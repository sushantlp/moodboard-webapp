/* eslint-disable require-atomic-updates */
const puppeteer = require('puppeteer');
var browser = ''
var chromiumEndpoint = ''
var numTargets = 0
var timeout = ""

async function getChromiumInstance() {
    if (!browser) {
        if (chromiumEndpoint) {
            console.log("Connecting to existing Chromium instance")
            browser = await puppeteer.connect(chromiumEndpoint)
            watchEvents(browser)
            return browser
        }
        console.log('Creating new instance of browser');
        browser = await puppeteer.launch({
            //dumpio: true,
            //headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--window-size=1024x768'
            ]
        });

        chromiumEndpoint = browser.wsEndpoint()
        watchEvents()
    }
    return browser;
}

function watchEvents() {
    browser.on('targetcreated', () => {
        console.log("targetcreated")
        numTargets += 1
        if (timeout) {
            console.log("Target created. Cancelling disconnection")
            clearTimeout(timeout)
            timeout = ""
        }
    })
    browser.on("disconnected", () => {
        console.log("Disconnected")
        browser = ""
        chromiumEndpoint = ""
    })
    browser.on('targetdestroyed', () => {
        console.log("targetdestroyed")
        numTargets -= 1
        if (numTargets == 0) {
            console.log("Closing chrome instance in 10 seconds")
            timeout = setTimeout(async () => {
                browser.close()
            }, 10000)
        }
    })
}

module.exports = getChromiumInstance