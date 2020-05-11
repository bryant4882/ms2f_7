
// cross pattern
let dim;

let theShader;
var myResults = [];
var myResults1 = [];
var myResults2 = [];
var consumerKey = 'jJKwYVKkqnSkbr63NpK7Vzvkx';
var consumerSecret = 'lTMfwMs7rDxz8vPcxBD7Gy5lDO8GXnlIzPw2d8xVhqa1L4xOTw';

var token = '364475473-kMBumzdzoxKZcduTwFGizG0iyMldRx1CQtcRXm2w';
var tokenSecret = 'KBjBbqUZ0of2SQZDFEqSFof7kQPpENigIh7d3BMUQyCjN';

var cb = new Codebird();

// particle

var attractor;
var attractor1;
var attractor2;
var particles = [];
var particles1 = [];
var particles2 = [];


function preload(){
// load the shader
//  theShader = loadShader('assets/basic.vert', 'assets/basic.frag');
}

function setup() {                      //---------setup top
//createCanvas(400,400);

createCanvas(window.innerWidth, window.innerHeight);

cb.setConsumerKey(consumerKey, consumerSecret);
cb.setToken(token, tokenSecret);


const particlesLength = Math.floor(window.innerWidth/4);
const particles1Length = Math.floor(window.innerWidth);

for(let i = 0; i<particlesLength; i++){
  particles.push(new Particle());
}

// for(let i = 0; i<particles1Length; i++){
//    particles1.push(new Particle1());
// }

  // codebird
var params = {
  q: "room",
  result_type: 'recent',
  count: 10
};

  var params1 = {
  q: "window",
  result_type: 'recent',
  count: 10
};


  var params2 = {
  q: "door",
  result_type: 'recent',
  count: 10
};

  cb.__call(
  "search_tweets",
  params,
  function(reply) {
    var statuses = reply.statuses;
    for (var i = 0; i < statuses.length; i++) {
      var tweet = statuses[i];
      if (!tweet.retweeted_status) {
        //print(tweet.text);
        //fill('#' + tweet.user.profile_background_color);

        fill(255/i);

        //let myResults = statuses;
       myResults = tweet.text;
        let words = tweet.text.split(" ");
        console.log(words);
        let hyphenated = words.join("-")
       // text(tweet.text , 0, i * 120);
      }
    }
    // print the max_id which helps if you want to grab pages of data
    //print('max_id: ' + reply.search_metadata.max_id);

  }
);


    cb.__call(
  "search_tweets",
  params1,
  function(reply) {
    var statuses = reply.statuses;
    for (var i = 0; i < statuses.length; i++) {
      var tweet1 = statuses[i];
      if (!tweet1.retweeted_status) {


        fill(255);

        //let myResults = statuses;
       myResults1 = tweet1.text;
        //let words = tweet1.text.split(" ");
        //console.log(words);
        //let hyphenated = words.join("-")
       // text(tweet.text , 0, i * 120);
      }
    }
    // print the max_id which helps if you want to grab pages of data
    //print('max_id: ' + reply.search_metadata.max_id);

  }
);


cb.__call(
  "search_tweets",
  params2,
  function(reply) {
    var statuses = reply.statuses;
    for (var i = 0; i < statuses.length; i++) {
      var tweet2 = statuses[i];
      if (!tweet2.retweeted_status) {
        //print(tweet.text);
        //fill('#' + tweet.user.profile_background_color);

        fill(255/i);

        //let myResults = statuses;
       myResults2 = tweet2.text;
        let words = tweet2.text.split(" ");
        //console.log(words);
        let hyphenated = words.join("-")
       // text(tweet.text , 0, i * 120);
      }
    }
    // print the max_id which helps if you want to grab pages of data
    //print('max_id: ' + reply.search_metadata.max_id);

  }
);
/////////////////////////////////////////////////
// for (var i =0; i<50; i++){
//   particles.push(particle = new Particle());
// }
//
// for (var q =0; q<50; q++){
//   particles.push(particle = new Particle1());
// }

for (var i =0; i<50; i++){
  particles.push(particle = new Particle());
  particles.push(particle1 = new Particle1());
  particles.push(particle2 = new Particle2());

}
attractor = createVector(width/2, height/2);    //set cm
xim = createVector(1500, 900);
attractor1 = createVector(width-150, height-400);
attractor2 = createVector(mouseX, mouseY);

}                                      //---------setup

function draw(){
background(0);
stroke(255);
//strokeWeight(4);
//drawGradient(width/2, height / 2);

//point(attractor.x, attractor.y);        // draw attractor

for (var i =0; i<particles.length; i++){
 var particle = particles[i];
 particle.attracted(attractor);
 //particle.attracted(attractor1);
 //particle.attracted(attractor2);
 particle.update();
 //particle.mouse();
 particle.show();

}
// for (var q =0; q<particles.length; q++){
//   var particle1 = particles1[q];
//   particle1.attracted(attractor);
//   particle1.update();
//   //particle.mouse();
//   particle1.show();
//
//  }
//
//  for (var u =0; u<particles.length; u++){
//    var particle2 = particles1[u];
//    particle2.attracted(attractor);
//    particle2.update();
//    //particle.mouse();
//    particle2.show();
//
//   }
// background(0,90);


}

