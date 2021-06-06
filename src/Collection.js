let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned
let Collection;
let Dictionary = JSON.parse(localStorage.getItem('ItemTagDic'));
let Tags = JSON.parse(localStorage.getItem('TagIdDic'));
console.log(Tags);
console.log(Dictionary);
let Items = [];

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

function TagID(args){
  let TagNum = 0;
   Array.from(args).forEach( (tag)=> {
     console.log('tag in ' + tag);
     TagNum += parseInt(Tags[tag]);
     console.log(Tags[tag]);
     console.log(parseInt(Tags[tag]));
   });
  return TagNum;
}

// Linear comparing
function FilterWithTags(){
  let tags = TagID(arguments);
  for(let key in Dictionary){
    let value = parseInt(Dictionary[key]);
    console.log('item: ' + key + ', tags: ' + value + ', filter: ' + tags);
    if(value & tags != 0){
      Items.push(key);
    }
  }
}

GetCollection_json();
window.onload = () => document.getElementById('cl_name').innerHTML = CollectionName

FilterWithTags("articles");
console.log(Items);
