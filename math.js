const express = require('express');
const app = express();
const port = 3000;

app.get('/math/:operator', (req, res) => {
  const operator = req.params.operator;
  let mathObj = {};
  const query = req.query;
  mathObj.input = query;
  let values = Object.values(query);

  if (values.length === 2) {
    twoParams(operator);
  } else if (operator === 'multiply') {
    moreParams(values);
  } else {
    res.send('Math not defined, Please check your input');
  }

  function twoParams (input) {
    if (input === 'add') {
      mathObj.sumString = `${values[0]} + ${values[1]}`;
      mathObj.sum = parseInt(values[0]) + parseInt(values[1]);
      res.send(mathObj);
    } else if (input === 'subtract') {
      mathObj.subString = `${values[0]} - ${values[1]}`;
      mathObj.subtract = parseInt(values[0]) - parseInt(values[1]);
      res.send(mathObj);
    } else if (input === 'divide') {
      mathObj.divString = `${values[0]} / ${values[1]}`;
      mathObj.divide = parseInt(values[0]) / parseInt(values[1]);
      res.send(mathObj);
    } else if (input === 'multiply') {
      mathObj.multiString = `${values[0]} * ${values[1]}`;
      mathObj.multi = parseInt(values[0]) * parseInt(values[1]);
      res.send(mathObj);
    } else {
      res.send('Math not defined, Please check your input');
    }
  }

  function moreParams (input) {
    let value1 = '';
    let value2 = 1;
    input.forEach(el => {
      value1 += ' * ' + el;
      value2 *= parseInt(el);
    })
    value1 = value1.slice(3);
    mathObj.productString = value1;
    mathObj.product = value2;
    res.send(mathObj);
  }
  
});

app.get('/math', (req, res) => {
  res.sendFile(__dirname + '/math.html');
});

app.get('/*', (req, res) => {
  res.status(404).sendFile(__dirname + '/404.html')
});

app.listen(port, () => {
  console.log('You are listening to PORT 3000');
});