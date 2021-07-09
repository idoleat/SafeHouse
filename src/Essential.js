/* The common and basic functions and variables.
 * Import this script as a library.
 * Collection.js and index.js need this.
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
  newCollection.setAttribute('href', './Collection.html?cl=' + name);

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

// deprecated
function FillRack(setup){
  for(let key in setup){
    let value = setup[key];
    if(value['type'] === 'widget'){
      addWidget(key, value['content']);
    }
    else if(value['type'] === 'collection'){
      addCollection(key, value['content']);
    }
    else if(value['type'] === 'item'){
      addItem(key, value['content']);
    }
  }
}

function GetHomepageSetup(cb_FillRack){
  fetch("./HomepageSetup.json").then(function(response) {
    return response.json();
  }).then(function(json){
    HomepageSetup = json;
    if(cb_FillRack != undefined) cb_FillRack(HomepageSetup);
  }).catch(function(error){
    alert('Lost the way to your save house :(( \n' + error);
    // TEMP: need to display error directly in the web instead with a nice way like discord.
  });
}

async function GetItem_json(JsonName, callback){
  const response = await fetch('./items/' + JsonName + '.json');
  if(!response.ok){
    alert('Lost the way to your save house :(( \n' + error);
    throw new Error('error while fetching');
  }
  const json = await response.json();
  return json;
}

function GetItemTagDictionary(){
  fetch("./ItemTagDic.json").then(function(response) {
      return response.text();
  }).then(function(json){
    localStorage.setItem('ItemTagDic', json);
  }).catch(function(error){
    alert('Got errors while getting ItemTagDic.json');
    // TEMP: need to display error directly in the web instead with a nice way like discord.
  });
}

function GetTagIdDictionary(){
  fetch("./TagIdDic.json").then(function(response) {
      return response.text();
  }).then(function(json){
    localStorage.setItem('TagIdDic', json);
  }).catch(function(error){
    alert('Got errors while getting TagIdDic.json');
    // TEMP: need to display error directly in the web instead with a nice way like discord.
  });
}

/* Not allowed on most static web host.
 */
function SetHomepageSetup(){
  fetch('./HomepageSetup.json', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(HomepageSetup),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success storing homepage setup:', data);
  })
  .catch((error) => {
    console.error('Error storing homepage setup:', error);
  });
}
