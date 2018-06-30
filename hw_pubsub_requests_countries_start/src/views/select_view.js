const PubSub = require('../helpers/pub_sub');

const SelectView = function(container){
  this.container = container;

};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:sendAllCountries',(event)=>{
    const countiesData = event.detail;
    this.populate(countiesData);
  });

  this.container.addEventListener('change', function (event) {
    PubSub.publish('SelectView:change', event.target.value);
  });

};

SelectView.prototype.populate = function (countiesData) {
  countiesData.forEach((country, index) => {
    const name = country.name;
    const indexNumber = index;
    this.createOption(name,indexNumber);
  });
};

SelectView.prototype.createOption = function (name, index) {
  const option = document.createElement('option');
  option.textContent= name;
  option.value = index;
  this.container.appendChild(option);

};



module.exports = SelectView;
