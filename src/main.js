import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	created() {
		firebase.initializeApp({
			apiKey: 'AIzaSyD9w5xmuh_WmvXFEFoiEgRQ-LNUpJ5rZs4',
			authDomain: 'vue-meetups-aa8a6.firebaseapp.com',
			databaseURL: 'https://vue-meetups-aa8a6.firebaseio.com',
			projectId: 'vue-meetups-aa8a6',
			storageBucket: ''
		})
		this.$store.dispatch('loadMeetups')
	}
})
