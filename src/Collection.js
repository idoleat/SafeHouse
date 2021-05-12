let Parameters = new URLSearchParams(document.location.search);
let CollectionName = Parameters.get('cl'); // Only the first occurence will be returned

//SELECT
//  name,
//  tags,
//  content,
//FROM
//  items
//WHERE
//  name=CollectoinsName

// DOM purify: https://github.com/cure53/DOMPurify
