var inputContentText;
var inputContentCB;
var inputContentSelect;
var inputCBElement = document.querySelector('#inputCB');
var inputTextElement = document.querySelector('#inputTXT');
var selectBox = document.querySelector('#selectBox');
inputCBElement.style.cssText = "transform: scale(2)";
selectBox.style.cssText = "padding: 12px; border: #ccc solid 2px; background-color: transparent; border-radius: 12px;";

// inputTextElement.oninput = function(e) {
//     inputContentText = e.target.value;
//     console.log(inputContentText);
// };

inputTextElement.onkeyup = function(e) {
    console.log(e.which);
};

inputCBElement.onchange = function(e) {
    inputContentCB = e.target.checked;
    console.log(inputContentCB);
};

selectBox.onchange = function(e) {
    inputContentSelect = e.target.value;
    console.log(inputContentSelect);
};