// background.js

// USE CASES
// GA:
// account: https://ga-ics.corp.google.com/#support/account/251081/
// property: https://ga-ics.corp.google.com/#support/property/398227/
// GTM:
// account: https://ga-ics.corp.google.com/#gtm/account/50108973/
// container: https://ga-ics.corp.google.com/#gtm/container/GTM-52DD7V/
// user: https://ga-ics.corp.google.com/#gtm/user/280401336082/

var clickLucky = function(e){
  clickHandler(e,"feelingLucky");
}
var clickGa = function(e){
  clickHandler(e,"ga");
}
var clickGtm = function(e){
  clickHandler(e,"gtm");
}
var clickHandler = function(e,prodType) {
	var icsUrl = "https://ga-ics.corp.google.com";
  if (e.selectionText) {
    var gaAcct = "";
    var gtmCont = ""
    try { gaAcct = e.selectionText.match(/^UA-(\d[^\-]*)/)[1]; } catch(e) {}
    try { gtmCont = e.selectionText.match(/GTM-([^(\s|$)]*)/i)[0]; } catch(e) {}
    if(prodType === "feelingLucky"){
      if(gaAcct) {
        icsUrl += "/#support/account/" + gaAcct;
      } else if(gtmCont) {
        icsUrl += "/#gtm/container/" + gtmCont;
      }
    } else {
      if(prodType === "ga") {
        icsUrl += "/#support/account/" + e.selectionText;
      } else if(prodType === "gtm"){
        icsUrl += "/#gtm/account/" + e.selectionText;
      }
    }
  }

  // Open the page up.
  chrome.tabs.create({"url" : icsUrl});

};

var clickTeams = function(e) {
	var teamsUrl = "http://who/";
  // Open the page up.
  chrome.tabs.create({"url" : teamsUrl + e.selectionText});

};

chrome.contextMenus.create({
    "title": "GA Property (UA-XXX-YY) / GTM Container (GTM-XXXXX)",
    "contexts": ["selection", "link"],
    "onclick": clickLucky,
    "id": "lucky"
});
chrome.contextMenus.create({
    "title": "GA Account",
    "contexts": ["selection", "link"],
    "onclick": clickGa,
    "id": "gaParent"
});
chrome.contextMenus.create({
    "title": "GTM Account",
    "contexts": ["selection", "link"],
    "onclick": clickGtm,
    "id": "gtmParent"
});
chrome.contextMenus.create({
    "title": "Teams",
    "contexts": ["selection", "link"],
    "onclick": clickTeams,
    "id": "teams"
});
