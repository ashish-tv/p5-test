// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Global variable to store the classifier
let classifier;
let path="https://labs.bible.org/api/?passage=John+3:16-17&formatting=plain"
let count=1;
let lastLabel="";
// Label (start by showing listening)
let label = "listening";
let label1="verse";
// Teachable Machine model URL:
let soundModelURL = //'https://teachablemachine.withgoogle.com/models/h3p9R41J/model.json';
'https://teachablemachine.withgoogle.com/models/qjvex6OwC/model.json';

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);
}

function setup() {
  createCanvas(320, 240);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
  httpGet( path,'text',getText)
}
function getText(verse){label1=verse}
function draw() {
  background(0);
  // Draw the label in the canvas
   // textWrap(CHAR);

  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 1.5);
  
  
 //rect(10, 200, 200, 150);
  
  textSize(10);
  textAlign(CENTER, CENTER);
  text(label1, width / 8, -height /32,200,150);
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
   label = results[0].label;
  //if((lastLabel!=label)&&label!='Background Noise')//{lastLabel=label;count=count+1;print("asdf")}
  if(label=="Matthew"||label=="Mark"||label=="Luke"||label=="John")
 {count=1;path="https://labs.bible.org/api/?passage="+label+"+"}//John+3:16-17&formatting=plain"}
  else{if(label!="Background Noise"){if(count==1){path=path+label+":";count=2;}
      if(count==2){path=path+label+"&formatting=plain";count=3;httpGet( path,'text',getText)}}}
  print( count,path);
}