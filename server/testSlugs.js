const MeetingGuide = require("./routes/MeetingGuide");
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