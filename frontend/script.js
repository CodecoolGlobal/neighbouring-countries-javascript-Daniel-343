let SELECTED_COUNTRY = '';
const SORTEDCOUNTRY = sorting(countries);
const STORED_COUNTRIES = [];
let countryIndex;

function optionElement(content) {
  return `<option value="${content}">${content}</option>`;
}

/**
 * This function puts all our countries from a database by their name to a dropdown.
 * @constructor
 * @param {Array} data - Database
 */
function listCountriesIntoDropdown () {
  const selectElement = document.getElementById('all');
  SORTEDCOUNTRY.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}

function sorting(data){
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

/**
 * This function will draw the received data out to the screen with DOM manipulation.
 * @constructor
 * @param {string} countryName - A name of a country.
 */
function drawCountryData(countryName, trueOrFalse) {
  // Get data
  const thisCountry = [];
  countries.forEach((country) => {
    if (country.name.common === countryName) {
      thisCountry.push(country.flags.svg);
      thisCountry.push(country.name.common);
      thisCountry.push(country.capital);
      thisCountry.push(country.region);
      thisCountry.push(country.subregion);
    }
  });

  // Put data in HTML tags
  document.getElementById('flag').src = `${thisCountry[0]}`;
  document.getElementById('commonName').innerHTML = `Name: <b>${thisCountry[1]}</b>`;
  document.getElementById('capitalCity').innerHTML = `Capital city: <b>${thisCountry[2]}</b>`;
  document.getElementById('region').innerHTML = `Region: <b>${thisCountry[3]}</b>`;
  document.getElementById('subRegion').innerHTML = `Subregion: <b>${thisCountry[4]}</b>`;

  document.getElementById('commonName').setAttribute('value', `${thisCountry[1]}`);
  document.getElementById('capitalCity').setAttribute('value', `${thisCountry[2]}`);
  document.getElementById('region').setAttribute('value', `${thisCountry[3]}`);
  document.getElementById('subRegion').setAttribute('value', `${thisCountry[4]}`);

  if (trueOrFalse){
    STORED_COUNTRIES.push(thisCountry[1]);
    countryIndex = STORED_COUNTRIES.length - 1;
    console.log(STORED_COUNTRIES);
  }

  const prevButtons = document.querySelector('#previous');
  const nextButtons = document.querySelector('#next');
  if (countryIndex !== 0 && countryIndex !== STORED_COUNTRIES.length - 1) { // Ha nem széleken vagyunk
    prevButtons.disabled = false;
    nextButtons.disabled = false;
  }
  if (STORED_COUNTRIES.length === 1) { // Ha csak egy elem van még a historyban
    prevButtons.disabled = true;
    nextButtons.disabled = true;
  }
  if (countryIndex === STORED_COUNTRIES.length - 1 && countryIndex !== 0) { // Ha jobbra vagyunk és nem balra
    prevButtons.disabled = false;
    nextButtons.disabled = true;
  }
  if (countryIndex === 0 && countryIndex !== STORED_COUNTRIES.length - 1) { // Ha balra vagyunk és nem jobbra
    prevButtons.disabled = true;
    nextButtons.disabled = false;
  }
}

/**
 * This function checks if a selected country is selected in the dropdown
 */
function checkSelectedCountry () {
  const selectElement = document.getElementById('all');
  selectElement.addEventListener('change', function (event) {

    const isDisplay = document.getElementById('isDisplay');
    if (event.target.value !== 'Select a country from the list') isDisplay.style.display = 'block';
    else isDisplay.style.display = 'none';

    SELECTED_COUNTRY = event.target.value;
    console.log(STORED_COUNTRIES);
    drawCountryData(event.target.value, true);
  });
}

function neighbour(searchedBy){
  let border;
  const showedCountry = document.getElementById('commonName').getAttribute('value');
  countries.forEach((country) => {
    if (showedCountry === country.name.common){
      border = country.borders;
    }
  });
  //console.log(border);
  const bordersObject = fromBorderToObject(border);
  console.log(searchedBy);
  const sortedBorders = bordersObject.sort((a, b) => b[`${searchedBy}`] - a[`${searchedBy}`]);
  console.log(sortedBorders);
  if (sortedBorders.length > 0) {
    drawCountryData(sortedBorders[0].name.common, true);
    changeSelectedText(sortedBorders[0].name.common);
  } else drawErrorMessage();
}

function fromBorderToObject(border){
  const result = [];
  if (typeof border !== 'undefined') {
    for (let i = 0; i < border.length; i++){
      countries.forEach((country) => {
        if (country.cca3 === border[i]){
          result.push(country);
        }
      });
    }
  }

  return result;
}

function changeSelectedText(text){ //text a megjelenített ország név
  const selectElement = document.getElementById('all');
  for (let i = 0; i < SORTEDCOUNTRY.length; i++){
    if (SORTEDCOUNTRY[i].name.common === text){
      selectElement.selectedIndex = i + 1;
    }
  }
}

function drawErrorMessage () {
  const errorElement = document.getElementById('article');
  if (errorElement.className.includes('display-none')) {
    errorElement.classList.remove('display-none');
    errorElement.classList.add('display-block');
  }
  checkAlertClosing();
}

function checkAlertClosing () {
  const errorElement = document.getElementById('article');
  const closeButton = document.getElementById('alert');
  closeButton.addEventListener('click', function () {
    if (errorElement.className.includes('display-block')) {
      errorElement.classList.remove('display-block');
      errorElement.classList.add('display-none');
    }
  });
}

function neighbourButtonsEventListener () {
  const arr = [document.getElementById('population'), document.getElementById('area')];
  for (let i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', (event)=>{
      neighbour(event.currentTarget.id);
    });
  }
}

function showHistory(){
  const prevButtons = document.querySelector('#previous');
  prevButtons.addEventListener('click', () => {
    countryIndex--;
    drawCountryData(STORED_COUNTRIES[countryIndex], false);
  });
  const nextButtons = document.querySelector('#next');
  nextButtons.addEventListener('click', () => {
    countryIndex++;
    drawCountryData(STORED_COUNTRIES[countryIndex], false);
  });
}

/* global countries */
const loadEvent = function () {
  // Main
  listCountriesIntoDropdown();
  checkSelectedCountry();
  neighbourButtonsEventListener();
  showHistory();
};
window.addEventListener('load', loadEvent);
