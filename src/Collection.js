let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned
let Collection;
let Dictionary = JSON.parse(localStorage.getItem('ItemTagDic'));
let Tags = JSON.parse(localStorage.getItem('TagIdDic'));
let Items;

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

/**
 * args are the tags would like to include.
 * Each tag is a bit mask, only one bit will be 1, others are all 0.
 * So a filter consist of several tags are the combination masks.
 * This function shouldn't be called directly. This is a helper function and should be called in functions with args passed. (Not sure if this is a good design)
 * @param {aruguments} args The arguments abjects containing variable length of arguments, which are all (string)tags.
 */
function TagID(args){
  let TagNum = 0;
   Array.from(args).forEach( (tag)=> {
     TagNum += parseInt(Tags[tag]);
   });
  return TagNum;
}

/**
 * Filtering out items which contain specific tags.
 * It will iterate through all the items.
 * Improvements needed: Maybe store ItemTagDic sorted(or B-Tree like DB) to perform faster comparism.
 *
 * @returns An string array of items' name
 */
function FilterWithTags(){
  let items = [];
  let tags = TagID(arguments);

  for(let key in Dictionary){
    let value = parseInt(Dictionary[key]);
    if((value&tags) !== 0){
      items.push(key);
    }
  }

  return items;
}

GetCollection_json();
window.onload = () => document.getElementById('cl_name').innerHTML = CollectionName

Items = FilterWithTags("articles");
console.log(Items);

//TODO: check if it's coming from homepage or not to determine fetching again or not
//TODO: Automatic dictionaries generation
//TODO: Fill the rack
