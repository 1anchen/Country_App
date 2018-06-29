const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');

const Countries = function(){
 this.countriesArray = [];
};

Countries.prototype.getData = function () {
  const url = 'https://restcountries.eu/rest/v2/all';
  const request = new Request(url);
  request.get((data)=>{
    this.countriesArray = data;
    PubSub.publish('Counties:sendData',data);
  });

};

Countries.prototype.selectCountry = function () {
  PubSub.subscribe('SelectView:change',(event)=>{
    const index = event.detail;
    const selectedCountry = this.countriesArray[index];
    PubSub.publish('Countries:selectedCountry', selectedCountry);
  });


};

module.exports = Countries;
