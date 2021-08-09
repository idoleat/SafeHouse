/* The common and basic functions and variables.
 * Import this script as a JavaScript module.
 * Collection.js need this.
 * Not saved as .mjs because not every web server is configured right.
 */

function addWidget(name, content){
  const newWidget = document.createElement('a');
  newWidget.className = 'card widget';
  newWidget.setAttribute('href', '#');

  // I don't know it should be header or what so I use div.
  const widgetName = document.createElement('div');
  widgetName.innerHTML = name;
  const seperator = document.createElement('div');
  seperator.className = 'seperator';
  const widgetContent = document.createElement('div');
  widgetContent.innerHTML = content;

  newWidget.append(widgetName);
  newWidget.append(seperator);
  newWidget.append(widgetContent);
  document.getElementById('rack').append(newWidget);
}

function addCollection(name, content){
  const newCollection = document.createElement('a');
  newCollection.className = 'card collection';
  /*pre process name*/
  newCollection.setAttribute('href', './?cl=' + name);

  // I don't know it should be header or what so I use div.
  const collectionName = document.createElement('div');
  collectionName.innerHTML = name;
  const seperator = document.createElement('div');
  seperator.className = 'seperator';
  const collectionContent = document.createElement('div');
  collectionContent.innerHTML = content;

  newCollection.append(collectionName);
  newCollection.append(seperator);
  newCollection.append(collectionContent);
  document.getElementById('rack').append(newCollection);
}

function addItem(name, content){
  const newItem = document.createElement('a');
  newItem.className = 'card item';
  newItem.setAttribute('href', '#');

  // I don't know it should be header or what so I use div.
  const itemName = document.createElement('div');
  itemName.innerHTML = name;
  const seperator = document.createElement('div');
  seperator.className = 'seperator';
  const itemContent = document.createElement('div');
  itemContent.innerHTML = content;

  newItem.append(itemName);
  newItem.append(seperator);
  newItem.append(itemContent);
  document.getElementById('rack').append(newItem);
}

/**
 * Get a item asyncronously under '/item' durectory. Pass relative pass in to access items in other location.
 * @param       {string}   JsonName File name, without .json
 * @param       {Function} callback Functions to call after getting the item successfully. Json as Js object will be passed as the only argumemt.
 * @returns Js object of the item.
 */
async function GetItem_json(JsonName, callback){
  const response = await fetch(`./items/${JsonName}.json`);
  if(!response.ok){
    alert(`Can not find ${JsonName}.json`);
    //throw new Error('error while fetching');
  }
  const json = await response.json();
  if(callback !== undefined) callback(json);
  return json;
}

/**
 * Use GetItem_json() to get multiple items as an array.
 * @param       {array} item_names Files names, without .json
 * @constructor
 */
async function GetItems_json(item_names, callback){
  let items = [];
  // I don't know what's the best way to itterate through an array so I use for loop.
  for(let i=0; i<item_names.length; i++){
    items.push(await GetItem_json(item_names[i]));
  }
  if(callback !== undefined) callback(json);
  return items;
}

function FillRack(items){
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

export {addWidget, addCollection, addItem, GetItem_json, GetItems_json, FillRack};
