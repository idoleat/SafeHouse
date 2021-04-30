let HomepageSetup;

function addWidget(name, content){
  const newWidget = document.createElement('div');
  newWidget.className = 'card widget';

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

function addPinnedCollection(name, content){
  const newCollection = document.createElement('div');
  newCollection.className = 'card collection';

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

function addPinnedItem(name, content){
  const newItem = document.createElement('div');
  newItem.className = 'card item';

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

function FillRack(){
  for(let key in HomepageSetup){
    let value = HomepageSetup[key];
    if(value['type'] === 'widget'){
      addWidget(key, value['content']);
    }
    else if(value['type'] === 'collection'){
      addPinnedCollection(key, value['content']);
    }
    else if(value['type'] === 'item'){
      addPinnedItem(key, value['content']);
    }
  }
}

function GetHomepageSetup(callback){
  fetch("./HomepageSetup.json").then(function(response) {
    return response.json();
  }).then(function(json){
    HomepageSetup = json;
    if(callback != undefined) callback();
  }).catch(function(error){
    alert('Lost the way to your save house :(( \n' + error);
  });
}

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

GetHomepageSetup(FillRack);
