const MeetingGuide = require("./routes/MeetingGuide");
const md = MeetingGuide();

md.MDmeetings();
const someSlugs = md.meetingSlugs();
console.log(someSlugs);