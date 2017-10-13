import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://ichurchoka.com/wp-content/uploads/2016/06/hero.jpg',
        id: '1123',
        title: 'First'
      },
      {
        imageUrl:
					'https://secure.cdn2.wdpromedia.com/resize/mwImage/1/900/360/90/wdpromedia.disney.go.com/media/wdpro-hkdl-assets/prod/en-intl/system/images/hkdl-entity-marvel-super-hero-summer-hero.jpg',
        id: '1124',
        title: 'Second Hero',
        date: '2017-07-17'
      },
      {
        imageUrl:
					'https://blogsimages.adobe.com/creativecloud/files/2017/06/heroheader-1799x1012.jpg',
        id: '1125',
        title: 'Third Hero',
        date: '2017-07-17'
      }
    ],
    user: {
      id: 'dsdssgsd',
      registeredMeetups: ['aasdefq']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }
			// Reach out to firebase and store it
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((A, B) => {
        return A.date > B.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
