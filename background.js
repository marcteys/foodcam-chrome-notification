
var previousBuildDate = null;

chrome.browserAction.onClicked.addListener(function(tab) {
  window.open("http://foodcam.media.mit.edu");      
});

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notify(imgUrl) {

  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {

    var notification = new Notification('FoodCam', {
      icon: 'media.png',
     // imageUrl: imgUrl,
      imageUrl: 'media.png',
      body: "There is something to eat !",
    });

    notification.onclick = function () {
      window.open("http://foodcam.media.mit.edu");      
    };
  
  }

}

function parse() {
  var x = new XMLHttpRequest();

  x.open("GET", "http://claritin.media.mit.edu/foodcam.nsf/foodcam.rss", true);
  x.onreadystatechange = function () {
    if (x.readyState == 4 && x.status == 200)
    {
      var doc = x.responseXML;
       parseDoc(doc);
    }
  };
  x.send(null);
}


function parseDoc(doc) {
  var buildDate = doc.getElementsByTagName("channel")[0].getElementsByTagName("lastBuildDate")[0].textContent;

  if(buildDate != previousBuildDate) {
    var image = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[0].childNodes[11].getAttributeNode("url").value;
    notify(image);
    previousBuildDate = buildDate;
  }
}

setInterval(parse, 5000);