function displayCountry(countries,columns){
  return countries.reduce((c,v)=>{
    return c += `<div id="countryWrapper">${cells(v,columns)}</div>`;
  },'')   
}

function cells(element,columns){ 
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

function convertArrayKeys(data,column){ // converts the array keys such as languages to html tag
 let htmlTag = data.reduce((a,c,i)=>{
   return a += (i==0?'':', ') + c.name ;
 }
,'');    
  return `<div id="${column}"> <span>${column} :</span> ${htmlTag}</div>`;
}
// ${(languagesArray? languagesLabel + languagesArray: "")}
// sort function
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


 // slect columns that usr want to be displayed
function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

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


// search functions

function search() {
  let searchKey = document.querySelector('#search').value.toLowerCase();
  result = worldCountries.filter(e => 
    e.name.toLowerCase().includes(searchKey) || e.capital.toLowerCase().includes(searchKey)
  );
  document.querySelector('#tableContainer').innerHTML= displayCountry(result,slectedColumns); 
}

function listRegions (){
  let regions = [];
  worldCountries.forEach( country =>{
    if(!regions.includes(country.region)) regions.push(country.region);
  })
 let options =   regions.map(region => {
    return `<option>${region}</region>`;
  }).join('');

  document.querySelector('#regions').innerHTML = options;  
}
