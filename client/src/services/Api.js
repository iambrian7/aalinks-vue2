import axios from 'axios'
// import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8086/`,
    // http://localhost:8086/api/
    headers: {
      Authorization: `Bearer xxxxx`
      // Authorization: `Bearer ${store.state.token}`
    }
  })
}
