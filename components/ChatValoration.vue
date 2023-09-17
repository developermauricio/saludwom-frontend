<template>
  <div>
    <!-- Boton Flotante -->
    <div>
      <a href="#" class="float" @click="funcOpenChat">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
             class="bi bi-chat-left icon-btn-floating" viewBox="0 0 16 16">
          <path
            d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        </svg>
      </a>
      <div class="tooltip-chat-button">
        <div class="text-center p-2" style="font-size: 0.85rem">
          Seguimiento Online
          <span v-if="unreadMessages > 0" class="badge rounded-pill bg-danger text-white"
                style="font-size: 13px; height: 21px;right: -8px;top: -8px;">{{ unreadMessages }}</span>
        </div>
      </div>
    </div>
    <!--  Sidebar Contenido Chat  -->
    <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx sidebar-chat-valuation"
                spacer v-model="openChat">

      <!-- Header Area -->
      <!-- Header Content -->
      <div class="header-content d-flex align-items-center justify-content-between p-3 bg-white">
        <!-- Chat User Info -->
        <div class="chat-user--info d-flex align-items-center">
          <!-- Back Button -->
          <div class="back-button">
            <a @click="openChat=false" class="cursor-pointer" style="cursor: pointer">
              <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
              </svg>
            </a>
          </div>
          <!-- User Thumbnail & Name -->
          <div class="user-thumbnail-name">
            <img :src="userPicture(valuation.doctor.user.picture)"
                 alt="SaludWom">
            <div class="info ms-1 ml-2">
              <p class="text-dark">Esp. {{ valuation.doctor.user.name }} {{ valuation.doctor.user.last_name }}</p>
              <p class="m-0 text-light">{{ valuation.name }}</p>
              <span :class="`${onlineActive ? 'active' : 'suspend'}-status-chat`"></span>
              <!-- span.offline-status.text-muted Last actived 27m ago-->
            </div>
          </div>
        </div>
      </div>

      <div class="page-content-wrapper pt-4" id="chat-wrapper">
        <div class="container">
          <div class="chat-content-wrap" v-if="messages && messages.length > 0">
            <div v-if="finished" class="text-center p-1">
              <Transition name="modal">
                <p class="text-primary">No hay más mensajes</p>
              </Transition>
            </div>
            <div :class="`single-chat-item ${$auth.user.id === message.send_user_id ? 'outgoing':''}`"
                 v-for="(message, index) in messages" :key="index">
              <!-- User Avatar -->
              <div class="user-avatar mt-1">
                <span class="name-first-letter">{{ (letter(message.send_user_id) || "").slice(0, 1) }}</span>
              </div>
              <!-- User Message -->
              <div class="user-message">
                <div class="message-content">
                  <div class="single-message">
                    <p>{{ message.message }}</p>
                  </div>
                </div>
                <!-- Time and Status -->
                <div class="message-time-status">
                  <div class="sent-time">{{ formatDate(message.date) }}</div>
                </div>
              </div>
            </div>
            <div id="end-container"></div>
          </div>
          <div v-else class="not-messages text-center">
            <!-- To load Conversation -->
            <div class="start-chat-area">
              <div class="mb-1 start-chat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                     class="bi bi-chat-left icon-btn-floating text-light" viewBox="0 0 16 16">
                  <path
                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
              </div>
              <h4 class="sidebar-toggle start-chat-text text-light">Inicia la conversación</h4>
            </div>
            <!--/ To load Conversation -->
          </div>
        </div>
      </div>

      <div class="footer-sidebar" slot="footer">
        <div class="chat-footer">
          <div class="container h-100">
            <div class="chat-footer-content h-100 d-flex align-items-center">
              <!--              <form action="#">-->
              <!-- Message -->
              <input class="form-control mr-2" v-model.trim="message" type="text" @keyup.enter="sendMessage"
                     placeholder="Escribe tu mensaje...">

              <!-- Send -->
              <button class="btn" @click="sendMessage">
                <svg class="bi bi-cursor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                     viewBox="0 0 16 16">
                  <path
                    d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"></path>
                </svg>
              </button>
              <!--              </form>-->
            </div>
          </div>
        </div>
      </div>
    </vs-sidebar>
  </div>

</template>

<script>
import {publishMQTT, subscriberMQTT} from "../plugins/mqtt";

