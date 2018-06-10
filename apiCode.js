/**
 * Web api - simple api that gets post requests from the payment handler.
 */

function doPost(e) {
  

  var apiKey = "HARDCODEDAPIKEY";
  
  if (e.parameter.apiKey == apiKey){
    // ApiKey ok - set preference
    var scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty('usr'+e.parameter.userEmail,e.parameter.premium);
    return ContentService.createTextOutput('SUCCESS').setMimeType(ContentService.MimeType.TEXT); // Return sucess
  } else {
    return ContentService.createTextOutput('ERROR').setMimeType(ContentService.MimeType.TEXT); // Return error 
  }
}

/**
 * Empty doGet response
 */

function doGet(e){
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}