
/*
***
The countries API: https://restcountries.eu/rest/v2/all
***
*/
let worldCountries = [];
let result = [];
let keys = [];
let slectedColumns = ['name','capital','region','flag','population'];
let filterConditions = [];
let numOperations = ['+','-'];
let stringOperations = ['starWith','includes'];


const url = 'https://restcountries.eu/rest/v2/all';
fetch(url)
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }
    // Examine the text in the response
    response.json().then(function(data) {
      worldCountries = data;
      keys = Object.keys(worldCountries[0]); //   
      result = worldCountries;
      document.querySelector('#tableContainer').innerHTML= displayCountry(worldCountries,slectedColumns);     
     
    });
  }
)
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});

