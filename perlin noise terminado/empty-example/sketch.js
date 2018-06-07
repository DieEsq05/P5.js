var inc = 0.1;
var scl = 10;
var cols, rows
var fr;
var zoff = 0;
var particles = [];
var flowfield;


function setup() {
createCanvas(800, 600);
cols = floor(width / scl);
rows = floor(height / scl);
fr = createP('');

flowfield = new Array(cols * rows);

for(var i = 0; i < 10000; i++){
particles[i] = new Particle();
  }
background(255);
}

function draw() {



  var yoff = 0;
  for (var y = 0; y < rows; y++){
    var xoff = 0;
    for (var x = 0; x < cols; x++){
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)*TWO_PI+TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      strokeWeight(1);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      //line(0, 0, scl, 0);

      pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  fr.html(floor(frameRate()));
for(var i = 0; i < particles.length; i++){
  particles[i].show();
  particles[i].update();
  particles[i].edges();
  particles[i].follow(flowfield);
  }
}
