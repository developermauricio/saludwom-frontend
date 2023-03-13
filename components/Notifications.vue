<template>

  <div>
    <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="show">
      <div class="">
        <!--    Header Notificación    -->
        <div class="p-3">
          <div>
            <h5>Notificaciones <span class="ms-1 badge bg-danger text-white">{{ this.totalNews }}</span></h5>
          </div>
        </div>
        <!--    Contenido Notificación    -->
        <vue-loadmore
          :loadOffset="80"
          :finishedText="'No hay más notificaciones'"
          :loadingText="'Cargando'"
          :successText="'Actualizado'"
          :loosingText="'Soltar para actualizar'"
          :refreshText="'Actualizando'"
          :pullingText="'Desplegar para actualizar'"
          ref="loadmoreRef"
          :finished="finished"
          :on-refresh="onRefresh"
          :on-loadmore="onLoad">
          <div :class="notification.read_at ?'': 'bg-notification'" v-for="(notification, index) in notifications"
               :key="notification.id+'-'+index">
            <a style="cursor: pointer" @click="readAtNotification(JSON.parse(notification.data).link, notification)">
              <div class="p-3 mt-2">
                <p class="m-0" v-html="JSON.parse(notification.data).title"></p>
                <p class="text-light" v-html="JSON.parse(notification.data).description"></p>
                <p class="text-light m-0">{{ formatDate(notification.created_at) }}</p>
              </div>
              <hr class="m-0">
            </a>
          </div>
        </vue-loadmore>
        <div class="text-center mt-5" v-if="notifications && notifications.length === 0">
          <p class="text-light" style="font-size: 1.2rem !important;">Sin notificaciones</p>
        </div>
      </div>
    </vs-sidebar>

    <!-- Icon notifications-->
    <div class="setting-wrapper">
      <div class="setting-trigger-btn settingTriggerBtn" @click="show=true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell"
             viewBox="0 0 16 16">
          <defs>
            <linearGradient id="gradientSettings" spreadMethod="pad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0" style="stop-color: #0134d4; stop-opacity:1;"></stop>
              <stop offset="100%" style="stop-color: #28a745; stop-opacity:1;"></stop>
            </linearGradient>
          </defs>
          <path
            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
        </svg>
        <span v-if="this.totalNews > 0" class="badge rounded-pill bg-danger text-white"
              style="font-size: 13px; height: 21px;right: -8px;top: -8px;">{{ this.totalNews }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {subscriberMQTT} from "../plugins/mqtt";

export default {
  name: "Notifications",
  data() {
    return {
      show: false,
      notifications: [],
      timezoneUser: null,
      totalNews: 0,
      finished: false,
      page: 1,
      pageSize: 0,
    }
  },
  computed: {
    url() {
      return `/api/v1/get-notification-users/${this.$auth.user.id}/?page=${this.page}`;
    }
  },
  methods: {
    initData() {
      this.showMessage = false
      this.notifications = []
      this.finished = false
      this.page = 1
    },
    onRefresh(done) {
      setTimeout(() => {
        this.initData()
        this.getNotifications()
        done();
      }, 50)

    },
    onLoad(done) {
      if (this.page <= this.pageSize) {
        this.page++;
        this.getNotifications()
      } else {
        this.finished = true
      }
      done();
    },
    readAtNotification(link, notification) {
      if (notification.read_at === null) {
        this.$axios.post(`api/v1/read-at-notification/${notification.id}`).then(resp => {
          this.notifications.forEach(item => {
            if (item.id === notification.id) {
              item.read_at = 'Leida'
              this.totalNews--
            }
          })
        }).catch(e => {
          console.log('Error al leer la notificación')
        })
      }
      if (link) {
        setTimeout(() => {
          this.$router.push(link)
        }, 200)
      }
      this.show = false
    },
    formatDate(date) {
      let now = this.$moment();
      let publishedDate = this.$moment(date).tz(this.timezoneUser)
      return this.$moment.duration(publishedDate.diff(now)).humanize(true)
    },
    async newNotification() {
      await subscriberMQTT('notification-0001', 'notification', (data) => {
        if (parseInt(data) === this.$auth.user.id) {
          setTimeout(() => {
            this.notifications = []
            this.getNotifications()
          }, 500)
        }
      })
    },
    getNotifications() {
      this.$axios.get(this.url).then(resp => {
        this.totalNews = resp.data.not_read_at
        resp.data.data.data.map(item => {
          this.notifications.push(item);
        })
        this.pageSize = resp.data.lastPage
      }).catch(err => {
        console.log('Error al cargar las notificaciones', err)
      })
    },
  },
  created() {
    this.timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  mounted() {
    this.newNotification()
    this.getNotifications()
  }
}
</script>

<style scoped>

</style>
