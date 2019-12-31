<template>
    <div class="add-meeting">
      <div class="add-meeting-info">
        <h1>Add a Meeting Here</h1>
        <h3>Please select the required fields:</h3>
      </div>
      <!-- group_name: "new group",
      day: '1',
      time:'7:00 PM',
      type: 'Open',
      gender: 'Men/Women',
      format: 'Big Book', -->
        <form @submit.prevent="signUp" class="aalinks-form">
            <div class="aalinks-form-name">
              <!-- <div class="form-group col-sm-4"> -->
                <label>Group Name
                  <input type="text"  v-model="newmeeting.group.group_name" >
                </label>
                <!-- <div v-bind:class="{'col-6': true, 'has-danger': errors.has('firstName')}">
                  <input id="name" name="name" type="text" class="form-control" placeholder="Group Name.." v-model="newmeeting.group.group_name" v-validate="'required|min:5'">
                  <span class=" error text-danger" v-if="errors.has('name')">{{errors.first('name')}}</span>
                </div> -->
              </div>
              <div class="aalinks-form-day-time">
                <!-- <div class="form-group col-sm-4"> -->
                  <label>Day</label>
                  <!-- <div class="input-group"> -->
                    <select   v-model="newmeeting.group.day" name="day" class="form-control" >
                      <option value="0">Sunday</option><option selected value="1">Monday</option>
                      <option value="2">Tuesday</option><option value="3">Wednesday</option>
                      <option value="4">Thursday</option><option value="5">Friday</option> <option value="6">Saturday</option>
                    </select>
                  <!-- </div> -->
                </div>
                <!-- <div class="form-group col-sm-4"> -->
                <div class="aalinks-form-group">
                  <label>Time</label>
                  <select type="text"  v-model="newmeeting.group.time" id="time" name='time' class="form-control">
                    <option v-for="n in selectTimes" :value="n" :key="n">{{ n }}</option>
                  </select>
                </div>
                
                <!-- <div class="form-group col-sm-4"> -->
                <!-- <div class="aalinks-form-group"> -->
                    <!-- <button class="btn btn-primary" type="submit">Next</button> -->
                <!-- </div> -->
        </form>
        <!-- <div v-if="state==2" class="location-container"> -->
          <!-- </div> -->
          <!-- <div class="col-md-6">
            <google-map :locations="newlocations" @clicked="onClickMap"></google-map>
          </div> -->
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 form-background">       
                    <add-meetingselect :formAddress="newmeeting.location" @chkecklocation="ckLocation"></add-meetingselect>
                  <div class="map-error" v-if="addressError">Location form is not valid</div>
                  <div v-if="newmeeting.location.mapped_address" class="map-results">
             <p>       Form formatted this address: {{address}}</p>
            <p>  Google formatted this address: {{newmeeting.location.mapped_address}}</p>
                    <div class="google-location">Latitude: {{newmeeting.location.lat}} Longitude: {{newmeeting.location.lng}}</div>
                  </div>
              </div>
              <div class="col-md-6 google-map-container" v-if="newmeeting.location.mapped_address">
                  <google-map :locations="newlocations" @clicked="onClickMap"></google-map>
              </div>
          </div>
      </div>
        <hr>
        <hr>
        <!-- <add-meetingdetails @newMeeting="onNewMeeting" :group="newmeeting.group"></add-meetingdetails> -->
  </div> <!-- end of template div -->
  
  </template>
  
  <script>
  function parseGeoCoderResult(result,location){
      console.log("outsideFunction: " -+ JSON.stringify(result, null, 4))
     
     // var formattedAddress = {}
      location.lat = result.geometry.location.lat();
      location.lng = result.geometry.location.lng();
       if (result.formatted_address){
          location.mapped_address = result.formatted_address

          console.log("parseGeoCoderResult: formatted address found: " + result.formatted_address)
          console.log("parseGeoCoderResult: formatted address found: " + location.mapped_address)
         // return formattedAddress
      }
      var a = result.address_components;
      var keys = {street_number:'street',route: 'street_name', locality:'city',administrative_area_level_1:'state',postal_code:'zip'}
      var parts = {}
  //  debugger;
      a.forEach((x) => {
         // console.log("x=" + JSON.stringify(x, null, 3))
          var key = x.types[0]
          if (key == 'route'){
              location.street += " " + x.short_name
          }else{
              parts[key] = x.short_name
              var xxk = keys[key]
              console.log(`key found: ${key} --- found: ${xxk}`)
              if (xxk){
                  location[xxk] = x.short_name
              }
             
          }
      
          })
          console.log("parseGeoCoderResult:  ended::::::::::formatted address found: " + JSON.stringify(location, null, 4))
      return
  }
  import AddMeetingLocation from "./addmeetinglocation.vue"
  import AddMeetingDetails from "./addmeetingdetails.vue"
   import GoogleMap from '@/components/googlemaps'
  export default {
    name: 'add-meeting',
    components: {
      // <my-component> will only be available in parent's template
          "add-meetingdetails": AddMeetingDetails, "add-meetingselect": AddMeetingLocation,"google-map": GoogleMap
    },
    data () {
      return {
        msg: 'Add a meeting',
        state: 1,
      //  mappedAddress: {formatted_address: null},
      formatted_address: "",
      mapped_lat: "",
      mapped_lng: "",
        address: '',
        addressError: false,
      //   formAddress: {
      //       location: "",
      //      address: "",
      //       city: "",
      //        state: "",
      //         zip: "",
      //         lat: "",
      //         lng: "",
      //         comments: ""
      //   },
        result: null,
        lat: '',
        lng: '',
        newmeeting: {
            location: {
              location_name: "",
              mapped_address: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              lat: "",
              lng: "",
              location_comments: "",
              },
          group: {
              group_name: "",
              day: '',
              time:'',
              type: 'Open',
              gender: 'Men/Women',
              format: 'Big Book',
              },
          contact: {
              name: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: ""
          }
        },
        newlocations: {},
        state: 1,
        selectedMeetings: [],
        errors: []
      }
    },
    methods: {
      ckLocation: function(){
        console.log("addSimpleMeeting: ckLocation")
        this.checkMap()
      },
      signUp: function(){
        console.log("signUp......................")
        this.state = 2
      },
      onNewMeeting(value){
          console.log(`onNewMeeting: ${JSON.stringify(value, null, 4)}`)
      },
      onClickMap (value) {
        console.log("from addmeeting.vue: map clicked at: " + value.lat() + " : " + value.lng()) // someValue
      var latlng = {lat: parseFloat( value.lat()), lng: parseFloat( value.lng())};
      this.googleGeocoder({'location': latlng})
      },
        snap(text){
          console.log("snap in parent.......")
        },
        checkMap: function(){
           debugger;
            this.addressError = false;
            //var a = this.formAddress;
            var a = this.newmeeting.location;
            this.address = a.street + ", " + a.city + ", " + a.state + ", "+ a.zip;
          this.getLocation();
        },
        back: function(){
          if (this.state > 1){
              this.state = this.state-1;
              return;
          }
          //if (this.state )
        },
        googleGeocoder: function(location){
          {
              var self = this
              console.dir("googleGeocoder: location = " + JSON.stringify(location, null, 4))
              var geocoder = new google.maps.Geocoder();
              if (geocoder) {
                  geocoder.geocode(location, function (results, status) {
                      //debugger
                      if (status == google.maps.GeocoderStatus.OK) {
                          self.showResult(results[0])
                      } else {
                          console.log("GeocodeStatus is not ok ......." + status)
                          self.showResult(null)
                      }
                      });
                  }
          }
        },
        getLocation: function(){ // get address from form input 
            console.log("address = " + this.address)
            if (!this.address){
                // no address entered so we will use the form
                var createdAddress = `${this.newmeeting.location.city} , ${this.newmeeting.location.state} ${this.newmeeting.location.zip}`
                console.log("createdAddress = " + createdAddress)
                this.address = createdAddress
            }
            this.googleGeocoder({address: this.address})
        },
        showResult: function(result){
           // debugger
            if (!result){
              this.addressError = true  
              this.newlocations = null
              return;
            } 
           // debugger
          //  this.mappedAddress = parseGeoCoderResult(result)
          parseGeoCoderResult(result, this.newmeeting.location)
          console.dir("googleGeocoder: this.newmeeting.location.mapped_address = " + JSON.stringify(this.newmeeting.location.mapped_address, null, 4))
        //  this.address = this.newmeeting.location.mapped_address
          // this.$children[0].$validator.errors.clear()
          //   Object.keys(this.newmeeting.location).forEach((k) => {
          //       this.newmeeting.location[k] = '';
          //   })
      //     this.lat = result.geometry.location.lat();
      //     this.lng = result.geometry.location.lng();
      //      var a = result.address_components;
      //      var keys = {street_number:'street',locality:'city',administrative_area_level_1:'state',postal_code:'zip'}
      //      var parts = {}
      //    //  debugger;
      //      a.forEach((x) => {
      //          console.log("x=" + JSON.stringify(x, null, 3))
      //          var key = x.types[0]
      //          if (key == 'route'){
      //             this.newmeeting.location.street += " " + x.short_name
      //          }else{
      //             parts[key] = x.short_name
      //             var xxk = keys[key]
      //             this.newmeeting.location[xxk] = x.short_name
      //          }
              
      //          })
      //          this.newmeeting.location.lat = this.lat
      //           this.newmeeting.location.lng = this.lng
             
            // this.$set(this.formAddress, 'location', "Enter place name....")
               // this.formAddress.location = 'hello after result'
         //  console.log("parts=" + JSON.stringify(parts, null, 3))
           console.log("newmeeting.location =" + JSON.stringify(this.newmeeting.location, null, 3))
  
           //this.formAddress.street = a.filter( x=> x.types.contains(""))
          //  this.formAddress = {
          //              street: a[0].short_name + a[1].short_name,
          //              city: a[2].short_name,
          //              state: a[4].short_name,
          //              zip: a[6].short_name,
          //              lat:  this.lat,
          //              lng:  this.lng
          //          }
  
          ///////////  add a location to result   /////////////////////
           //   debugger;
              var alocation = this.newmeeting.location
           var loc = {};
          loc[0] = {
              location: alocation.location_name,
              address: alocation.street,
              city: alocation.city,
              state: alocation.state,
              postal_code: alocation.zip,
              loc : {
                  "type": "Point",
                  "coordinates": [
                     alocation.lng,
                     alocation.lat
                  ]
              },
              meetings: []
          } // add this location data 
           this.newlocations = loc//this.newmeeting.location
          // console.log("formAddress = " + JSON.stringify(this.formAddress, null, 3))
          this.$nextTick(function () {
                  console.log("next tick validating") // => 'updated'
                   this.$validator.validateAll();
            })
         
       //   this.address = '';
        },
          getLatitudeLongitude: (callback, address)  => {
              var self = this;
           //   debugger
          // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
          var address = address || '12913 Pioneer Rd., Minnetonka, MN';
          console.log("check map address........ = " + address)
          // Initialize the Geocoder
          var geocoder = new google.maps.Geocoder();
          if (geocoder) {
              geocoder.geocode({
                  'address': address
              }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                   //   debugger;
                  
                   console.log("results[0] = " + JSON.stringify(results[0], null, 3))
                  
                     // self.result = results[0];
                      callback(results[0]);
                  } else {
                      debugger;
                      console.log("GeocodeStatus is not ok ......." + status)
                      callback(null);
                     // self.result = null;
                     // self.addressError = true;
                  }
               });
              }
          }// end of getLatitudeLongitude
    },// end of methods
    computed: {
      selectTimes: function(){
      //alert("created")
      var times = []
      var hours, minutes, ampm;
        for(var i = (1 * 60); i <= (24 * 60); i += 15){
            hours = Math.floor(i / 60);
            minutes = i % 60;
            if (minutes < 10){
                minutes = '0' + minutes; // adding leading zero
            }
            ampm = hours % 24 < 12 ? 'AM' : 'PM';
            hours = hours % 12;
            if (hours === 0){
                hours = 12;
            }
            times.push(hours + ':' + minutes + ' ' + ampm);
          }
          return times;
      }
    }
  }
  </script>
  // function showResult(result) {
  //     document.getElementById('latitude').value = result.geometry.location.lat();
  //     document.getElementById('longitude').value = result.geometry.location.lng();
  // }
  
  // function getLatitudeLongitude(callback, address) {
  //     // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
  //     address = address || 'Ferrol, Galicia, Spain';
  //     // Initialize the Geocoder
  //     geocoder = new google.maps.Geocoder();
  //     if (geocoder) {
  //         geocoder.geocode({
  //             'address': address
  //         }, function (results, status) {
  //             if (status == google.maps.GeocoderStatus.OK) {
  //                 callback(results[0]);
  //             }
  //         });
  //     }
  // }
  
  // var button = document.getElementById('btn');
  
  // button.addEventListener("click", function () {
  //     var address = document.getElementById('address').value;
  //     getLatitudeLongitude(showResult, address)
  // });
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style >
    .add-meeting{ 
      background: #ccc;
      padding: 3px 16px;
    }
    .aalinks-form {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      margin-bottom: 30px;
    }
    /* .aalinks-form-day-time{
      display: flex;
    } */
    .btn {
      margin-top: 10px;
      /* height: 20px; */
    }
      .location-summary { margin: 20px auto; font-size: 1.2em; background: #ccc;}
      .location-summary .panel {margin: 10px;}
  .form-background { background: #ccc;}
  #add-intro {border: 1px solid black; background: #ccc; padding: 10px; margin: 10px; height: 300px; display: flex; }
  #add-intro row, #add-intro col-md-8 {height: 100%}
      .left-intro li {border: 1px solid #aaa; background: #ccc;}
      .intro-active {border: 2px solid green !important;}
      .enter-address {margin: 10px; padding: 10px; border: 1px solid grey; border-radius: 5px; background: #ccc;}
      .enter-address input {min-width: 400px;}
  .step-intro {background: #fff; padding: 10px 20px 10px 10px; height: 100%;}
  .left-intro {flex: 1; min-width: 400px;}
  .right-intro {flex: 3; overflow-y:  scroll;}
  .info {margin: 10px; padding: 10px; background: #999; font-size: 1.2vw;}
  .map-error {height: 50px; background: red; font-size: 1.2em; border: 1px solid black; border-radius: 5px; padding: 10px;}
  .text-danger{ background: pink; border: 1px solid black;}
  .google-map-container {
    height: 30vh;
  }
  @media only screen and (min-width: 600px) {
    .aalinks-form {
      display: grid;
      grid-template-columns: 1fr 100px 100px;
      grid-gap: 10px;
    }
}
  </style>
  