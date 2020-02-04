import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('accounts', {
      params: {
        search: search
      }
    })
  },
  show (accountId) {
    return Api().get(`accounts/${accountId}`)
  },
  post (account) {
    return Api().post('accounts', account)
  },
  patch (account) {
  // put (account) {
    return Api().patch(`accounts/${account.id}`, account)
  }
}
