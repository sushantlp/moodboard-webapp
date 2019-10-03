const extractor = require('../extractor')
const router = require('express').Router()

router.get("/screenshot", async (req, res) => {
    try {
        const url = req.query.url
        const result = await extractor.getScreenshot(url)

        if (result.error) {
            res.status(400).send(result.error)
        }
        else {
            res.header('content-type', result.contentType)
                .send(result.data)
        }
    }
    catch (error) {
        res.sendStatus(500)
    }
})

router.get("/info", async (req, res) => {
    try {
        const url = req.query.url
        const result = await extractor.getInfo(url)

        if (result.error) {
            res.status(400).send(result.error)
        }
        else {
            res.send(result.data)
        }
    }
    catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router