const Countries = require('./models/Countries');
const SelectView = require('./views/select_view');
const ResultView = require('./views/result_view');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const countries = new Countries();
  countries.getData();

  const selectionField = document.querySelector('#countries');
  const selectView = new SelectView(selectionField);
  selectView.bindEvents();

  countries.selectCountry();

  const container = document.querySelector('#country');
  const resultView = new ResultView(container);
  resultView.bindEvents();

});
