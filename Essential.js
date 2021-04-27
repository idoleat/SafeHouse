let HomepageSetup;

function setHomepageSetup(setup){
  HomepageSetup = setup;
}

function addWidget(name, content){
  const newWidget = document.createElement('div');
  newWidget.className = 'card';

  // I don't know it should be header or what so I use div.
  const widgetName = document.createElement('div');
  widgetName.innerHTML = name;
  const widgetContent = document.createElement('div');
  widgetContent.innerHTML = content;

  newWidget.append(widgetName);
  newWidget.append(widgetContent);
  document.getElementById('rack').append(newWidget);
  console.log(newWidget);
}

function addPinnedCollection(){

}

function addPinnedItem(){

}

function FillRack(){
  fetch("./HomepageSetup.json").then(function(response) {
    response.text().then(function(text) {
      setup = JSON.parse(text);
      console.log('FillRack...' + setup);
      for(let key in setup){
        console.log(key);
        let value = setup[key];
        if(value['type'] === 'widget'){
          addWidget(key, value['content']);
        }
        else if(value['type'] === 'collection'){

        }
        else if(value['type'] === 'item'){

        }
      }
    });
  });
}

FillRack();
