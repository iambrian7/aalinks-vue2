<template>
  <div class="single">
    <div v-if="!meets">
      <p>Loading..............</p>
    </div>
    <div v-else>
        <h1>{{ msg }} {{ meets.name }}</h1>
        <h3> {{meets}}  </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'meeting',
  // props: ['meetingpath'],
  data () {
    return {
      msg: `Welcome to `,
      meeting: {}
    }
  },
  computed: {
    meets(){
        var x = this.$store.getters.getViewMeeting;
      if (!x){
        console.log(`meetingspath: ${this.meetingspath}`)
        console.log(`$route meetingspath: ${this.$route.params.meetingpath}`)
        x = this.$store.getters.getMeetingById( this.$route.params.id*1)
          console.log(`meets from store ${JSON.stringify(x,null,3)}`)
        if (!x){
          x = {name:"waiting for meeting"}
        }
       }
      console.log(`meets computed at ${JSON.stringify(x,null,3)}`)
      return x
    }
  },
  methods: {
    
    },
created: function(){
  // debugger;
    // this.meets =  this.$store.getters.getViewMeeting;
    // if (!this.meets){
    //   this.meets = {
    //     name:"looking for meeting"
    //   }
    // }
    console.log("meeting created")
    var id = this.$route.params.id;
    console.log(`meetingspath: ${id}`)
    // console.log(`singlemeeting: created: prop meeting = ${this.meets.name}`)
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>



</style>
