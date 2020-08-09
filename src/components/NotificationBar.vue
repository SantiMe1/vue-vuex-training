<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
    <BaseIcon
      class="clickable"
      name="x"
      v-on:click.native="remove(notification)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { SUCCESS } from '@/consts/notification-types'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    if (this.notification.type === SUCCESS)
      this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    if (this.notification.type === SUCCESS) clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped lang="scss">
.notification-bar {
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  background: #efefef;
  padding: 10px;
  border-radius: 5px;

  p {
    margin: 0;
  }
  .icon-wrapper {
    margin-left: 10px;
    margin-top: 3px;
    height: 24px;
    color: gray;
    &:hover {
      color: #424242;
    }
  }
}
</style>
