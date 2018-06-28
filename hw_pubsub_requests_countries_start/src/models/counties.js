const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');

const Counties = function(){

};

Counties.prototype.getData = function () {
  const url = 'https://restcountries.eu/rest/v2/all'
  const request = new Request(url);

  request.get((data)=>{
    PubSub.publish('Counties:sendData',data);
  })

};
