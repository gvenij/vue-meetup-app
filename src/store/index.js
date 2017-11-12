import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [
			{
				imageUrl:
					'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
				id: 'afajfjadfaadfa323',
				title: 'Meetup in New York',
				date: new Date(),
				location: 'New York',
				description: 'New York, New York!'
			},
			{
				imageUrl:
					'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
				id: 'aadsfhbkhlk1241',
				title: 'Meetup in Paris',
				date: new Date(),
				location: 'Paris',
				description: "It's Paris!"
			}
		],
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setLoadedMeetups(state, payload) {
			state.loadedMeetups = payload
		},
		createMeetup(state, payload) {
			state.loadedMeetups.push(payload)
		},
		setUser(state, payload) {
			state.user = payload
		},
		setLoading(state, payload) {
			state.loading = payload
		},
		setError(state, payload) {
			state.error = payload
		},
		clearError(state) {
			state.error = null
		}
	},
	actions: {
		loadMeetups({ commit }) {
			commit('setLoading', true)
			firebase
				.database()
				.ref('meetups')
				.once('value')
				.then(data => {
					const meetups = []
					const obj = data.val()
					for (let key in obj) {
						meetups.push({
							id: key,
							title: obj[key].title,
							description: obj[key].description,
							imageUrl: obj[key].imageUrl,
							date: obj[key].date
						})
					}
					commit('setLoading', false)
					commit('setLoadedMeetups', meetups)
				})
				.catch(error => {
					commit('setLoading', false)
					console.log(error)
				})
		},
		createMeetup({ commit }, payload) {
			const meetup = {
				title: payload.title,
				location: payload.location,
				imageUrl: payload.imageUrl,
				description: payload.description,
				date: payload.date.toISOString()
			}
			firebase
				.database()
				.ref('meetups')
				.push(meetup)
				.then(data => {
					const key = data.key
					commit('createMeetup', {
						...meetup,
						id: key
					})
				})
				.catch(error => {
					console.log(error)
				})
			// Reach out to firebase and store it
			commit('createMeetup', meetup)
		},
		signUserUp({ commit }, payload) {
			commit('setLoading', true)
			commit('clearError')
			firebase
				.auth()
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					commit('setLoading', false)
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					}
					commit('setUser', newUser)
				})
				.catch(error => {
					commit('setLoading', false)
					commit('setError', error)
					console.log(error)
				})
		},
		signUserIn({ commit }, payload) {
			commit('setLoading', true)
			commit('clearError')
			firebase
				.auth()
				.signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					commit('setLoading', false)
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					}
					commit('setUser', newUser)
				})
				.catch(error => {
					commit('setLoading', false)
					commit('setError', error)
					console.log(error)
				})
		},
		autoSignIn({ commit }, payload) {
			commit('setUser', { id: payload.uid, registeredMeetups: [] })
		},
		clearError({ commit }) {
			commit('clearError') 
		}
	},
	getters: {
		loadedMeetups(state) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupA.date > meetupB.date
			})
		},
		featuredMeetups(state, getters) {
			return getters.loadedMeetups.slice(0, 5)
		},
		loadedMeetup(state) {
			return meetupId => {
				return state.loadedMeetups.find(meetup => {
					return meetup.id === meetupId
				})
			}
		},
		user(state) {
			return state.user
		},
		error(state) {
			return state.error
		},
		loading(state) {
			return state.loading
		}
	}
})
