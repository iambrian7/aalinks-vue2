<template>
  <div class="test1">
   <aside id="info-block">
    <section class="file-marker">
            <div>
                <div class="box-title">
                    optional fields for receipts
                </div>
                <div class="box-contents">
                    <div id="audit-trail">
                       <label for="p1"> Name:   
                        <input type="text" id="p1" style="border:none" placeholder="___________________________" v-model="meeting_location.name">
                      </label>
                      <br>
                       <label for="p2"> Email:
                        <input type="text" id="p2" style="border:none" placeholder="___________________________" v-model="meeting_location.email">
                      </label>
                      <br>
                       <label for="p3">Street:
                        <input type="text" id="p3" style="border:none" placeholder="___________________________" v-model="meeting_location.address.street">
                      </label>
                      <br>
                       <label for="p4">City:
                        <input type="text" id="p4" style="border:none" placeholder="___________________________" v-model="meeting_location.address.city">
                      </label>
                       <label for="p5">State:
                        <input type="text" id="p5" style="border:none; width:38px;paddingRight:10px;" placeholder="______" v-model="meeting_location.address.state">
                      </label>
                       <label for="p6">Zip:
                        <input type="text" id="p6" style="border:none; width:51px;" placeholder="___" v-model="meeting_location.address.zip">
                      </label>
                    </div>

                </div>
             </div>
    </section>
    </aside>
  </div>
</template>

<script>
export default {
  name:'test',
  props: ["meeting_location"],
  data: () => ({
    opt_info: {
      name: '',
      email: '',
      address:{
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
  }),
 mounted: function () {
   console.log(`test mounted: meeting_location= ${JSON.stringify(this.meeting_location, null, 3)}`)
 }
} // end of export default
</script>

<style scoped>
label{
  font-weight: 800;
}
label input{ font-weight: 400;}
  #info-block section {
      border: 2px solid black;
      margin-top: 20px;
      max-width: 500px;
      padding-bottom: 40px;
  }

  .file-marker > div {
      padding: 0 3px;
      height: 100px;
      margin-top: -0.8em;
      
  }
  .box-title {
      background: white none repeat scroll 0 0;
      display: inline-block;
      padding: 0 2px;
      margin-left: 8em;
  }
  #audit-trail{
    /* margin: 20px; */
    padding: 5px 20px;
  }
  /* input styles */
  input, select, textarea, button{font-family:inherit; font-size:inherit;}
  div:focus {outline: none;}
  input:hover,
  div > p:focus, 
  div > p:hover {outline: 1px solid red; }
  .container{ border: 1px solid black; padding: 10px 20px;}
</style>