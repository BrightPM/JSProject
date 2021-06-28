var Links = {
  SColor : function(color){
  $('a').css('color', color);
    }
  }

var Body = {
  Scolor : function(color){
  $('body').css('color', color);
  },
  SBcolor : function(color){
  $('body').css('backgroundColor', color);
  }
}

function NDHandler(self){
  var target = document.querySelector('body');
  if (self.value === 'night'){
    Body.Scolor('white');
    Body.SBcolor('black');
    self.value = 'day';
    Links.SColor('yellow');
  }
  else{
    Body.Scolor('black');
    Body.SBcolor('white');
    self.value = 'night';
    Links.SColor('blue');
  }
}
