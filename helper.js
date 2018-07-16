const agra_data = require("./jhansi_data.json");
const _ = require("lodash");
const axios = require("axios");

let array = [];
Object.keys(agra_data).map(key => {
  _.assign(agra_data[key], {
    phone: Number(key)
  });
  array.push(agra_data[key]);
});

array.forEach(item => {
  axios.post("http://localhost:3000/user/new", item).then(data => {
    console.log(data);
  });
});