export default {
  name: "ChatValoration",
  data() {
    return {
      onlineActive: false,
      message: '',
      unreadMessages: 0,
      openChat: false,
      messages: [],
      timezoneUser: null,
      page: 1,
      pageSize: 1,
      finished: false,
    }
  },
  props: ['valuation', 'chatChannel'],
  computed: {
    url() {
      return `api/v1/get-messages-valoration/${this.valuation.chat.id}/?page=${this.page}`
    }
  },
  onIdle() {
    console.log('CHAT DESCONECTADO')
    setTimeout(() => {
      if (this.openChat) {
        this.onlineActive = false
      }

    }, 200)
  },
  onActive() {
    setTimeout(() => {
      if (this.openChat) {
        this.onlineActive = true
      }
    }, 200)
    console.log('CONECTADO ACTIVO')
  },
  methods: {
    userPicture(image) {
      if (image.includes('user-profile.png') || image.includes('storage')) {
        return `${this.$config.urlBack}${image}`
      }
      // Verifica si hay una imagen de usuario y devuelve la URL correspondiente
      return image
    },
    sendMessage() {
      if (!this.message.trim()) return;
      const data = {
        message: this.message.trim(),
        type: 'text',
        chat: this.chatChannel.id,
        send_user_id: this.$auth.user.id,
        recipient_user_id: this.valuation.doctor.user.id,
        valuation_id: this.valuation.id,
        date: new Date(),
      };

      this.$axios.post("/api/v1/chat-save", data).then(resp => {
        publishMQTT(this.chatChannel.chat_key, data).then(() => {
          console.log('entro al mqtt')
          this.message = '';
        });
      }).catch(e => {
        this.$toast.error("Error al enviar el mensaje. Consulte a soporte SaludWom");
      });
    },
    addMessageBottom(message) {
      this.messages.push(message);
      this.toBottom();
    },
    getUnreadMessages() {
      if (this.openChat === true) {
        return
      }
      this.$axios.get(`api/v1/get-unread-message/${this.valuation.chat.id}`).then(resp => {
        this.unreadMessages = resp.data.data
      }).catch(e => {
        console.log(e)
      })
    },
    toTop() {
      const element = document.querySelector(".vs-sidebar--items");
      let resp = this
      element.addEventListener('scroll', function () {
        if (element.scrollTop === 0) {
          setTimeout(() => {
            console.log(resp.page)
            if (resp.page <= resp.pageSize) {
              resp.page++;
              resp.getMessages()
            } else {
              resp.finished = true
            }
          }, 200)
        }
      });
    },
    toBottom(transition = true) {
      const element = document.querySelector(".vs-sidebar--items");
      setTimeout(() => {
        const params = {
          top: element.scrollHeight,
        };
        if (transition) {
          params.behavior = "smooth";
        }
        element.scrollTo(params);
      }, 100);
    },
    formatDate(date) {
      return this.$moment(date).tz(this.timezoneUser).format('llll')
    },
    letter(user) {
      if (user === this.$auth.user.id) {
        return this.$auth.user.name
      } else {
        return this.valuation.doctor.user.name
      }
    },
    messageReadAt() {
      this.$axios.post(`api/v1/message-read-at/${this.valuation.chat.id}`).then(resp => {
      }).catch(e => {
        console.log(e)
      })
    },
    getMessages() {
      this.$axios.get(this.url).then(resp => {
        resp.data.data.data.forEach((message) => {
          this.messages.unshift({
            message: message.message,
            type: message.type,
            chat: message.chat_channel_id,
            send_user_id: message.send_user_id,
            recipient_user_id: message.recipient_user_id,
            date: message.created_at,
          });
        });
        this.pageSize = resp.data.lastPage
        // this.messages.unshift(resp.data.data.data)
      }).catch(e => {
        console.log('ERROR', e);
        this.$toast.error("Error al obtener los mensajes. Consulte a soporte SaludWom");
        this.$vs.loading.close()
      })
    },
    funcOpenChat() {
      // this.messages = []
      this.onlineActive = true
      this.unreadMessages = 0
      this.toBottom();
      this.openChat = true
      if (this.messages && this.messages.length === 0) {
        this.getMessages()
      }
    },
    async subscribeMqttMessage() {
      await subscriberMQTT("chat", this.chatChannel.chat_key, (message) => {
        if (message) {
          if (this.openChat === false) {
            this.unreadMessages++
          } else if (this.openChat === true) {
            this.messageReadAt()
            this.addMessageBottom(JSON.parse(message));
          }
        }
      });
    },
    closeOnlineChat() {
      this.$axios.post(`api/v1/close-online-chat/${this.valuation.chat.id}`).then(resp => {
      }).catch(e => {
        console.log(e);
      })
    }
  },
  created() {
    this.closeOnlineChat()
    this.getUnreadMessages()
    this.timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  mounted() {
    this.toTop()
    this.subscribeMqttMessage()
  },
  watch: {
    'openChat': function (val) {
      if (!val) {
        if (this.pageSize === 1) {
          this.pageSize = 1
        }
        this.page = 1
        this.finished = false
        this.closeOnlineChat()
      }
    }
  }
}
</script>

<style scoped>

</style>
