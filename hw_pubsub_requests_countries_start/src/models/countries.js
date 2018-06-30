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
    PubSub.publish('Countries:sendAllCountries',data);
  });

};

Countries.prototype.selectCountry = function () {
  PubSub.subscribe('SelectView:change',(event)=>{
    const index = event.detail;
    const selectedCountry = this.countriesArray[index];
    PubSub.publish('Countries:selectedCountry', selectedCountry);
    this.selectBorder(selectedCountry);
  });

Countries.prototype.selectBorder = function (selectedCountry) {
  const borders = selectedCountry.borders.map((code)=>{
    return this.findMatchingCode(code);
  });
  PubSub.publish('Countries: selectedBorder', borders);

};



Countries.prototype.findMatchingCode = function (code) {
  let countryNames = [];
  this.countriesArray.forEach((country) => {
    if (country.alpha3Code === code){
      countryNames = country.name;
    }
  });
  console.log(countryNames);
  return countryNames;

};


};

module.exports = Countries;
