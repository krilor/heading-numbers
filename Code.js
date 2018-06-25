/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 */


function onOpen(e) {
  // Add a menu with some items, some separators, and a sub-menu.
  var menu = DocumentApp.getUi().createAddonMenu();
  //menu.addItem('Test', 'lorutTest')
  menu.addItem('1.2.3', 'menuCallbackAdd1')
  .addItem('1.2.3.', 'menuCallbackAdd7')
  .addItem('a.b.c', 'menuCallbackAdd2')
  .addItem('A.B.C', 'menuCallbackAdd3')
  .addItem('i.ii.iii', 'menuCallbackAdd4')
  .addItem('I.II.III', 'menuCallbackAdd5')
  .addItem('1) a) b)', 'menuCallbackAdd6')
  .addItem('Custom', 'menuCallbackEditCustom')
  .addSeparator()
  .addItem('Update', 'menuCallbackUpdate')
  .addItem('Clear', 'menuCallbackClear')
  .addToUi();
  
}

/**
 * Runs when the add-on is installed.
 *
 */
function onInstall(e) {
  onOpen(e);
}


/**
 * Remove numbered headings callback
 */
function menuCallbackClear(){
  numberHeadings(0);
}

/**
 * Adds numbered headings. Menu Callbacks
 * For generating test document
 */

function lorutTest(){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.clear();
  
  var section = body.appendParagraph("Heading 1");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  var section = body.appendParagraph("Heading 2");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  var section = body.appendParagraph("Heading 3");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  var section = body.appendParagraph("Heading 4");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING4);
  var section = body.appendParagraph("Heading 5");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING5);
  var section = body.appendParagraph("Heading 6");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING6);
  var section = body.appendParagraph("Heading 1");
  section.setHeading(DocumentApp.ParagraphHeading.HEADING1);

}
/**
 * Menu callbacks for adding headings
 */

function menuCallbackAdd1(){
  numberHeadings(1);
}

function menuCallbackAdd2(){
  numberHeadings(2);
}

function menuCallbackAdd3(){
  numberHeadings(3);
}

function menuCallbackAdd4(){
  numberHeadings(4);
}

function menuCallbackAdd5(){
  numberHeadings(5);
}

function menuCallbackAdd6(){
  numberHeadings(6);
}
function menuCallbackAdd7(){
  numberHeadings(7);
}


// Callback to add custom - currently used by the edit screen.
function menuCallbackAddCustom() {
  
  // Set custom document properties if not set
  if(!PropertiesService.getDocumentProperties().getProperty('h1')) {
    setPreferences(1,1,1,1,1,1,true,1,false,'','');
  }
  numberHeadings(99);

}

// Update the heading numbers
function menuCallbackUpdate() {
  
  // Get style property
  var hStyle = getOneProperty('hStyle');
  
  if(!hStyle || hStyle == '0'){ // No hStyle to update
    var ui = DocumentApp.getUi();
    ui.alert('Could not update heading numbers','No heading numbering style is active. Please apply a style first.' , ui.ButtonSet.OK);
  } else { // Update
    numberHeadings(parseInt(hStyle));
  }
}


/*
 * Edit custom style
 */

function menuCallbackEditCustom() {

  // Set custom document properties if not set
  if(!PropertiesService.getDocumentProperties().getProperty('h1')) {
    setPreferences(1,1,1,1,1,1,true,1,false,'','');
  }

  var html = HtmlService.createHtmlOutputFromFile('customStyleDialog')
  .setSandboxMode(HtmlService.SandboxMode.NATIVE)
  .setWidth(700)
  .setHeight(288);

  DocumentApp.getUi()
    .showModalDialog(html, 'Custom numbering style');

}

/**
 * Gets the stored user preferences for the origin and destination languages,
 * if they exist.
 *
 * @return {Object} The user's origin and destination language preferences, if
 *     they exist.
 */
function getPreferences() {
  var documentProperties = PropertiesService.getDocumentProperties();
  var props = documentProperties.getProperties();
  var prefs = {
    h1: parseInt(props['h1']),
    h2: parseInt(props['h2']),
    h3: parseInt(props['h3']),
    h4: parseInt(props['h4']),
    h5: parseInt(props['h5']),
    h6: parseInt(props['h6']),
    inherit: (props['inherit'] == 'true' ? true : false),
    delimiter: parseInt(props['delimiter']),
    trailing: (props['trailing'] == 'true' ? true : false),
    pre: props['pre'],
    post: props['post'],
    tabseparator: ( props['tabseparator'] == 'true' ? true : false)
  };
  return prefs;
}

/**
 * Sets the preferences
 */
function setPreferences(h1,h2,h3,h4,h5,h6,inherit,delimiter,trailing,pre,post,tabseparator) {
  var documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperties({
    'h1' : h1+'',
    'h2' : h2+'',
    'h3' : h3+'',
    'h4' : h4+'',
    'h5' : h5+'',
    'h6' : h6+'',
    'inherit' : (inherit ? 'true' : 'false'),
    'delimiter' : delimiter+'',
    'trailing' : (trailing ? 'true' : 'false'),
    'pre': pre,
    'post': post,
    'tabseparator': (tabseparator ? 'true' : 'false')
  });
}

/**
 * Wrappers for setting and getting one property
 */

function setOneProperty(prop, value){
  var documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperty(prop,value);
}

