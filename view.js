goog.provide('utils.view');
goog.provide('utils.view.widget');

goog.require('goog.dom');
goog.require('goog.ui.Zippy');


//Обработка xml строки
utils.view.parseXML = function (str){
  var xmlDoc;
  if (window.DOMParser)
  {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(str, "text/xml");
  }
else // Internet Explorer
  {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(str);
  }

  return xmlDoc;
};


//Загрузка XML
utils.view.loadXML = function() {
    if (window.XMLHttpRequest)
    {// код для IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// код для IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","./view.xml",true);
    xmlhttp.send();
    return xmlhttp.responseXML;
};

utils.view.getAttributes = function (node)  
{  
  var ret = new Object();  
  if(node.attributes.length)  
  for(var i=0; i<node.attributes.length; i++)  
  {  
    var attr = node.attributes[i];  
    ret[attr.name] = attr.value;  
  }  
  return ret;  
}  

utils.view.makeList = function (xml,container) {
     var arrViews = [];
     var lengthView = xml.getElementsByTagName("View").length;
     if (lengthView){
       var atr = [];
       var viewNode;
       for (var i = 0; i < lengthView; i++) {
        atr = utils.view.getAttributes(xml.getElementsByTagName("View")[i]);
        viewNode = goog.dom.createDom('div', {'style': 'background-color:#EEE'}, atr['title']);
         
         var someView = xml.getElementsByTagName("View")[i];
         var lengthWidgets = someView.childNodes.length;

          for(var j = 0; j < lengthWidgets;j++){
           atr = utils.view.getAttributes(someView.childNodes[j]);
           var widget = 
           new utils.view.widget(atr['title'], viewNode);
           arrViews.push(widget);
           widget.makeDom();
          }
         goog.dom.appendChild(container, viewNode);  
        }
      return arrViews;
     }
};


utils.view.widget = function(title, widgetContainer) {
    this.title = title;
    this.parent = widgetContainer;
};


/**
 * Creates the DOM structure for the note and adds it to the document.
 */
utils.view.widget.prototype.makeDom = function() {
    // Create DOM structure to represent the note.
  this.widgetElement = goog.dom.createDom('div', null, this.title);
  //var newNode = goog.dom.createDom('div', null,
  //    this.parent, this.widgetElement);

  // Add the note's DOM structure to the document.
  goog.dom.appendChild(this.parent, this.widgetElement);
  return new goog.ui.Zippy(this.parent, this.widgetElement);
};

