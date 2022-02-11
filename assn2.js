function myLine (x1, y1, x2, y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2) 
  // using only calls to point().
  
  // your code should implement the Midpoint algorithm

  dx = x2 - x1;
  dy = y2 -y1;
  d = dy * 2 - dx;
  increaseByE = 2*dy;
  increaseByNE = (dy - dx) *2;
  x = x1;
  y = y1;
  point(x, y);
  while( x < x1){
    if(d <=0){
      d += increaseByE;
      x++;
    } else {
      d += increaseByNE;
      x++;
      y++;
    }
    point(x, y)
  }
}

function myTriangle (x0, y0, x1, y1, x2, y2)
{
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // using only calls to point().
  
  // your code should implement the the algorithm presented in the video
  //Function for triangle with flat bottom
  function triangleWithBottomSide(v1, v2, v3){
    slope_inverse_1 = (v2[0] - v1[0]) / (v2[1] - v1[1]);
    slope_inverse_2 = (v3[0] - v1[0]) / (v3[1] - v1[1]);

    curve_1 = v1[0];
    curve_2 = v1[0];

    for(scanY = v1[1]; scanY <= v2[1]; scanY++){
      line(curve_1, scanY, curve_2, scanY);
      curve_1 += slope_inverse_1;
      curve_2 += slope_inverse_2;
    }
  }

  //Function for triangle with flat top
  function triangleWithFrontSide(v1, v2, v3){
    slope_inverse_1 = (v3[0] - v1[0]) / (v3[1] - v1[1]);
    slope_inverse_2 = (v3[0] - v2[0]) / (v3[1] - v2[1]);

    curve_1 = v3[0];
    curve_2 = v3[0];

    for(scanY = v3[1]; scanY <= v1[1]; scanY--){
      line(curve_1, scanY, curve_2, scanY);
      curve_1 -= slope_inverse_1;
      curve_2 -= slope_inverse_2;
    }
  }
  
  var data = [[x0, y0], [x1, y1], [x2, y2]];
  //Sort coordinates by y coordinate
  data.sort(function(a, b){
    return a[1] - b[1];
  });

  point1 = [x0, y0];
  point2 = [x1, y1];
  point3 = [x2, y2];

  if(point2[1] == point3[1]){
    triangleWithBottomSide(point1, point2, point3);
  }

  else if(point1[1] == point2[1]){
    triangleWithFrontSide(point1, point2, point3);
  }

  else{
    new_x = (point1[0] + (point2[1] - point1[1]) / (point3[1] - point1[1]) * (point3[0] - point1[0]));
    new_y = point2[1];
    point4 = [new_x, new_y];
    triangleWithBottomSide(point1, point2, point4);
    triangleWithFrontSide(point2, point4, point3);
  }
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

let doMine;
let scene;
let backgroundColor;

function setup () 
{
  createCanvas (500, 500);
  doMine = true;
  scene = 1;
  backgroundColor = color (150, 150, 150);
  background (backgroundColor);
}

function draw ()
{
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

function doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

function doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 0);
    myLine (50, 250, 450, 250);
    myLine (250, 50, 250, 450);
    myLine (50, 450, 450, 50);
    myLine (50, 50, 450, 450);
  }
}

function keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
}