<template id="addmeeting-location">
    <form role="form" class="form-horizontal" id="form-meeting" @submit.prevent="checkLocation">
        <div class="form-group">
            <!-- <div class="input-group" v-bind:class="{ 'has-error' : errors.has('location') }"> -->
            <!-- <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span> -->
                <input name="location"  v-model="formAddress.location_name" class="form-control" type="text" id="location" placeholder="Location Name...">
            <!-- </div> -->
            <!-- <span v-show="errors.has('location')" class=" error text-danger">{{ errors.first('location') }}</span> -->
        </div>
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">Enter fields</label>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Click on map</label>
        <br>
        <p>Location from store: {{location}}</p>
        <br>
        <span>Picked: {{ picked }}</span>
        <Location :meeting_location="opt_info"/>

    <button class="btn" @click="checkLocation">Check Location</button>
      </form>		
    </template>
    <script>
    import Location from '@/components/test'
        export default {
        name: 'addmeetingSelect',
        props: ["formAddress","snapit"],
        components: {
          Location
        },
      data(){
        return {
          picked: "One",
            opt_info: {
              name: 'testing...',
              email: '',
              address:{
                street: '',
                city: '',
                state: '',
                zip: '',
              }
             },
             msg:"hello"
        }
      }, // end of data
      computed: {
        location: function(){
          return this.$store.state.newLocation;
        }
      },
      watch:{
        email(value){
          this.eventName();
          this.email = value;
          this.check_email(value);
        },
        password(value){
          this.eventName();
          this.password = value;
          this.checkPassword(value);
        },
        confirmPassword(value){
          this.eventName();
          this.confirmPassword = value;
          this.checkConfirmPassword(value);
        }
      },
      methods:{
        checkLocation: function(){
            console.log("checkLocation.....................")
            console.log(JSON.stringify(this.formAddress, null, 4))
            this.$emit("chkecklocation")
        } ,
       
        // submit(){
        //   alert('Great you have completed this project, keep learning.')
        // }
        },
        updated(){
            console.log("addmeetingselect updated")
        }
    }// end export default
    
    
    </script>
    <style scoped>
        span{color: red;}
        #form-meeting { border: 1px solid black; padding: 20px;}
        select {
            margin: 50px;
            width: 150px;
            padding: 5px 35px 5px 5px;
            font-size: 16px;
            border: 1px solid #CCC;
            height: 34px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url(http://www.stackoverflow.com/favicon.ico) 96% / 15% no-repeat #EEE;
          }
          .form-control option{
            background: #888;
            margin: 0;
            padding: 0;
            line-height: .6;
          }
    </style>