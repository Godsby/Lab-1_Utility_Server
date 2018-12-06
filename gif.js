const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.get('/gif/', (req, res) => {
  let choice = Object.values(req.query).toString();
  // console.log(choice);
  axios.get(`http://api.giphy.com/v1/gifs/search?api_key=IoeMgiI8tJBy67N7vhyI5ugUJzWge9MM&q=${choice}`)
    .then(response => {
      let gifObj = response.data.data;
      // console.log(gifObj);
      let value = Object.values(gifObj);
      // console.log(value);
      let output = [];
      let temp = [];
      let newTemp = [];
      getGifs(gifObj);

      function getGifs () {
        for(let i = 0; i < value.length; i++) {
          temp.push(value[i].user);
          // console.log(temp)
        }

        for (let j = 0; j < temp.length; j++) {
          if (!!temp[j]) {
            newTemp.push(Object.values(temp[j]));
          }
        }
        console.log(newTemp);

        for (let k = 0; k < newTemp.length; k++) {
          output.push(newTemp[k][1]);
          output.push(newTemp[k][2]);
        
        }
          console.log(output);
          
        // }
        //   if (newTemp.includes('.gif')) {
        //     output.push(newTemp);
        
        res.json(output);
      }
    })

})

app.get('/gif', (req, res) => {
  res.sendFile(__dirname + '/gif.html');
});

app.listen(port, () => {
  console.log('This is listening to PORT 3000.');
})
