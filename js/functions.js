function displayCountry(countries,columns){
  let rows = '';
  return countries.reduce((c,v)=>{
    return c += `<div id="countryWrapper">${cells(v,columns)}</div>`;
  },rows)
   
}

function cells(element,columns){ 
  let info = '';
  let flag = '';
  let currencyArray = '';
  let currenciesLabel = "Currencies :";
  let languagesArray = '';
  let languagesLabel = "Languages : ";

  for(column of columns){
    if(column !== 'flag' && column !== 'currencies' && column !=='languages') {
      info +=  `<div id="info"> ${column} : ${element[column]}</div>`; 
    } else if(column =='currencies'){
      for (currency of element[column]){
        currencyArray += currency.name + ' ';
      }      
      console.log(currencyArray);
    } else if (column == 'flag'){
      flag = `<img src="${element[column]}"/>`;
    } else if(column == 'languages'){
      for (language of element[column]){
        languagesArray += language.name + ' ';
        console.log('languages');
      }
    }
  } 
  return `<div id="countryDetails">${info} ${(currencyArray? currenciesLabel + currencyArray: "")}${(languagesArray? languagesLabel + languagesArray: "")} </div>${flag}`;
}

// ${(languagesArray? languagesLabel + languagesArray: "")}
// sort function
function sortString(key,option){

  if(option=='A'){
    worldCountries.sort(function(a, b) {
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
    worldCountries.sort(function(a, b) {
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
 document.querySelector('#tableContainer').innerHTML = displayCountry(worldCountries,slectedColumns);  
}


// sort by population
function sortPopulation (option){
  if(option == 'A'){
    worldCountries.sort((a, b) =>{
      return  a.population - b.population; 
    });
  }else {
    worldCountries.sort((a, b) =>{
      return  b.population - a.population;
    });
  }  
  document.querySelector('#tableContainer').innerHTML = displayCountry(worldCountries,slectedColumns);  
 }


 // slect columns that usr want to be displayed
function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

function selectColumn(choice){
  

  let checkboxInput = document.querySelector(`#${choice}`);
  if(checkboxInput.checked == true){
    
    slectedColumns.push(choice);
    document.querySelector('#tableContainer').innerHTML= displayCountry(worldCountries,slectedColumns); 
  }else{
    remove(slectedColumns,choice);
    document.querySelector('#tableContainer').innerHTML= displayCountry(worldCountries,slectedColumns); 
  }
}


/*

function displaySelectedColumns(){
  return slectedColumns.reduce((a,c)=>{
     return a += `<div>${c}</div>`
   },'');
 
 }

 function displayFilterKeys(){
  return keys.reduce((a,c)=>{
    return a += `<option>${c}</option>`
  },'');
 }

 function operatorOptions(type){
  if(type=='string') {
    return stringOperations.reduce((a,c)=>{
      return a += `<option>${c}</option>`
    },'');
  } else {
    return numOperations.reduce((a,c)=>{
      return a += `<option>${c}</option>`
    },'');
  }     
 }

 function displayFilterValue(operationType){
  if(operationType =='num') {
    let input = document.createElement('input');
    input.type = "number";    
    document.querySelector('#addFilterInputs').appendChild(input);
  } else {
    let input = document.createElement('input');
    input.type = "text";    
    document.querySelector('#addFilterInputs').appendChild(input);
  }  
 } */