function getOneProperty(prop){
  var documentProperties = PropertiesService.getDocumentProperties();
  return documentProperties.getProperty(prop)
}
/**
 * Remove previous numbering
 * @param {string} eText - string
 * @param {number} eLevel - heading level
 */
function removeNumbers(eText,eLevel){
  
  var uZeroWidth = "\u200B";
  var uNoBreak = "\u00A0";
  
  // Get style
  var hStyle = getOneProperty("hStyle");
  
  // Return if style is unset or 0 - nothing to remove
  if(!hStyle || hStyle == '0') { return eText }; // return if hStyle is unset or 0
  
  // Remove
  var pattern = /^\u200B.+\u200B\u00A0/i
  var secondpattern = /^\u200B.+\u200B\u0009/i
  var newText = eText.replace(pattern, '');
  var newText = newText.replace(secondpattern, '');
  
  // Test is successfull
  if (!(eText.length > newText.length)){ //No characters where removed - try a new pattern - maybe the nobreak-space was removed?
    var pattern = /^\u200B.+\u200B/i
    var newText = eText.replace(pattern, '');
  }; 
  
  //Clean up string
  newText = newText.replace(/[\u200B\u00A0]/g,''); // Remove all funky whitespace characters
  newText = newText.replace(/^\s+/i, ''); // Remove whitespace from beginning
  
  return newText;
}

/**
 * Identifies the Heading level
 * @param {enum} PH ParagraphHeading enumeration of ParagraphElement
 * @return {int} 1-6 for heading level 0 if not header
 */

function getHeadingLevel(PH){
  var level = 0;
   
  switch(PH) {
    case DocumentApp.ParagraphHeading.HEADING1:
      level = 1;
      break;
    case DocumentApp.ParagraphHeading.HEADING2:
      level = 2;
      break;
    case DocumentApp.ParagraphHeading.HEADING3:
      level = 3;
      break;
    case DocumentApp.ParagraphHeading.HEADING4:
      level = 4;
      break;
    case DocumentApp.ParagraphHeading.HEADING5:
      level = 5;
      break;
    case DocumentApp.ParagraphHeading.HEADING6:
      level = 6;
      break;
  }
  
  return level;
}

/**
 * Adds and removes numbered headings.
 *
 * @param {number} style Determines if headings should be numbered (true) or cleared (false)
 *       1 - 
 *
 */
function numberHeadings(style){
  
  var uZeroWidth = "\u200B";
  var uNoBreak = "\u00A0";
  var uTab = "\u0009";
  
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  
  var p = body.getParagraphs();
  var numbers = [0,0,0,0,0,0,0];
  
  // If custom get prefs, else set inherit value
  if(style == 99){
    var prefs = getPreferences(); 
  } else if (style == 6) {
    var prefs = { inherit: false };
  } else {
    var prefs = { inherit: true };
  }
  
  for (var i in p) {
    var e = p[i];
    var eParagraphHeading = e.getHeading();
    var eLevel = getHeadingLevel(eParagraphHeading);
    
    // If not heading contine loop
    if (eLevel == 0) {
      continue;
    }

    // If heading element is empty, just skip it
    if ( e.getText()+'' == '' ) {
      continue;
    }
    
    // Get text
    var eText = e.getText()+'';
    
    // Increase numbers
    numbers[eLevel]++;
    
    // Remove child numbers if inherit
    if(prefs.inherit){
      for (var l = 1; l<=6; l++) {
        if (l > eLevel) {
          numbers[l] = 0;
        }
      }
    }
    
    // Clear out old numbers;
    var newText = removeNumbers(eText,eLevel);
    
    // Figure out new text
    var txt = '';
    switch(style){
        
      case(0): // Clear
        break;
      case(1): // 1.2.3
        txt = getNumbers(eLevel,numbers,1,1,1,1,1,1,true,1,false);
        break;
        
      case(2): // a.b.c
        txt = getNumbers(eLevel,numbers,2,2,2,2,2,2,true,1,false);
        break;
        
      case(3): // A.B.C
        txt = getNumbers(eLevel,numbers,3,3,3,3,3,3,true,1,false);
        break;
        
      case(4): // i.ii.iii
        txt = getNumbers(eLevel,numbers,4,4,4,4,4,4,true,1,false);
        break;
        
      case(5): // I.II.III
        txt = getNumbers(eLevel,numbers,5,5,5,5,5,5,true,1,false);
        break;
      case(6): // 1) a) b)
        txt = getNumbers(eLevel,numbers,1,2,3,4,5,6,false,4,true);
        break;
      
      case(7): // 1.2.3.
        txt = getNumbers(eLevel,numbers,1,1,1,1,1,1,true,1,true);
        break;
        
      case(99): // Custom
        txt = prefs.pre+getNumbers(eLevel,numbers,prefs.h1,prefs.h2,prefs.h3,prefs.h4,prefs.h5,prefs.h6,prefs.inherit,prefs.delimiter,prefs.trailing)+prefs.post;
        break;        

    } // Switch
    
    // Insert the numbering if there is any
    if (txt) {
      
      var trailingws = uNoBreak
      if ( prefs.tabseparator ) {
        trailingws = uTab
      } 
      
      e.replaceText('(?s)(.*)', uZeroWidth+txt+uZeroWidth+trailingws+newText);
    } else {
      e.replaceText('(?s)(.*)', newText);
    }

    
  } // For each paragraph
  
  // Set property hStyle
  setOneProperty('hStyle',style+'');
  
} // End numberHeadnings

