var path = require('path');
var fs = require('fs');

// const home = {lat:44.9270729,lng:-93.4479148};

var { getLocations, getMeetings, distance, getRegions, getSiteNames, writeFile } = require("./scrapeUtil");

var globalLocations = getLocations();
var globalMeetings = getMeetings();

// var slugToId = {};
// var idToSlug = {};
console.time('mapSlugs')
var [slugToId, idToSlug] = mapSlugs(globalLocations);
// apply slugs to locations
const locations = globalLocations.map(x => {
  x.slug = idToSlug[x.id];
  return x;
})
var [slugToId, idToSlug] = mapSlugs(globalMeetings);
// apply slugs to locations
const meetings = globalMeetings.map(x => {
  x.slug = idToSlug[x.id];
  return x;
})
console.timeEnd('mapSlugs')
console.log(`mapped locations: ${JSON.stringify(locations.slice(0,5), null, 3)}`)
console.log(`mapped meetings: ${JSON.stringify(meetings.slice(0,5), null, 3)}`)

  module.exports = createMeetingGuide;

  function mapSlugs(list){
    const slugs = getSlugs(list);
    var slugId = {};
    var idSlug = {};
    slugs.forEach(x => {
      slugId[x.name] = x.id;
      idSlug[x.id] = x.name;
    });
    return [slugId,idSlug]
  }
 function createMeetingGuide(){
  return {
      globalLocations,
      globalMeetings,
      locations,
      meetings,
      MDmeetings() {
        console.log("create MDmeetings locs len=" + globalLocations.length )
      },
      findMeetings(foundLocations){
        var arrayOfLocIds = foundLocations.map(x => x.id);
        var foundMeetings = globalMeetings.filter(x => arrayOfLocIds.includes(x.locid));
        return foundMeetings;
      },
      slugFind(slug){
        var meeting = meetings.find(x => x.slug == slug)
        return meeting;
      },
      format(meeting,location){
        return MeetingGuideFormat(meeting,location)
      },
      geofind(miles,homelat,homelng){
        var foundLocations = globalLocations.filter(x => distance(homelat,homelng,x.lat,x.lng) < miles);
        var arrayOfLocIds = foundLocations.map(x => x.id);
        var foundMeetings = globalMeetings.filter(x => arrayOfLocIds.includes(x.locid));
        return foundMeetings.map(x => {
            const loc = foundLocations.find(x2 => x2.id == x.locid);
            return MeetingGuideFormat(x,loc)
          })
      },// end geofind
    }
  };
  function getSlugs(list){
    let slugId = 0;
    let lastSlug = '';
    let slugs = list.map((x,i,m) => {
      let n =  uncode(x.name.trim());
      if (n.length == 0){
        n = "anonymous" + slugId++;
      }
      n = n.replace(/[/\\?%*:|"<>',+#;&\s]/g, '');
      if (!isNaN(n) & n.length > 0){
        n = `n${n}`;
      }
      return {name:n,id:x.id}
      });
    slugs.sort((a,b) => {
      var a1 = a.name
      var b1 = b.name
      if (a1 > b1) return 1;
      if (a1 < b1) return -1
      return 0
    });
    var id = 0;
    slugs.forEach((x,i,slugs) => {
      if (slugs[i].name == lastSlug){
        slugId++;
        slugs[i].name += '-' + id++;
      } else {
        id = 0;
        lastSlug = slugs[i].name;
      }
    })
    return slugs;
    // return slugs.slice(5550,5560);
  }
    
  function MeetingGuideFormat(x,loc){
      // parse address
      if (typeof loc.address == "undefined"){
        loc.address = 'notfound,notfound,notfound,notfound,notfound'
      }
      var a = loc.address.split(','); 
      var s = a[2].trim().split(' ');
  return {
    // "_id": x.id,
    "name": uncode(x.name),
    "slug": x.slug,
    // "updated": "2019-10-01T22:34:04.152Z",
    "day": x.day,
    "time": convertTo24Hour(x.time),
    "time_formatted": x.time,
    "id": x.id,
    "location_id": x.locid,
    "location": uncode(loc.name),
    "address": a[0] ? a[0] : 'notfound',
    "city": a[1] ? a[1] : 'notfound',
    "state": s[0] ? s[0] : 'notfound',
    "postal_code": s[1] ? s[1] : 'notfound',
    "country": a[3] ? a[3] : 'notfound',
    "location_notes": "",
    "location_updated": loc.updated,
    // "__v": 0,
    "loc": {
      "type": "Point",
      "coordinates": [
        loc.lng,
        loc.lat
      ]
    },
    "types": x.types
    }
}
function convertTo24Hour(time) {
  if (time == "Noon"){
    return "12:00";
  }
    var hours = parseInt(time.substr(0, 2));
    if(time.indexOf('am') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if(time.indexOf('pm')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(am|pm)/, '');
}

function uncode(value) {
  var x = value.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#039;/g, "'");
  return x;
};