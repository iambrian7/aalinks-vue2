const MeetingGuide = require("./routes/MeetingGuide");
var { getLocations, getMeetings, distance, getRegions, getSiteNames, writeFile, getFile } = require("./routes/scrapeUtil");


const md = MeetingGuide();

md.MDmeetings();
// const locationSlugs = md.meetingSlugs(md.globalLocations);
// console.log("\n\nlocations\n\n*********")
// console.log(locationSlugs);

// console.log("\n\nmeetingss\n\n*********")
// const meetingSlugs = md.meetingSlugs(md.globalMeetings);

// console.log(meetingSlugs);
// console.log("\n\n Testing Location Slugs-----\n")
// testIdSlugs(md.globalLocations, locationSlugs,"locations");

// console.log("\n\n Testing Meeting Slugs-----\n")
// testIdSlugs(md.globalMeetings, meetingSlugs,"meetings");
 testDups(md.globalLocations, "36")

// var loc5589 = getLocids(md.globalMeetings, 5589)
// console.log(`loc5589 = ${JSON.stringify(loc5589, null, 3)}`)
// var loc6336 = getLocids(md.globalMeetings, 6336)
// console.log(`loc6336 = ${JSON.stringify(loc6336, null, 3)}`)
// console.log(`locations 5589=${JSON.stringify(md.globalLocations.filter(x => x.id == 5589),null,3)}`)
// console.log(`locations 6336=${JSON.stringify(md.globalLocations.filter(x => x.id == 6336),null,3)}`)
// function getLocids(meetings,id){
//   return meetings.filter(x => x.locid == id)
// }
function testDups(list, selectedId){
  var base = list
  var foundLocations = [];
  var homelat = 44.927;
  var homelng = -93.448;
  var miles = .8;
  var loc = list.forEach((x,i,arr) => findAll(x,arr));
  foundLocations = loc.filter(x => x.dup)
  console.log(`dups found=${foundLocations.length}`)
  // loc = loc.filter(x => distance(homelat,homelng,x.lat,x.lng) < miles);
  // // var loc = list.filter(x => x.id == selectedId)
  // console.log(`selected id = ${selectedId}  len = ${loc.length}`)
  // console.log(JSON.stringify(loc, null, 3))
}
function findAll(testLocation, arr){
  var found = arr.filter(x => {
   if (testLocation.id != x.id){
     var dist = distance(testLocation.lat,testLocation.lng,x.lat,x.lng) 
     return dist < 0.01
   }
  })
  if (found.length > 0){
    testLocation.dup = true;
  }
}
function testIdSlugs(list,slugs,name){

  slugId = {};
  idSlug = {};
  slugs.forEach(x => {
    slugId[x.name] = x.id;
    idSlug[x.id] = x.name;
    
  })
  console.log('\n\ntest slugId (slug to id) ')
  Object.keys(slugId).forEach((x,i) => {
    if (i < 23){
      var s = slugs.find(slug => slug.name == x);
      var meeting = list.find(m => m.id == slugId[x]);
      
      console.log(` \n\n******** slug = ${x} slug = ${JSON.stringify(s)}`)
      console.log(` found ${name} = ${JSON.stringify(meeting)}`)
      // console.log(`${x}:${slugId[x]}`)
    }
  })
  console.log('\n\ntest idSlug (id to slug) ')
  Object.keys(idSlug).forEach((x,i) => {
    if (i < 30){
      console.log(`${x}:${idSlug[x]}`)
    }
  })
} // end testIdSlugs