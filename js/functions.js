// display the result by generating 

function displayCountry(countries,columns){ // creates a wrapper div for each country 
  return countries.reduce((c,v)=>{
    return c += `<div id="countryWrapper">${cells(v,columns)}</div>`;
  },'')   
}

function cells(element,columns){  // creates divs for each country info 
  let info = '', flag = '', additionalColumns = '';
  for(column of columns){
    if(column !== 'flag' && column !== 'currencies' && column !=='languages') {
      info +=  `<div id="${column}"> <span>${column} : </span> ${element[column]}</div>`; 
    } else if(column =='currencies' || column == 'languages'){
      additionalColumns = additionalColumns + convertArrayKeys(element[column],column);      
    } else if (column == 'flag'){
      flag = `<img src="${element[column]}"/>`;
    } 
  } 
  return `<div id="countryDetails">${info} ${additionalColumns}</div>${flag}`;
}

function convertArrayKeys(data,column){ // converts properties such as languages and currency to html tag
 let htmlTag = data.reduce((a,c,i)=>{
   return a += (i==0?'':', ') + c.name ;
 }
,'');    
  return `<div id="${column}"> <span>${column} :</span> ${htmlTag}</div>`;
}

// sort by country name or capital 

function sortString(key,option){
  if(option=='A'){
    result.sort(function(a, b) {
      var nameA = a[key].toUpperCase(); // ignore upper and lowercase
      var nameB = b[key].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }  
      
      // names must be equal
      return 0;
    });

  } else {
    result.sort(function(a, b) {
      var nameA = a[key].toUpperCase(); // ignore upper and lowercase
      var nameB = b[key].toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }  
      // names must be equal
      return 0;
    });
  } 
 document.querySelector('#tableContainer').innerHTML = displayCountry(result,slectedColumns);  
}

// sort by population
function sortPopulation (option){
  if(option == 'A'){
    result.sort((a, b) =>{
      return  a.population - b.population; 
    });
  }else {
    result.sort((a, b) =>{
      return  b.population - a.population;
    });
  }  
  document.querySelector('#tableContainer').innerHTML = displayCountry(result,slectedColumns);  
 }


 // add additional column user wants 

function selectColumn(choice){
  let checkboxInput = document.querySelector(`#${choice}`);
  if(checkboxInput.checked == true){    
    slectedColumns.push(choice);
    document.querySelector('#tableContainer').innerHTML= displayCountry(result,slectedColumns); 
  }else{
    remove(slectedColumns,choice);
    document.querySelector('#tableContainer').innerHTML= displayCountry(result,slectedColumns); 
  }
}

// remove an additional column 

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

// search functions

function search() {
  // search based on the search input   
  let searchKey = document.querySelector('#search').value.toLowerCase();
  let choice = document.querySelector('#regions').value.toLowerCase();
  result = worldCountries;
  if(searchKey){
    result = worldCountries.filter(e => 
      e.name.toLowerCase().includes(searchKey) || e.capital.toLowerCase().includes(searchKey)
      || includesLanguage(e.languages,searchKey)
    );
  } 

  if(choice){
    result = result.filter(e => e.region.toLowerCase() == choice);
  }
 document.querySelector('#tableContainer').innerHTML= displayCountry(result,slectedColumns); 
}

function includesLanguage(languages,searchWord){
  searchWord = searchWord.toLowerCase();
  for(language of languages){
    if(language.name.toLowerCase() == searchWord){
      return true;
    }
  }
  return false;
}

// add the regions to the select input 

function listRegions (){
  let regions = [];
  worldCountries.forEach( country =>{
    if(!regions.includes(country.region) && country.region !== '') regions.push(country.region);
  })
  let options = '<option value="">--choose a region--</option>'; 
  options = options.concat(regions.map(region => {
    return `<option value="${region}">${region}</region>`;
  }).join(''));
  document.querySelector('#regions').innerHTML = options;  
}