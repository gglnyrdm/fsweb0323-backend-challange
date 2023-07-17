const router = require('express').Router();

router.get('/', (req,res,next) => {
    res.json('router working as expected...')
})

router.get('/id', (req,res,next) => {
    res.json('router working as expected...')
})

router.post('/id', (req,res,next) => {
    res.json('router working as expected...')
})

router.delete('/id', (req,res,next) => {
    res.json('router working as expected...')
})
module.exports = router;