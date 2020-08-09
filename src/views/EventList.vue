<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        v-if="page != 1"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >Prev page</router-link>
    </template>
    <template v-if="page > 1 && showNextPage">{{ ' ' }}|{{ ' ' }}</template>
    <template v-if="showNextPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="prev">Next page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    showNextPage() {
      return this.event.eventsTotal > this.page * 3
    },
    ...mapState(['event', 'user'])
  }
}
</script>
