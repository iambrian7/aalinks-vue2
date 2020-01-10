<template>
<div id="googlemaps">
     <!--<button @click="addMarker">Add Marker</button> <span>locations from prop len = {{Object.keys(locations).length}}</span>-->
     <div class="hide">{{Object.keys(locations).length}}</div>
     <div id="panel"></div>
    <div style="height:100%; width:100%;">
        <div id="my-map">

        </div>
       
    </div>
</div>
</template>
<script>
export default {
    props: ['locations'],
	data() {
		return {
            map : null,
            markers: [],
            lastInfoWindow: null,
          //  selectedMeeting: this.$store.getters.getSelectedMeeting
    }
  },
  methods: {
      setMapCenter(meeting){
     var self = this
            if (meeting){
                var m = this.markers.filter(function(x){
                    return x.title == meeting.location
                })[0]
                if (m == undefined){
                    return;
                } 
                var bounds  = new google.maps.LatLngBounds();
                //Everytime you add a new marker:
                var loc = new google.maps.LatLng(m.position.lat(), m.position.lng());
                bounds.extend(loc);
                //After all markers have been added:
                this.map.fitBounds(bounds);  //     # auto-zoom
                this.map.panToBounds(bounds);  //   # auto-center
                // google.maps.event.trigger(this.map, "resize");
                // // this.map.setCenter(m.position)
                // this.map.panTo(m.position);
                 this.map.setZoom(14);
                if (self.lastInfoWindow){
                    self.lastInfoWindow.close();
                } else {
                    self.lastInfoWindow = new google.maps.InfoWindow();
                }
                var infowindow = new google.maps.InfoWindow({ maxWidth: 200});
                infowindow.setContent(m.content);
                infowindow.open(this.map, m);
                self.lastInfoWindow = infowindow;
            } else {
                // unselect lastInfoWindow
                if (self.lastInfoWindow){
                    self.lastInfoWindow.close();
                }
                this.map.setZoom(10);
                google.maps.event.trigger(this.map, "resize");
            }
            },
            initMap: function(){
                var position =  {lat: 44.9169913, lng: -93.4435269};
                if (typeof locations !== 'undefined'){
                    position = {lat:propLocation.loc.coordinates[1],lng:propLocation.loc.coordinates[0]}
                console.log(`initMap: locations = ${JSON.stringify(locations,null,3)}`)
                var propLocation = this.locations[0];
                console.log(`initMap: propLocation = ${JSON.stringify(propLocation,null,3)}`)
                } else {
                    console.log('initMap: locations undefined***************************************')
                }

                this.map = new google.maps.Map(document.getElementById('my-map'), {
                    center: position,
                    // center: {lat: 44.9169913, lng: -93.4435269},
                    gestureHandling: 'greedy',
                    zoom: 16
            });
            var self = this;
            //Adding zoom_changed event listener here
            this.map.addListener('zoom_changed', function() {  
                document.getElementById('panel').innerHTML  = `Zoom: ${self.map.getZoom()}`;
                window.setTimeout(function() {  
                document.getElementById('panel').innerHTML = '';
                }, 2000);  
            });  
            google.maps.event.addListener(self.map, 'click', function(event) {
                  if (self.lastInfoWindow){
                    self.lastInfoWindow.close();
                  }
                var mapZoom = self.map.getZoom();
                var startLocation = event.latLng;
            self.$emit('clicked', startLocation)
            });

            function placeMarker() {
                if(mapZoom == self.map.getZoom()){
                    new google.maps.Marker({position: location, map: self.map});
                }
            }
        },
        newMarkerContent:function(meetings){
            var content = "";
            var days = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
            var day, dl;
            var meetingCount = 0;
        // add each meeting to the marker content
           for (var i=0; i<meetings.length; i++){
                var m = meetings[i]
                // add content for this meeting to this unique marker
                    if (m.day != day){
                        content = content.replace("%%cnt%%",meetingCount.toString())
                        meetingCount = 0;
                        if (day) content += "</dl>"
                        content += "<h5>" + days[m.day] + "  %%cnt%%" + " meetings </h5>";
                        content +="<dl>";// + "</dl>");
                        day = m.day;
                    }
                    content+="<dt>"+ m.time_formatted +"</dt>";
                    content+="<dd data-id=" + m.slug + ">"+ m.name +"</dd>";
                    meetingCount++;

            }
            content = content.replace("%%cnt%%",meetingCount.toString())
            if (day) content+="</dl>" // finish up last dl tag
        return content
        },
        makeNewMarkers:function(locations){
            // always delete all markers
            this.markers.forEach(function (m) {
                m.setMap(null);
            })
            this.markers = [];
            if (!locations) return; // no locations so remove all markers
            if (Object.keys(locations).length == 0) {
                console.log("no locations to mark")
                return;
            }
            this.markers.forEach(function (m) {
                m.setMap(null);
            })
            this.markers = [];
            var self = this
            for(var key in locations){
                var m = locations[key]
                var lat = m.loc.coordinates[1]
                var lng = m.loc.coordinates[0]
                var  myLatLng = { lat: lat * 1, lng: lng * 1}
                var latlng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    id: m.location_id,
                    animation: google.maps.Animation.DROP,
                    title: m.location
                });
                marker.content = '<h3>' + m.location + '</h3>' + "<div class='infoWin'>" +  m.address +
                '<br /> ' + m.city + ', MN ' + m.postal_code + '</div>';
                marker.content = marker.content + this.newMarkerContent(m.meetings);
                marker.content = "<div class='top-info-window'>" + marker.content + "</div>";
                google.maps.event.addListener(marker, 'click', (function (mark) {
                return function () {
                    if (self.lastInfoWindow)
                    self.lastInfoWindow.close();
                    else
                    self.lastInfoWindow = new google.maps.InfoWindow();
                    var infowindow = new google.maps.InfoWindow({ maxWidth: 200});
                    infowindow.setContent(mark.content);
                    infowindow.open(this.map, mark);
                    self.lastInfoWindow = infowindow;
                    }
                    })(marker));
            this.markers.push(marker)
        }// end of locations
       
         var self = this;
         if (self.markers.length == 1){
            self.map.setCenter(this.markers[0].getPosition());
         } else {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < self.markers.length; i++) {
            bounds.extend(self.markers[i].getPosition());
            }
            self.map.fitBounds(bounds);
         }
        },
   },
   watch: {
    locations: {
       handler(val){
            // if (typeof locations !== 'undefined'){
            //         position = {lat:propLocation.loc.coordinates[1],lng:propLocation.loc.coordinates[0]}
            //     console.log(`initMap: locations = ${JSON.stringify(locations,null,3)}`)
            //     var propLocation = this.locations[0];
            //     console.log(`initMap: propLocation = ${JSON.stringify(propLocation,null,3)}`)
            //     } else {
            //         console.log('initMap: locations undefined***************************************')
            //     }
           console.log(`locations changed ${JSON.stringify(val)}`)
        this.makeNewMarkers(val);
        },
        deep: true
    },
   },
  computed: {
  },
  mounted: function(){
      var self = this;
      this.initMap();
      this.makeNewMarkers(this.locations);
      this.$store.watch(
            function (state) {
                return state.selectedMeeting;
            },
            function (val) {
                //do something on data change
                if (val){
                    self.setMapCenter(val)
                } else {
                    self.setMapCenter(val)
                }
            },
            {
                deep: true //add this if u need to watch object properties change etc.
            }
        );
  },
  updated:function(){
      this.makeNewMarkers(this.locations);
  }
}