class Particle{     //particle thisone

constructor(){
  this.pos = createVector(random(width-300, width||0, 300), random(height-150, height||0, 150 ));
//  this.vel = p5.Vector.random2D();
  this.vel = createVector(random(-3,3))
  this.acc = createVector();
  var force;
}

update(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
}

show(){

    //stroke(255);
    //strokeWeight(4);
    //point(this.pos.x, this.pos.y);

    var txt = myResults ;              //scope issue
    var txt1 = myResults1;
    var txt2 = myResults2;
    var tx = String(txt);
    var tx1 = String(txt1);
    var tx2 = String(txt2);
    textSize(7);
    //fill(255);

    noStroke();
    fill(100, 100, 215, 90);
    text(tx, this.pos.x, this.pos.y);
    fill(20, 100, 215, 90);
    text(tx1, this.pos.x+400, this.pos.y-200);
    fill(120, 200, 215, 90);
    text(tx2, this.pos.x-501, this.pos.y+140);

}

attracted(target){
  var force = p5.Vector.sub(target, this.pos);   //direction
  var dsquared = force.magSq();
  dsquared = constrain(dsquared, 25, 500);   //constrain itself not to be too extreme
  var G = 44;
  var strength = G / dsquared;
  force.setMag(strength);
  this.acc = force;

  // if (abs(this.pos.x-mouseX)<10){
  //   this.vel.x *= -1.2;
  // }
  // // }else{
  // //   this.acc.x = random(-0.02, 0.02);}
  //  if (abs(this.pos.y-mouseY)<10){
  //   this.vel.y *= -1.2;
  // }

  if (this.pos.x < 0 || this.pos.x >width){
 this.vel.x *=-1;
}


if (this.pos.y < 0 || this.pos.y > height){
 this.vel.y *=-1;
}

}

//   mouse(){
//  if (abs(this.pos.x-mouseX)<30){
//    this.acc.x *= -12.03;
//  }
//  // }else{
//  //   this.acc.x = random(-0.02, 0.02);}
//   if (abs(this.pos.y-mouseY)<30){
//    this.acc.y *= -12.03;
//  }
// //  }else{
// //    this.vel.y = random(-0.02, 0.02);}
// // }
// }

}

class Particle1{

constructor(){
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  var force;
}

update(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
}

show(){

    //stroke(255);
    //strokeWeight(4);
    //point(this.pos.x, this.pos.y);

    var txt = myResults ;              //scope issue
    var txt1 = myResults1;
    var txt2 = myResults2;
    var tx = String(txt);
    var tx1 = String(txt1);
    var tx2 = String(txt2);
    textSize(7);
    //fill(255);


    fill(20, 100, 215, 90);
    text(tx1, this.pos.x, this.pos.y);


}

attracted(target){
  var force = p5.Vector.sub(target, this.pos);   //direction
  var dsquared = force.magSq();
  dsquared = constrain(dsquared, 25, 500);   //constrain itself not to be too extreme
  var G = 4;
  var strength = G / dsquared;
  force.setMag(strength);
  this.acc = force;

  if (abs(this.pos.x-mouseX)<10){
    this.acc.x *= -12.03;
  }else{
    this.acc.x = force.x;
  }
  // }else{
  //   this.acc.x = random(-0.02, 0.02);}
   if (abs(this.pos.y-mouseY)<10){
    this.acc.y *= -12.03;
  }else{
    this.acc.y = force.y;
  }
}

//   mouse(){
//  if (abs(this.pos.x-mouseX)<30){
//    this.acc.x *= -12.03;
//  }
//  // }else{
//  //   this.acc.x = random(-0.02, 0.02);}
//   if (abs(this.pos.y-mouseY)<30){
//    this.acc.y *= -12.03;
//  }
// //  }else{
// //    this.vel.y = random(-0.02, 0.02);}
// // }
// }

}

class Particle2{

constructor(){
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  var force;
}

update(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
}

show(){

    //stroke(255);
    //strokeWeight(4);
    //point(this.pos.x, this.pos.y);

    var txt = myResults ;              //scope issue
    var txt1 = myResults1;
    var txt2 = myResults2;
    var tx = String(txt);
    var tx1 = String(txt1);
    var tx2 = String(txt2);
    textSize(7);
    //fill(255);


    fill(120, 200, 215, 90);
    text(tx2, this.pos.x, this.pos.y);

}

attracted(target){
  var force = p5.Vector.sub(target, this.pos);   //direction
  var dsquared = force.magSq();
  dsquared = constrain(dsquared, 25, 500);   //constrain itself not to be too extreme
  var G = 44;
  var strength = G / dsquared;
  force.setMag(strength);
  this.acc = force;

  if (abs(this.pos.x-mouseX)<10){
    this.acc.x *= -12.03;
  }else{
    this.acc.x = force.x;
  }
  // }else{
  //   this.acc.x = random(-0.02, 0.02);}
   if (abs(this.pos.y-mouseY)<10){
    this.acc.y *= -12.03;
  }else{
    this.acc.y = force.y;
  }
}

//   mouse(){
//  if (abs(this.pos.x-mouseX)<30){
//    this.acc.x *= -12.03;
//  }
//  // }else{
//  //   this.acc.x = random(-0.02, 0.02);}
//   if (abs(this.pos.y-mouseY)<30){
//    this.acc.y *= -12.03;
//  }
// //  }else{
// //    this.vel.y = random(-0.02, 0.02);}
// // }
// }

}

function drawGradient(x, y) {
  let radius = width/2;
  let h = 0;
  for (let r = radius; r > 0;  r -=1) {
    stroke(255, h);
    strokeWeight(2);
    ellipse(x, y, r, r);
    h -=0.1;

  }
}
