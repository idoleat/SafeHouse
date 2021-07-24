let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned
let Collection;
let Dictionary = JSON.parse(localStorage.getItem('ItemTagDic'));
let Tags = JSON.parse(localStorage.getItem('TagIdDic'));
let ItemNames;

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
function ItemsWithTags(){
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

function FillRack_(items){
  items.forEach((item) => {
    // use includes() to check it's collectoin or widget temperorily
    // If an item has encoded itags stored, we can use & for faster checking
    if(item['tags'].includes('CL')){
      addCollection(item['name'], item['content']);
    }
    else if(item['tags'].includes('WIDGET')){
      addWidget(item['name'], item['content']);
    }
    else{
      addItem(item['name'], item['content']);
    }
  });
}
/**
 * [GetItemJson description]
 * @param       {array} item_names [description]
 * @constructor
 */
async function GetItems_json(item_names){
  let items = [];
  for(let i=0; i<item_names.length; i++){
    items.push(await GetItem_json(item_names[i]));
  }
  FillRack_(items);
  return items;
}

Collection = GetItem_json(CollectionName);
window.onload = () => document.getElementById('cl_name').innerHTML = CollectionName

// Test only.
// 'articles' should be replaced by resolve(Collection['rules'])
ItemNames = ItemsWithTags('articles');

GetItems_json(ItemNames);


//TODO: check if it's coming from homepage or not to determine fetching again or not
//TODO: Automatic dictionaries generation
//TODO: Fill the rack