</script>
<style>
    #googlemaps {width: 100%; height: 100%;}    
    #my-map {
        height: 100%; width: 100%;
        }
    .hide { display: none;}
        /* Optional: Makes the sample page fill the window. */
    dt {
        float: left;
        clear: left;
        margin-right: 5px;
        font-weight: bold;
        }
    dd {
        margin-left: 0px;
        }
    h5 { font-size: 1.2em; text-align: left;}
    .top-info-window {
        padding: 5px;
        background: #eee;
    }
    .gm-style-iw {
  width: 300px; 
  min-height: 150px;
}
    .gm-style-iw {padding: 0; margin: 0; border: 1px solid grey; background: #eee;}
    .infowin { background: yellow;}

    #panel {    
        position: absolute;    
        top: 330px;    
        left: 30%;    
        z-index: 5;    
        padding: 0px;    
        border: 0px solid #999;    
        text-align: center; 
        background:#0000FF;
        width:150px;
        color:#fff;
        }    
        
        #panel, .panel {    
        font-family: 'Roboto','sans-serif';    
        line-height: 30px;    
        padding-left: 10px;    
        }    
        
        #panel select, #panel input, .panel select, .panel input {    
        font-size: 15px;    
        }    
        
        #panel select, .panel select {    
        width: 100%;    
        }    
        
        #panel i, .panel i {    
        font-size: 12px;    
        } 
</style>