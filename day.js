module.exports=getDay;//Exporting the module so that it can be used by app.js
function getDay(){
let today=new Date();
let currentDay=today.getDay();
let day="";
let options={
  weekday:"long",
  month:"long",
  day:"numeric"
}
day=today.toLocaleDateString("en-US",options);
return day;
}
