import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAoI7av5H3SWALDdJcwDBcRFS0-SAhP5vo",
    libraries: "places" // necessary for places input
  }
});
Vue.config.productionTip = false


var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  async created() {
    console.log("Vue: created: **************")
    await this.$store.dispatch("getStripeKey");
  },
})
