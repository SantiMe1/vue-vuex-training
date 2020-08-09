import EventService from '@/services/EventService.js'
export const namespaced = true
import { SUCCESS, ERROR } from '@/consts/notification-types'

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, val) {
    state.eventsTotal = val
  },
  SET_EVENT(state, val) {
    state.event = val
  }
}

export const actions = {
  createEvent({ commit, rootState, dispatch }, event) {
    console.log(
      'rootState example -User creating is: ',
      rootState.user.user.name
    )
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)

        const notification = {
          type: SUCCESS,
          message: 'Your event has been created! '
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: ERROR,
          message: 'There was a problem creating event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
      })
      .catch(error => {
        const notification = {
          type: ERROR,
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: ERROR,
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
