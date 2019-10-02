import firebase from 'firebase/app'

export default function (Vue) {
    Vue.prototype.$firebase = firebase
    Vue.prototype.$db = firebase.firestore()
    Vue.prototype.$auth = firebase.auth()
}