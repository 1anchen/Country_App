const PubSub = require('../helpers/pub_sub');

const ResultView =function(container){
  this.container = container;

};

ResultView.prototype.bindEvents = function () {

  PubSub.subscribe('Countries:selectedCountry',(event)=>{
    const country= event.detail;
    this.container.innerHTML = "";
    this.displayCountry(country);
  });

  PubSub.subscribe('Countries: selectedBorder',(event) => {
    const border =event.detail;
    console.log(border);
    this.createElement('h3','Border Country',border);
  });



};

ResultView.prototype.displayCountry = function (country) {
  this.createElement( 'h3', 'Country Name', country.name);
  this.createElement( 'h4','Capital',country.capital);
  this.createElement( 'h4','Region',country.region);
  this.createImage('h4','Flag',country.flag);
};


ResultView.prototype.createElement = function (htmlElement,string,value) {
  const element = document.createElement(htmlElement);
  element.textContent = `${string}:${value}`;
  this.container.appendChild(element);
};

ResultView.prototype.createImage = function (htmlElement,string,url) {
  const element = document.createElement(htmlElement);
  const img = document.createElement('img');
  img.src = url;
  img.classList.add('flag');
  element.textContent = `${string}:`;
  this.container.appendChild(element);
  this.container.appendChild(img);
};


module.exports = ResultView;
