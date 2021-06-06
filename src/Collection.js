let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned
let Collection;

function GetCollection_json(callback){
  fetch('./items/' + CollectionName + '.json').then(function(response) {
    return response.json();
  }).then(function(json){
    Collection = json;
    if(callback != undefined) callback();
  }).catch(function(error){
    alert('Lost the way to your save house :(( \n' + error); // TEMP: need to display error directly in the web instead with a nice way like discord.
  });
}

GetCollection_json();
window.onload = () => document.getElementById('cl_name').innerHTML = CollectionName
