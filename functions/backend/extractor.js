const URL = require('url').URL;

const getBrowser = require('./browser')

function parseURL(url) {
    try {
        return new URL(url);
    }
    catch (error) {
        console.error(error)
        return '';
    }
}

async function getInfo(url) {
    const blockedResources = [
        "image",
        "media",
        "font",
    ]
    
    var parsedURL = parseURL(url);

    if (!parsedURL || !parsedURL.protocol.startsWith('http')) {
        return { error: 'invalid_url' };
    }

    var page = ""
    var browser = ""
    var response = ""
    try {
        browser = await getBrowser();

        page = await browser.newPage();
        await page.setCacheEnabled(false);

        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (blockedResources.indexOf(request.resourceType()) != -1) {
                request.abort()
            }
            else {
                request.continue()
            }
        })

        response = await page.goto(url, {
            timeout: 25000,
            waitUntil: 'domcontentloaded'
        });

        if (response.ok()) {
            await page.waitFor(2000);
            const pageTitle = await page.title()
            const contentType = (response.headers()['content-type'] || response.request().resourceType());

            var type = '';
            var title = '';
            var description = '';
            var hostname = parsedURL.hostname;
            var preview = '';

            if (contentType.startsWith('text') || contentType == "document") {
                let evaluation = (await page.evaluate(() => {
                    let metaArray = []

                    metaArray = metaArray.concat(Array.from(document.querySelectorAll("head > meta[property]")).map(meta => {
                        let property = meta.attributes.getNamedItem('property').value
                        let value = meta.content
                        return {
                            property, value
                        }
                    }))
                        .concat(Array.from(document.querySelectorAll("head > meta[name]")).map(meta => {
                            let property = meta.attributes.getNamedItem('name').value
                            let value = meta.content
                            return {
                                property, value
                            }
                        }))
                        .concat(Array.from(document.querySelectorAll("head > title")).map(titleTag => {
                            return {
                                property: 'htmlTitle',
                                value: titleTag.textContent
                            }
                        }))
                        .concat(Array.from(document.querySelectorAll('link[rel=icon]')).map((link) => {
                            let property = 'favicon'
                            let value = link.href

                            return {
                                property, value
                            }
                        }))


                    return {
                        metaArray,
                    }
                }));

                let meta = {};

                evaluation.metaArray.forEach(entry => {
                    meta[entry.property] = entry.value
                })

                title = meta['og:title'] || meta['twitter:title'] || meta['title'] || meta['htmlTitle'] || pageTitle || url
                description = meta['og:description'] || meta['twitter:description']
                preview = meta["og:image"] || meta["twitter:image"] || ''
                type = meta['og:type'] || contentType;

                if (type == "text/html") {
                    type = "url"
                }

            }
            else if (contentType.startsWith("image")) {
                title = pageTitle
                description = ""
                preview = url
                type = "image"
            }
            else {
                console.log(`ContentType ${contentType} cannot be parsed`);
                title = url;
                description = url;
                type = contentType
            }

            if (preview && !preview.startsWith("http")) {
                preview = 'http://' + hostname + (preview.startsWith("/") ? preview : "/" + preview)
            }

            return {
                url,
                data: {
                    title,
                    description,
                    preview,
                    hostname,
                    type
                }
            };
        }
        else {
            console.error(`Error occurred: ${response.status()}`);
            return {
                error: response.status()
            };
        }
    }
    catch (error) {
        console.error(error)
        return {
            url: url,
            data: {
                title: url,
                hostname: parsedURL.hostname
            }
        }
    }
    finally {
        console.log('Closing page');
        if (page) {
            page.close();
        }
    }
}

async function getScreenshot(url) {
    var parsedURL = parseURL(url);
    var page = null;
    if (!parsedURL || !parsedURL.protocol.startsWith('http')) {
        return { error: 'invalid_url' };
    }

    try {
        const browser = await getBrowser();

        page = await browser.newPage();
        await page.setCacheEnabled(false);
        await page.setViewport({
            width: 1024,
            height: 768
        });
        const response = await page.goto(url, {
            timeout: 25000,
            waitUntil: 'networkidle0'
        });

        if (response.ok()) {
            const contentType = (response.headers()['content-type'] || response.request().resourceType());

            if (contentType.startsWith('text/html')) {
                console.log('Getting screenshot of webpage');
                return {
                    contentType: 'image/png',
                    data: await page.screenshot({
                        fullPage: true,
                        encoding: 'binary'
                    })
                };
            }
            else if (contentType.startsWith('image')) {
                console.log('Content is already an image', contentType);
                return {
                    contentType,
                    data: await response.buffer()
                };
            }
            else {
                console.log(`Content type not supported: ${contentType}`);
                return { error: `Content type not supported: ${contentType}` };
            }
        }
        else {
            console.error(`Error occurred: ${response.status()}`);
            return {
                error: response.status()
            };
        }
    }
    catch (error) {
        console.error(error);
        return {
            error: 'An error occured'
        };
    }
    finally {
        console.log('Closing page');
        if (page) {
            page.close();
        }
    }
}


module.exports = {
    getInfo,
    getScreenshot
}