import { FillRack, GetItem_json, GetItems_json } from "./Essential.js";

let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get("cl"); // Only the first occurence will be returned
if (CollectionName == null) CollectionName = "HOMEPAGE";
let Collection;
let ItemTagDic;
let TagIdDic;
let ItemNames;

/**
 * Filtering out items which include and exclude specific tags.
 * It will iterate through all the items.
 *
 * @param {array} include An array of tags to include
 * @param {array} exclude An array of tags to exclude
 *
 * @returns An string array of items' name
 */
function ItemsWithTags(include, exclude) {
  let items = [];
  let tagBitMask = 0;

  /* Each tag is a bit mask, only one bit will be 1, others are all 0.
   * Look up the corresponding bit mask of a certain tag by looking up TagIdDic.json
   * Combine all the bit masks to get the final bit mask to filter out items in the next step.
   */
  for (let i = 0; i < include.length; i++) {
    let mask = TagIdDic[include[i]]; // How about bad TagIdDic cause mask a NaN?
    if (mask) tagBitMask += mask;
  }
  for (let i = 0; i < exclude.length; i++) {
    let mask = TagIdDic[exclude[i]];
    if (mask) tagBitMask -= mask;
  }

  /* Linear search through all items.
   * Improvements needed: Maybe store ItemTagDic sorted(or B-Tree just like DB or hierachical)
   * to perform faster filtering.
   */
  for (let itemName in ItemTagDic) {
    let tagValue = ItemTagDic[itemName];
    if ((tagValue & tagBitMask) !== 0) {
      items.push(itemName);
    }
  }

  return items;
}

/**
 * [ResolveRules description]
 * @param       {[type]} rules  [description]
 * @constructor
 */
function ResolveRules(rules) {
  let names = [];
  const push_item_names = (item_name) => {
    names.push(item_name);
  };
  // include tags
  ItemsWithTags(rules["include_tags"], rules["exclude_tags"]).forEach(
    push_item_names,
  );

  // include items
  rules["include_items"].forEach(push_item_names);

  // exclude items
  //

  // include item ID

  // exclude item ID

  return names;
}

// not sure whether if-modified-since is in the request header by default on every modern browser or not
// An hacky way to use GetItem_json().
ItemTagDic = await GetItem_json("../ItemTagDic");
TagIdDic = await GetItem_json("../TagIdDic");

Collection = await GetItem_json(CollectionName);
document.getElementById("cl_name").innerHTML = CollectionName;
document.getElementById("cl_description").innerHTML = Collection["content"];

ItemNames = ResolveRules(Collection["extra"]["rules"]);

FillRack(await GetItems_json(ItemNames));
document.getElementById("loader").remove();

//TODO: Automatic dictionaries generation
//TODO: Apply defalt collection style if it's not on homepge

//problem: ItemTagDic file too larg
//* Hierarchical dictionary files
//* Dynamic dictionary files tree like MD pool of Ceph
//* Use sqlite-httpvfs (ref: Linux conf au talk- database as filesystem
//*

// Slow load time: can we fetch all the file at once? Fetch with html? The overhead of establishing connection is too much
