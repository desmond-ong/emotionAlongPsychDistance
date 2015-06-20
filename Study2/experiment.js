var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
      || this.searchVersion(navigator.appVersion)
      || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {   string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {   // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
      },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]

};
BrowserDetect.init();



/*
showSlide(id)
Displays each slide
*/

function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

/* 
random(a,b)
Returns random number between a and b, inclusive
*/

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}


/* 
Array.prototype.random
Randomly shuffles elements in an array. Useful for condition randomization.
*/

Array.prototype.random = function() {
  return this[random(this.length)];
}

/* 
Produces an array with numbers 0~arrLength
in random order. Kind of spurious--use 
Array.prototype.random instead
*/

function shuffledArray(arrLength)
{
  var j, tmp;
  var arr = new Array(arrLength);
  for (i = 0; i < arrLength; i++)
  {
    arr[i] = i;
  }
  for (i = 0; i < arrLength-1; i++)
  {
    j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/* 
Gets the value of the checked radio button
*/

function getRadioCheckedValue(formNum, radio_name)
{
   var oRadio = document.forms[formNum].elements[radio_name];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}

function setQuestion(array) {
    var i = random(0, array.length - 1);
    var q = array[i];
    return q;
}


/* 
Clears value from form
*/

function clearForm(oForm) {
    
  var elements = oForm.elements; 
    
  oForm.reset();

  for(i=0; i<elements.length; i++) {
      
	field_type = elements[i].type.toLowerCase();
	
	switch(field_type) {
	
		case "text": 
		case "password": 
		case "textarea":
	        case "hidden":	
			
			elements[i].value = ""; 
			break;
        
		case "radio":
		case "checkbox":
  			if (elements[i].checked) {
   				elements[i].checked = false; 
			}
			break;

		case "select-one":
		case "select-multi":
            		elements[i].selectedIndex = -1;
			break;

		default: 
			break;
	}
    }
}

 Raphael.fn.printWin = function(x, y, num) {
  return this.text(x, y, "Bob won $" + num, this.getFont("Myriad")).attr("font-size", "24");
  };


Raphael.fn.triangle = function(x, y, size) {
  var path = ["M", x, y];
  path = path.concat(["L", (x + size / 2), (y + size)]);
  path = path.concat(["L", (x - size / 2), (y + size)]);
  return this.path(path.concat(["z"]).join(" "));
};

Raphael.fn.pieChart = function (cx, cy, r, ProbValues, PayoffValues, colors, fontSize, stroke) { 
  var paper = this,
  rad = Math.PI / 180,
  chart = this.set();
  

  function sector(cx, cy, r, startAngle, endAngle, params) {
    var x1 = cx + r * Math.cos(-startAngle * rad),
    x2 = cx + r * Math.cos(-endAngle * rad),
    y1 = cy + r * Math.sin(-startAngle * rad),
    y2 = cy + r * Math.sin(-endAngle * rad);
    return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
  }
  function writeInSector(cx, cy, r, angle, PayoffValue, fontSize, params) {
    return paper.text(cx + (r*0.6) * Math.cos(-angle * rad),
      cy + (r*0.6) * Math.sin(-angle * rad),
      "$" + PayoffValue, paper.getFont("Myriad")).attr("font-size", fontSize);
  }

  var angle = 0,
  total = 0,
  start = 0,
  chosenColors = [],
  process = function (j) {
    var value = ProbValues[j],
    angleplus = 360 * value / total,
    popangle = angle + (angleplus / 2),
    color_name = 0;
    ms = 500,
    delta = 30,
    bcolor = Raphael.hsb(start, 1, 1),
    // color="90-" + bcolor + "-" + Raphael.hsb(start, .75, 1);
      
      color = colors[j].color;
    var p = sector(cx, cy, r, angle, angle + angleplus, {fill: color, stroke: stroke, "stroke-width": 10});
    p.start = angle;
    p.end =  angle + angleplus;
    var pFont = writeInSector(cx, cy, r, angle+angleplus/2, PayoffValues[j], fontSize);
    p.color_name =  color_name;
    p.val= Math.round(100*(value/total));
    angle += angleplus;

    chart.push(p);
    chart.push(pFont);
    

    start += .1;
  };
  for (var i = 0, ii = ProbValues.length; i < ii; i++) {
    total += ProbValues[i];
  }
  for (i = 0; i < ii; i++) {
    process(i);
  }
  return chart;
};





// Input Data for the wheel



var allConditions = [
[
{"condition":1, "Version":"58", "SpinnerID":"1",  "probabilityVector":[.38, .36, .26],  "payoffVector":[0, 30, 60],   "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"2",  "probabilityVector":[.42, .31, .27],  "payoffVector":[0, 30, 60],   "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"3",  "probabilityVector":[.41, .37, .22],  "payoffVector":[0, 30, 60],   "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"4",  "probabilityVector":[.5, .31, .19],   "payoffVector":[10, 35, 75],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"5",  "probabilityVector":[.515, .3, .185], "payoffVector":[10, 35, 75],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"6",  "probabilityVector":[.5, .32, .18],   "payoffVector":[10, 35, 75],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"7",  "probabilityVector":[.47, .28, .25],  "payoffVector":[15, 70, 80],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"8",  "probabilityVector":[.49, .27, .24],  "payoffVector":[15, 70, 80],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"9",  "probabilityVector":[.45, .29, .26],  "payoffVector":[15, 70, 80],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"10", "probabilityVector":[.43, .39, .18],  "payoffVector":[20, 45, 70],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"11", "probabilityVector":[.41, .35, .24],  "payoffVector":[20, 45, 70],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"12", "probabilityVector":[.40, .34, .26],  "payoffVector":[20, 45, 70],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"13", "probabilityVector":[.31, .25, .44],  "payoffVector":[30, 50, 95],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"14", "probabilityVector":[.33, .29, .38],  "payoffVector":[30, 50, 95],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"15", "probabilityVector":[.30, .30, .40],  "payoffVector":[30, 50, 95],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"16", "probabilityVector":[.45, .37, .18],  "payoffVector":[25, 60, 100], "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"17", "probabilityVector":[.42, .38, .20],  "payoffVector":[25, 60, 100], "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"18", "probabilityVector":[.43, .35, .22],  "payoffVector":[25, 60, 100], "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"19", "probabilityVector":[.31, .32, .37],  "payoffVector":[25, 45, 80],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"20", "probabilityVector":[.26, .32, .42],  "payoffVector":[25, 45, 80],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"21", "probabilityVector":[.30, .30, .40],  "payoffVector":[25, 45, 80],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"22", "probabilityVector":[.32, .16, .52],  "payoffVector":[20, 60, 90],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"23", "probabilityVector":[.34, .22, .44],  "payoffVector":[20, 60, 90],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"24", "probabilityVector":[.33, .20, .47],  "payoffVector":[20, 60, 90],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"25", "probabilityVector":[.21, .36, .43],  "payoffVector":[15, 50, 75],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"26", "probabilityVector":[.24, .40, .36],  "payoffVector":[15, 50, 75],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"27", "probabilityVector":[.25, .38, .37],  "payoffVector":[15, 50, 75],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"28", "probabilityVector":[.36, .40, .24],  "payoffVector":[40, 65, 100], "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"29", "probabilityVector":[.38, .34, .28],  "payoffVector":[40, 65, 100], "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"30", "probabilityVector":[.37, .32, .31],  "payoffVector":[40, 65, 100], "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"31", "probabilityVector":[.54, .30, .16],  "payoffVector":[45, 60, 90],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"32", "probabilityVector":[.52, .29, .19],  "payoffVector":[45, 60, 90],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"33", "probabilityVector":[.50, .30, .20],  "payoffVector":[45, 60, 90],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"34", "probabilityVector":[.43, .23, .34],  "payoffVector":[30, 50, 90],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"35", "probabilityVector":[.41, .24, .35],  "payoffVector":[30, 50, 90],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"36", "probabilityVector":[.39, .25, .36],  "payoffVector":[30, 50, 90],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"37", "probabilityVector":[.28, .19, .53],  "payoffVector":[20, 50, 90],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"38", "probabilityVector":[.30, .18, .52],  "payoffVector":[20, 50, 90],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"39", "probabilityVector":[.32, .18, .50],  "payoffVector":[20, 50, 90],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"40", "probabilityVector":[.27, .38, .35],  "payoffVector":[0, 40, 95],   "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"41", "probabilityVector":[.27, .40, .33],  "payoffVector":[0, 40, 95],   "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"42", "probabilityVector":[.26, .42, .32],  "payoffVector":[0, 40, 95],   "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"43", "probabilityVector":[.55, .28, .17],  "payoffVector":[10, 50, 75],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"44", "probabilityVector":[.58, .24, .18],  "payoffVector":[10, 50, 75],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"45", "probabilityVector":[.60, .24, .16],  "payoffVector":[10, 50, 75],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"46", "probabilityVector":[.26, .53, .21],  "payoffVector":[55, 70, 85],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"47", "probabilityVector":[.28, .51, .21],  "payoffVector":[55, 70, 85],  "winChoice":2},
{"condition":1, "Version":"58", "SpinnerID":"48", "probabilityVector":[.25, .52, .23],  "payoffVector":[55, 70, 85],  "winChoice":3},
{"condition":1, "Version":"58", "SpinnerID":"49", "probabilityVector":[.30, .52, .18],  "payoffVector":[50, 75, 90],  "winChoice":1},
{"condition":1, "Version":"58", "SpinnerID":"50", "probabilityVector":[.32, .50, .18],  "payoffVector":[50, 75, 90],  "winChoice":2}
],
[
{"condition":2, "probabilityVector":[.1, .2, .7], "payoffVector":[10, 8, 3], "winChoice":2},
]
];






/* Experimental Variables */
// Number of conditions in experiment
var numConditions = 1; //allConditions.length;

// Randomly select a condition number for this particular participant
var chooseCondition = 1; // random(0, numConditions-1);

// Based on condition number, choose set of input (trials)
var allTrialOrders = allConditions[chooseCondition-1];

// Number of trials in each condition
var numTrials = 10; //not necessarily allTrialOrders.length;

// Produce random order in which the trials will occur
var shuffledOrder = shuffledArray(allTrialOrders.length);

// Keep track of current trial 
var currentTrialNum = 0;

// A variable special for this experiment because we're randomly
// choosing word orders as well
// var wordOrder = 100;
var trial;

// Keep track of how many trials have been completed
var numComplete = 0;

var numQuestionnaireComplete = 0;


var colors = [{color_name:"AliceBlue",color:"#F0F8FF"}, 
            {color_name:"AntiqueWhite",color:"#FAEBD7"},
            {color_name:"Aqua",color:"#00FFFF"},
            {color_name:"Aquamarine",color:"#7FFFD4"},
            {color_name:"Bisque",color:"#FFE4C4"},
            {color_name:"Chocolate",color:"#D2691E"},
            {color_name:"CornflowerBlue",color:"#6495ED"},
            {color_name:"Crimson",color:"#DC143C"},
            {color_name:"DarkCyan",color:"#008B8B"},
            {color_name:"DarkGoldenRod",color:"#B8860B"},
            {color_name:"DarkKhaki",color:"#BDB76B"},
            {color_name:"DarkOliveGreen",color:"#556B2F"},
            {color_name:"DarkOrange",color:"#FF8C00"},
            {color_name:"DarkSalmon",color:"#E9967A"},
            {color_name:"DeepPink",color:"#FF1493"},
            {color_name:"DeepSkyBlue",color:"#00BFFF"},
            {color_name:"DodgerBlue",color:"#1E90FF"},
            {color_name:"ForestGreen",color:"#228B22"},
            {color_name:"Gold",color:"#FFD700"},
            {color_name:"GoldenRod",color:"#DAA520"},
            {color_name:"Gray",color:"#808080"},
            {color_name:"GreenYellow",color:"#ADFF2F"},
            {color_name:"IndianRed",color:"#CD5C5C"},
            {color_name:"Khaki",color:"#F0E68C"},
            {color_name:"Lavender",color:"#E6E6FA"},
            {color_name:"LemonChiffon",color:"#FFFACD"},
            {color_name:"LightBlue",color:"#ADD8E6"},
            {color_name:"LightCoral",color:"#F08080"},
            {color_name:"LightCyan",color:"#E0FFFF"},
            {color_name:"LightGray",color:"#D3D3D3"},
            {color_name:"MistyRose",color:"#FFE4E1"},
            {color_name:"Orange",color:"#FFA500"},
            {color_name:"OrangeRed",color:"#FF4500"},
            {color_name:"PaleGoldenRod",color:"#EEE8AA"},
            {color_name:"PaleGreen",color:"#98FB98"},
            {color_name:"PaleTurquoise",color:"#AFEEEE"},
            {color_name:"PaleVioletRed",color:"#DB7093"},
            {color_name:"PeachPuff",color:"#FFDAB9"},
            {color_name:"Peru",color:"#CD853F"},
            {color_name:"Pink",color:"#FFC0CB"},
            {color_name:"Plum",color:"#DDA0DD"},
            {color_name:"PowderBlue",color:"#B0E0E6"},
            {color_name:"SeaGreen",color:"#2E8B56"},
            {color_name:"Sienna",color:"#A0522D"},
            {color_name:"Silver",color:"#C0C0C0"},
            {color_name:"SteelBlue",color:"#4682B4"},
            {color_name:"Tan",color:"#D2B48C"},
            {color_name:"Tomato",color:"#FF6347"},
            {color_name:"Turquoise",color:"#40E0D0"},
            {color_name:"YellowGreen",color:"#9ACD32"}
            ];



/*
Show the instructions slide — this is what we want subjects to see first.
*/

$("#progressBar").hide();
showSlide("instructions");





// http://irunmywebsite.com/jQuery/voter.php
function mySliderFunction(paper, x1, y1, pathString, colour, pathWidth, iOSCircle1, iOSCircle2, LCircleEdge, RCircleEdge) {
    //var paper = this;
    var slider = paper.set();
    var sliderOut=function(pcOut){ if(sliderOutput){ sliderOutput(pcOut); } };
    var position=0;
    slider.currentValue=0;
    //var percentageMax=percentageMax?percentageMax:100;
    slider.push(paper.path("M"+x1+" "+y1+pathString)).attr( {stroke:colour,"stroke-width": pathWidth } );
    slider.PathLength   = slider[0].getTotalLength();
      
      initialValue = 0;

    slider.PathPointOne   = slider[0].getPointAtLength(position);
    slider.PathPointTwo   = slider[0].getPointAtLength(slider.PathLength);
    slider.PathBox      = slider[0].getBBox();
    slider.PathBoxWidth   = slider.PathBox.width;
    slider.push(paper.circle(slider.PathPointOne.x, slider.PathPointOne.y, pathWidth/2).attr(   {fill:colour, "stroke-width": 0,"stroke-opacity": 0 }) );         
    slider.push(paper.circle(slider.PathPointTwo.x, slider.PathPointTwo.y, pathWidth/2).attr(   {fill:colour, "stroke-width": 0,"stroke-opacity": 0 }) );
    /*Slider Button*/
    sButtonBack=paper.circle(slider.PathPointOne.x, slider.PathPointOne.y, pathWidth);
    sButtonBack.attr({ fill: "#777","stroke-width": 1,"fill-opacity": 1, stroke: "#000"  } );
    sButtonBack.attr({r:(15)});
    slider.push(sButtonBack);   
    sliderText=paper.text(slider.PathPointOne.x,slider.PathPointOne.y,initialValue ).attr({fill:'#FFF', 'font-size':16, 'stroke-width':0 });
    slider.push(sliderText);
    sButton=paper.circle(slider.PathPointOne.x, slider.PathPointOne.y, pathWidth);
    sButton.attr({    fill: "#777","stroke-width": 1,"fill-opacity": 0.1, stroke: "#000"  } );
    sButton.attr({r:(15)});
    
    //sButton.mouseout(function (e) { this.attr({"fill-opacity": 0.1, "stroke-width":1}); });
    //sButton.mouseover(function (e){ this.attr({"fill-opacity": 0.3, "stroke-width":3}); });   
    var start = function ()
    {
      this.ox = this.attr("cx");
    },
    move = function (dx, dy)
    {
      //if ((this.ox+dx-x1)/slider.PathBoxWidth) {
        pcAlongLine = (this.ox+dx-x1)/slider.PathBoxWidth;
      //} else {
      //  pcAlongLine = 0;
      //}
      //if (slider[0].getPointAtLength(pcAlongLine*slider.PathLength)) {
        slider.PathPointOne = slider[0].getPointAtLength(pcAlongLine*slider.PathLength);
      //} else {
      //  slider.PathPointOne = slider[0].getPointAtLength(0);
      //}
      if (!slider.PathPointOne.x) {
        slider.PathPointOne.x=x1;
      }
      if (!slider.PathPointOne.y) {
        slider.PathPointOne.y=y1;
      }
      att = {cx: slider.PathPointOne.x, cy: slider.PathPointOne.y};
      this.attr(att);sButtonBack.attr(att);
      if (Math.round(((this.attr("cx")-slider.PathBox.x)/slider.PathBox.width)*100)) {
        slider.currentValue=Math.round(((this.attr("cx")-slider.PathBox.x)/slider.PathBox.width)*100);  
      } else {
        slider.currentValue=0;
      }
      
      sliderText.attr({text:slider.currentValue,x: slider.PathPointOne.x, y: slider.PathPointOne.y});
      bbox=sliderText.getBBox();
//      sButton.attr({r:(bbox.width/2)});
//      sButtonBack.attr({r:(bbox.width/2)});
      sButton.attr({r:(15)});
      sButtonBack.attr({r:(15)});
      sliderOut(slider.currentValue);
    },
    up = function () 
    {
      // 
    };  
    sliderOutput=function(currentValue)
    { 
      var scale = (RCircleEdge - LCircleEdge)/100/2;
      //var scale = 500/200;
      //spinnerOutcome.transform("t" + currentAngle + " " + 256 + " " + 150); 
      iOSCircle1.transform("t" + currentValue*scale + ",0"); 
      iOSCircle2.transform("t-" + currentValue*scale + ",0"); 


    };

    returnValue = function() {
      return currentValue;
    }

    sButton.drag(move, start, up);
    slider.push(sButton);                     
        return slider;
    };




// Updates the progress bar
$("#trial-num").html(numComplete);
$("#total-num").html(numTrials);

/*
The actual variable that will be returned to MTurk. The experiment object with various variables that you want to keep track of and return as results.

More practically, you should stick everything in an object and submit that whole object so that you don’t lose data (e.g. randomization parameters, what condition the subject is in, etc). Don’t worry about the fact that some of the object properties are functions — mmturkey (the Turk submission library) will strip these out.
*/

var socialDistanceValues = [1,3,5,7,9];

var experiment = {

/*
Parameters for this sequence.
*/
  condition: 1,

  startTime: 0,
  endTime: 0,

  // socialDistance: Math.ceil(Math.random()*9),
  socialDistance: socialDistanceValues[Math.floor(Math.random()*5)],
  closeness: -1,
  iOS: -1,
  srSimilarity: -1,
  srLiking: -1,
  srEmpathy: -1,

  // An array of subjects' responses to each trial (NOTE: in the order in which
  // you initially listed the trials, not in the order in which they appeared)
  //results: new Array(numTrials),

  // The order in which each trial appeared
  //orders: new Array(numTrials),

  // The order in which each trial is presented. i.e. 
  // presentationOrder[i] = j means the i-th trial is the j-th one in the trial sequence.
  // Note that presentationOrder is now obsolete with spinnerIDArray
  // presentationOrder: new Array(numTrials),

  spinnerIDArray: new Array(numTrials),
  payoff1Array: new Array(numTrials),
  payoff2Array: new Array(numTrials),
  payoff3Array: new Array(numTrials),
  prob1Array: new Array(numTrials),
  prob2Array: new Array(numTrials),
  prob3Array: new Array(numTrials),
  winChoiceArray: new Array(numTrials),
  winArray: new Array(numTrials),
  winProbArray: new Array(numTrials),
  
  // My Results:
  q1responseArray: new Array(numTrials),
  q2responseArray: new Array(numTrials),
  q3responseArray: new Array(numTrials),
  q4responseArray: new Array(numTrials),
  q5responseArray: new Array(numTrials),
  q6responseArray: new Array(numTrials),
  q7responseArray: new Array(numTrials),
  q8responseArray: new Array(numTrials),
  
  angleProportionArray: new Array(numTrials),


  reactionTimeArray: new Array(numTrials),

  // Demographics
  BFIArray: new Array(10),
  BFIAttentionCheckArray: new Array(10),
  BFItargetSimilarityArray: new Array(10),
  charName: "",
  gender: "",
  age:"",
  nativeLanguage:"",
  browser: BrowserDetect.browser,
  comments:"",

 //trials: myTrialOrder,

/*
An array to store the data that we’re collecting.
*/

  data: [],

// Goes to description slide
  description: function() {
    experiment.closeness = (10-experiment.socialDistance);
    $("#socialDist").html(experiment.closeness*10);

    for (j=0; j < 10; j++) {
      if(j < experiment.closeness) {
        experiment.BFItargetSimilarityArray[j] = 1;
      } else {
        experiment.BFItargetSimilarityArray[j] = 0;
      }
    }

    experiment.BFItargetSimilarityArray = shuffleArray(experiment.BFItargetSimilarityArray);

    //$("#progressBar").show();
    showSlide("description");
    $("#tot-num").html(numTrials);

    if (turk.previewMode) {
      alert ( "Please accept the HIT before continuing." );;
    } 
  },

  showMatch: function() {
    var charNameList = ["Alex", "Bob", "Charlie", "Chris", 
        "David", "Eric", "Frank", "George", "Jacob", "Jake", 
        "James", "John", "Josh", "Mike", "Scott", "Steve", "Tom", 
        "Will", "Zach", "Vince", "Ted", "Sean", "Ron", "Peter", 
        "Paul", "Mark", "Joe", "Nick", "Carl", "Kevin"];

    // function refreshCharName() {
    //     return(charNameList[Math.floor(Math.random()*charNameList.length)]);
    // };
    // experiment.charName = refreshCharName();    
    experiment.charName = charNameList[Math.floor(Math.random()*charNameList.length)];
    $('#CharName1').html(experiment.charName);
    $('#CharName2').html(experiment.charName);
    $('#CharName3').html(experiment.charName);
    $('#CharName4').html(experiment.charName);
    $('#CharName5').html(experiment.charName);
    $('#CharName6').html(experiment.charName);
    $('#CharName7').html(experiment.charName);
    $('#CharName8').html(experiment.charName);
    $('#CharName9').html(experiment.charName);
    $('#CharName10').html(experiment.charName);
    $('#CharName11').html(experiment.charName);


    showSlide("match");
  },

// Goes to starting questionnaire slide
  startingQuestionnaire: function() {
    showSlide("startingQuestionnaire");
    $("#questionnaireFeedback").hide();
    $("#questionnaire1").show();
    
    if(numQuestionnaireComplete>0) {
      experiment.BFIArray[numQuestionnaireComplete-1] = $('input[name="BFIq"]:checked').val();
      experiment.BFIAttentionCheckArray[numQuestionnaireComplete-1] = $('input[name="BFIqCheck"]:checked').val();

      $('input[name="BFIq"]:').prop('checked', false);
      $('input[name="BFIqCheck"]:').prop('checked', false);
    }
    if(numQuestionnaireComplete==10) {
      experiment.endQuestionnaire();
    }

    switch(numQuestionnaireComplete) {
      case 0:
      bfiQuestion="Q1: I see myself as someone who is reserved";
        break;
      case 1:
        bfiQuestion="Q2: I see myself as someone who is generally trusting";
        break;
      case 2:
        bfiQuestion="Q3: I see myself as someone who tends to be lazy";
        break;
      case 3:
        bfiQuestion="Q4: I see myself as someone who is relaxed and handles stress well";
        break;
      case 4:
        bfiQuestion="Q5: I see myself as someone who has few artistic interests";
        break;
      case 5:
        bfiQuestion="Q6: I see myself as someone who is outgoing and sociable";
        break;
      case 6:
        bfiQuestion="Q7: I see myself as someone who tends to find fault with others";
        break;
      case 7:
        bfiQuestion="Q8: I see myself as someone who does a thorough job";
        break;
      case 8:
        bfiQuestion="Q9: I see myself as someone who gets nervous easily";
        break;
      case 9:
        bfiQuestion="Q10: I see myself as someone who has an active imagination";
        break;
    }

    if(experiment.BFItargetSimilarityArray[numQuestionnaireComplete]==1) {
      $('#feedbackText').html("gave the same answer as you");
    } else {
      $('#feedbackText').html("gave a different answer from you");
    }

    $('#questionText').html(bfiQuestion);
    $('#questionText2').html(bfiQuestion);
    numQuestionnaireComplete++;
  },

  startingQuestionnaireFeedback: function() {
    $("#questionnaire1").hide();
    $("#questionnaireFeedback").show();
  },

  endQuestionnaire: function() {

    // experiment.birthMonth = $('input[name="birthMonthButton"]:checked').val();
    // experiment.ssnLastDigit = $('input[name="ssnButton"]:checked').val();
    // experiment.gender = $('input[name="genderButton"]:checked').val();
    // experiment.age = $('input[name="ageRange"]:checked').val();
    // experiment.firstLetterName = $('input[name="nativeLanguage"]').val();

    // experiment.BFIArray[0] = $('input[name="BFIq1"]:checked').val();
    // experiment.BFIArray[1] = $('input[name="BFIq2"]:checked').val();
    // experiment.BFIArray[2] = $('input[name="BFIq3"]:checked').val();
    // experiment.BFIArray[3] = $('input[name="BFIq4"]:checked').val();
    // experiment.BFIArray[4] = $('input[name="BFIq5"]:checked').val();
    // experiment.BFIArray[5] = $('input[name="BFIq6"]:checked').val();
    // experiment.BFIArray[6] = $('input[name="BFIq7"]:checked').val();
    // experiment.BFIArray[7] = $('input[name="BFIq8"]:checked').val();
    // experiment.BFIArray[8] = $('input[name="BFIq9"]:checked').val();
    // experiment.BFIArray[9] = $('input[name="BFIq10"]:checked').val();

    // experiment.next();


    showSlide("manipCheck");

    // setting up the iOS Slider
    iOSCanvas = Raphael('iOSDiv');
    LCircleEdge = 130;
    RCircleEdge = 350;
    circleYCoord = 125;
    LCircleColor = "#f90";
    RCircleColor = "#09f";
    //spinnerOutcome = iOSCanvas.triangle(750,50,15);
    iOSCircle1 = iOSCanvas.set();
    iOSCircle2 = iOSCanvas.set();

    iOSCircle1.push(iOSCanvas.circle(LCircleEdge, circleYCoord, 100).attr({ fill: LCircleColor,"stroke-width": 1,"fill-opacity": 0.4, stroke: "#000" } ));
    iOSCircle2.push(iOSCanvas.circle(RCircleEdge, circleYCoord, 100).attr({ fill: RCircleColor,"stroke-width": 1,"fill-opacity": 0.4, stroke: "#000" } ));

    //iOSCircle1.push(iOSCanvas.text(LCircleEdge-100, circleYCoord-100, "Self").attr({ fill: LCircleColor, "font-size": 24 })  );
    //iOSCircle2.push(iOSCanvas.text(RCircleEdge+100, circleYCoord-100, "Other").attr({ fill: RCircleColor, "font-size": 24 })  );
    iOSCircle1.push(iOSCanvas.text(LCircleEdge-100, circleYCoord-100, "You").attr({ fill: LCircleColor, "font-size": 24 })  );
    iOSCircle2.push(iOSCanvas.text(RCircleEdge+100, circleYCoord-100, experiment.charName).attr({ fill: RCircleColor, "font-size": 24 })  );

    rotateSlider = mySliderFunction(iOSCanvas, LCircleEdge, circleYCoord+175, 'h200',"#AAAAAA", 15, iOSCircle1, iOSCircle2, LCircleEdge, RCircleEdge);
  },





/*
The function that gets called when the sequence is finished.
*/

  end: function() {
  	// Records demographics
    experiment.gender = $('input[name="genderButton"]:checked').val();
    //experiment.age = $('select[name="ageRange"]').val();
    experiment.age = $('#ageRange').val();
    experiment.nativeLanguage = $('input[name="nativeLanguage"]').val();
    experiment.comments = $('textarea[name="commentsTextArea"]').val();

    // Show the finish slide.
    showSlide("finished");

    /*
    Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we’re just submitting properties [i.e. data])
    */
    setTimeout(function() { turk.submit(experiment);}, 1500);
  },


  afterManipCheck: function() {
    experiment.iOS = rotateSlider.currentValue;
    experiment.srSimilarity = $('input[name="similarityQ"]:checked').val();
    experiment.srLiking = $('input[name="likingQ"]:checked').val();
    experiment.srEmpathy = $('input[name="empathyQ"]:checked').val();
    
    showSlide("briefing");
  },
  


  next: function() {
    var winningAngle;
    var probabilityVectorTotal;
    var angleStart;
    var angleEnd;
    var randProportion;
    var bobStickFigure, hand, spinner, goButton, goButtonLabel;

  showSlide("stage");
  $("#response").hide();
  
  if (numComplete == 0) { // First trial: create canvas.
      canvas=Raphael('wheel');
      $("#progressBar").show();
  }
  
  // If this is not the first trial, record variables
  if (numComplete > 0) {
    canvas.clear();

            //var rating = parseFloat(document.rating.score.value);
            //experiment.results[currentTrialNum] = rating;
            //experiment.orders[currentTrialNum] = numComplete;
            //experiment.wordOrders[currentTrialNum] = wordOrder;
            
            //experiment.isPuns[currentTrialNum] = trial.isPun;
            //experiment.isCorrects[currentTrialNum] = trial.isCorrect;

            //experiment.presentationOrder[numComplete-1] = currentTrialNum;

            experiment.q1responseArray[numComplete-1] = $('input[name="q1"]:checked').val();
            experiment.q2responseArray[numComplete-1] = $('input[name="q2"]:checked').val();
            experiment.q3responseArray[numComplete-1] = $('input[name="q3"]:checked').val();
            experiment.q4responseArray[numComplete-1] = $('input[name="q4"]:checked').val();
            experiment.q5responseArray[numComplete-1] = $('input[name="q5"]:checked').val();
            experiment.q6responseArray[numComplete-1] = $('input[name="q6"]:checked').val();
            experiment.q7responseArray[numComplete-1] = $('input[name="q7"]:checked').val();
            experiment.q8responseArray[numComplete-1] = $('input[name="q8"]:checked').val();


            experiment.endTime = (new Date()).getTime();
            experiment.reactionTimeArray[numComplete-1] = experiment.endTime - experiment.startTime;

            experiment.data.push(trial);
            
            $('input[name="q1"]:').prop('checked', false);
            $('input[name="q2"]:').prop('checked', false);
            $('input[name="q3"]:').prop('checked', false);
            $('input[name="q4"]:').prop('checked', false);
            $('input[name="q5"]:').prop('checked', false);
            $('input[name="q6"]:').prop('checked', false);
            $('input[name="q7"]:').prop('checked', false);
            $('input[name="q8"]:').prop('checked', false);
            
          }
        // If subject has completed all trials, update progress bar and
        // show slide to ask for demographic info
        if (numComplete >= numTrials) {
          $('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
          $("#trial-num").html(numComplete);
          $("#total-num").html(numTrials);
          showSlide("askInfo");
          // showSlide("manipCheck");

        // Otherwise, if trials not completed yet, update progress bar
        // and go to next trial based on the order in which trials are supposed
        // to occur
      } else {
        $('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
        $("#trial-num").html(numComplete);
        $("#total-num").html(numTrials);


        //currentTrialNum is used for randomizing later
        currentTrialNum = shuffledOrder[numComplete]; //numComplete //allTrialOrders[numComplete];
        trial = allTrialOrders[currentTrialNum];

        probabilityVector = trial.probabilityVector;
        payoffVector = trial.payoffVector;
        winChoice = trial.winChoice;
        
        // simple routine to calculate win angle.
        // normalizing 
        probabilityVectorTotal=0;
        angleStart = 0;
        for (var i = 0; i < probabilityVector.length; i++) {
          probabilityVectorTotal += probabilityVector[i];
          if (i<winChoice-1) {
            angleStart += probabilityVector[i];
          };
        };
        for (var i = 0; i < probabilityVector.length; i++) {
          probabilityVector[i] = probabilityVector[i] / probabilityVectorTotal;
        }
        angleStart = angleStart / probabilityVectorTotal;
        angleEnd = angleStart + probabilityVector[winChoice-1];
        // now the desired winning angle is between [angleStart, angleEnd] * 360 degrees
        randProportion = Math.random();
        // calculate winning angle = uniform draw from [angleStart, angleEnd] * 360 degrees
        // plus 5-10 rounds. Remember to offset - 90 degrees because the angles are calculated
        // from the positive x axis while the pointer is along the positive y axis.
        winningAngle = ((angleStart * (1-randProportion) + angleEnd * randProportion) 
        + 5 + Math.floor(Math.random()*5)) * 360 - 90;

            experiment.spinnerIDArray[numComplete] = trial.SpinnerID;
            experiment.payoff1Array[numComplete] = payoffVector[0] ;
            experiment.payoff2Array[numComplete] = payoffVector[1] ;
            experiment.payoff3Array[numComplete] = payoffVector[2] ;
            experiment.prob1Array[numComplete] = probabilityVector[0] ;
            experiment.prob2Array[numComplete] = probabilityVector[1] ;
            experiment.prob3Array[numComplete] = probabilityVector[2] ;
            experiment.angleProportionArray[numComplete] = Math.round(randProportion*1000)/1000;
            experiment.winChoiceArray[numComplete] = winChoice;
            experiment.winArray[numComplete] = payoffVector[winChoice-1];
            experiment.winProbArray[numComplete] = probabilityVector[winChoice-1];
            
        
        //canvas.printWin(canvas.width/2 + 135, 150, payoffVector[winChoice])
        // Adds pointer
        canvas.triangle(canvas.width/2, 5, 15).attr({
          "fill": "black", 
          "stroke": 0}).transform("r180");
        
        chosenColorsNum = shuffledArray(colors.length);
        //chosenColorsNum = [];
        chosenColors = [];
        for (var l = 0; l<3; l++) {
        //  pickedColorNum = Math.floor(Math.random()*colors.length);
        //  for (var k = 0; k<l; k++) {
        //    while (pickedColorNum == chosenColorsNum[k]) {
        //      pickedColorNum = Math.floor(Math.random()*colors.length);
        //    }
        //  }
        //  chosenColorsNum[l] = pickedColorNum;
          chosenColors[l] = colors[chosenColorsNum[l]];
        }

        // Creates spinner
        spinner = canvas.pieChart(canvas.width/2, 150, 125, probabilityVector, payoffVector,
          chosenColors, 24);

        bobStickFigure = canvas.image("https://www.stanford.edu/~dco/common/images/bob.jpeg", canvas.width/4-15, 70, 52, 128);
        hand = canvas.image("https://www.stanford.edu/~dco/common/images/hand.png", canvas.width/4 + 12, 112, 64, 48).transform("r90");



        goButton = canvas.rect(canvas.width/4-20,20,90,25,0).attr({fill: "#0f0"});
        goButtonLabel = canvas.text(canvas.width/4+25,10,"Go!");

        goButton.click(function() {
          hand.animate(
            {transform: "r90,T" + (canvas.width/4 - 170) + ",0"}, 750, '<>',  
              function() {
                hand.animate({transform: "r90,T" + (canvas.width/4 - 230) + ",0"}, 1000, '<>');
                spinner.animate(
                  {transform: "r" + winningAngle + " " + canvas.width/2 + " " + 150}, 2500, '>',
                  afterSpin)
                  }
              )
        });

        /*
        spinner.click(function() {
        spinner.animate(
          {transform: "r" + winningAngle + " " + canvas.width/2 + " " + 150}, 6000, '>',
          afterSpin)
        });
         spinner.animate({transform: "r" + amount_in_degrees + " " + center_x
         + " " + center_y}, duration_in_milliseconds, easing_formula, optional_callback);
        */

        function afterSpin() {
          var winningPayoff = payoffVector[winChoice-1];
          $('#Outcome').html(winningPayoff);
          $("#response").show(); 
          //setTimeout(function(){$("#response").show(); $('#response').text("The results is:" + winningPayoff);}, 6000);
          //$('#response').text("The results is:  " + winningPayoff);
          //document.getElementById("response").innerText(charName + "has won $" + winningPayoff);
          //document.write(charName) document.write(winningPayoff)
          experiment.startTime = (new Date()).getTime();
        }

            numComplete++;
          }
            
  }

};