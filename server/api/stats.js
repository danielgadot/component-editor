const audusdD1Data = require('./../database/audusd-d1.json');
const eurusdD1Data = require('./../database/eurusd-d1.json');
const data = {
    audusd: audusdD1Data,
    eurusd: eurusdD1Data,
}
const express = require('express');
const app = express();
const Slingshot = require('./../slingshot');

function calcAllCounts(candles) {
    let calculatedCountsCandles = [];
    candles.forEach((candle, index) => {
        let candlesAfterCandle = candles.slice(index + 1, candles.length - 1);
        let newCandle = candle.calculateCount(candle, candlesAfterCandle);
        // candles with count
        calculatedCountsCandles.push(newCandle);
    })
    return calculatedCountsCandles;
}

app.get('/stats/:pair/:ratio',(req, res, next) => {
    console.log('in route pair');
    
})
app.get('/', (req, res, next) => {
    console.log('params', req.query)
    let pairDb = data[req.query.pair]
    let candles = pairDb.map((candle, index) => 
        new Slingshot({
          ...pairDb[index],
            ratio: parseFloat(req.query.ratio),
            tradeNumber: req.query.tradeNumber
        })
    );
    let finalCandles = calcAllCounts(candles)
        .filter((candle) => candle.count > req.query.tradeNumber)

    res.send(finalCandles)

})



module.exports = app;