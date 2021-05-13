let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned

SQLiteDBWorker.get().then( async (worker) => {
  console.log('Async querying : select * from mytable .... Result = ' + JSON.stringify(
    await worker.db.query(`select * from mytable`)
  ));
});

//SELECT
//  name,
//  tags,
//  content,
//FROM
//  items
//WHERE
//  name=CollectoinsName

// DOM purify: https://github.com/cure53/DOMPurify
