import {GetItem_json, GetItems_json, FillRack} from './Essential.js';

let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned
if (CollectionName == null) CollectionName = 'HOMEPAGE';
let Collection;
let Dictionary;
let Tags = ['test'];
let ItemNames;

/**
 * args are the tags would like to include.
 * Each tag is a bit mask, only one bit will be 1, others are all 0.
 * So a filter consist of several tags are the combination masks.
 * This function shouldn't be called directly. This is a helper function and should be called in functions with args passed. (Not sure if this is a good design)
 * @param {array} tags An array of (string)tags to include or exclude.
 */
function TagID(tags){
  let TagNum = 0;
   tags.forEach( (tag)=> {
     TagNum += parseInt(Tags[tag]);
   });
  return TagNum;
}

/**
 * Filtering out items which contain specific tags.
 * It will iterate through all the items.
 * Improvements needed: Maybe store ItemTagDic sorted(or B-Tree like DB) to perform faster comparism.
 *
 * @param {array} ArrayOfTags An array of tags to include or exclude.
 *
 * @returns An string array of items' name
 */
function ItemsWithTags(ArrayOfTags){
  let items = [];
  let tags = TagID(ArrayOfTags);

  for(let key in Dictionary){
    let value = parseInt(Dictionary[key]);
    if((value&tags) !== 0){
      items.push(key);
    }
  }

  return items;
}

function ResolveRules(rules){
  let names = [];
  const push_item_names = (item_name) => {
    names.push(item_name);
  }
  // include tags
  ItemsWithTags(rules['include_tags']).forEach(push_item_names);

  // exclude tags
  // names.

  // include items
  rules['include_items'].forEach(push_item_names);

  // exclude items

  // include item ID

  // exclude item ID

  return names;
}

// not sure whether if-modified-since is in the request header by default on every modern browser or not
// An hacky way to use GetItem_json().
Dictionary = await GetItem_json('../ItemTagDic');
Tags = await GetItem_json('../TagIdDic');

Collection = await GetItem_json(CollectionName);
document.getElementById('cl_name').innerHTML = CollectionName;
document.getElementById('cl_description').innerHTML = Collection['content'];

// Test only.
// 'articles' should be replaced by resolve(Collection['rules'])
//ItemNames = ItemsWithTags('articles');
ItemNames = ResolveRules(Collection['extra']['rules']);

FillRack(await GetItems_json(ItemNames));

//TODO: Automatic dictionaries generation
//TODO: Apply defalt collection style if it's not on homepge
