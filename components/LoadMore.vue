<!--<template>-->
<!--  <div id="loadMore" class="loadmore" @touchstart="touchstart($event)" @touchmove="touchmove($event)"-->
<!--       @touchend="touchend($event)">-->
<!--    <div class="pull-wrap">-->
<!--      <div v-show="openRefresh">-->
<!--        <transition name="fade">-->
<!--          <div>-->
<!--            <i v-if="state===3&&refreshTips" key="1" class="loadmore-icon"></i>-->
<!--            <i v-else-if="refreshTips" key="2"-->
<!--               :class="state===1 ? 'pull-arrow pull-toggle': state===2?'pull-arrow':''"></i>-->
<!--            <span v-if="refreshTips" key="3" class="pull-text">{{ refreshTips }}</span>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </div>-->
<!--    </div>-->
<!--    <slot></slot>-->
<!--    <div class="loadmore-tip" id="loadTips" v-if="totalCount > 0 && totalCount >= pageSize">-->
<!--      <i v-show="loadTips==='Actualizando'" class="loadmore-icon"></i>-->
<!--      {{ loadTips }}-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--let clr, clr2, clr3;-->
<!--export default {-->
<!--  props: {-->
<!--    pageIndex: {-->
<!--      type: [Number, String],-->
<!--      default: "1"-->
<!--    },-->
<!--    pageSize: {-->
<!--      type: [Number, String],-->
<!--      default: "10"-->
<!--    },-->
<!--    totalCount: {-->
<!--      type: [Number, String],-->
<!--      default: "0"-->
<!--    },-->
<!--    tips: {-->
<!--      type: [String],-->
<!--      default: "No hay datos disponibles"-->
<!--    },-->
<!--    openRefresh: {-->
<!--      type: [Boolean],-->
<!--      default: false-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      isPull: false,//是否达到了松开刷新的临界点-->
<!--      state: 1,//1:下拉刷新，2：松开刷新，3：更新中-->
<!--      refreshTips: '',-->
<!--      loadTips: "Actualizando"-->
<!--    };-->
<!--  },-->
<!--  watch: {-->
<!--    pageIndex() {-->
<!--      this.loadMore();-->
<!--    },-->
<!--    totalCount: {-->
<!--      handler(val, oldval) {-->
<!--        if (val > 0) {-->
<!--          this.loadMore();-->
<!--        }-->
<!--      },-->
<!--      immediate: true-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    //上滑动加载更多-->
<!--    loadMore() {-->
<!--      alert('aho')-->
<!--      const scope = this;-->
<!--      scope.loadTips = "Actualizando";-->
<!--      let flag = true;-->
<!--      let pageSize = this.pageSize;-->
<!--      let pageIndex = this.pageIndex;-->
<!--      let totalCount = this.totalCount;-->
<!--      // console.log(pageSize,pageIndex,totalCount)-->
<!--      return new Promise(function (resolve, reject) {-->
<!--        window.onscroll = function () {-->
<!--          clr = setTimeout(() => {-->

<!--            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;-->
<!--            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;-->
<!--            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;-->
<!--            if (!document.getElementById("loadTips")) {-->
<!--              return;-->
<!--            }-->
<!--            let rectBottom = document.getElementById("loadTips").getBoundingClientRect().bottom | 0;-->
<!--            console.log(rectBottom)-->
<!--            //if (scrollTop + clientHeight >= scrollHeight - 25) {-->
<!--            if (rectBottom < clientHeight + 25) {-->
<!--              if (flag) {-->
<!--                flag = false;-->
<!--                let size = totalCount - pageIndex * pageSize;-->
<!--                if (size > 0) {-->
<!--                  scope.$emit("loadmore", pageIndex + 1);-->
<!--                  resolve(true);-->
<!--                } else {-->
<!--                  scope.loadTips = "No hay más datos disponibles";-->
<!--                  resolve(false);-->
<!--                }-->
<!--                clearTimeout(clr);-->
<!--              }-->
<!--            }-->
<!--          }, 400);-->
<!--        };-->
<!--      });-->
<!--    },-->
<!--    //下拉刷新-->
<!--    refresh() {-->
<!--      this._startPos = 0-->
<!--      this._transitionHeight = 0-->
<!--      this.obj = document.getElementById("loadMore")-->
<!--      this.objTop = this.obj.offsetTop-->
<!--    },-->
<!--    touchstart(event) {-->

<!--      if (!this.openRefresh) return-->
<!--      this._startPos = event.targetTouches[0].screenY-->
<!--      this.obj.style.transition = "transform 0s linear"-->
<!--    },-->
<!--    touchmove(event) {-->

<!--      if (!this.openRefresh) return-->
<!--      const h = Math.ceil(this.obj.getBoundingClientRect().top)-->
<!--      this._transitionHeight = ((event.targetTouches[0].screenY - this._startPos) * 0.4) | 0-->

<!--      if (h >= this.objTop) {-->
<!--        if (typeof event.cancelable !== 'boolean' || event.cancelable) {-->
<!--          event.preventDefault();-->
<!--        }-->
<!--        this.obj.style.transform = "translateY(" + this._transitionHeight + "px)"-->
<!--        if (this._transitionHeight > 40 && this._transitionHeight < 100) {-->
<!--          this.state = 1-->
<!--          this.isPull = false-->
<!--          this.refreshTips = "Actualizar"-->
<!--          if (this._transitionHeight > 50) {-->
<!--            this.state = 2-->
<!--            this.isPull = true-->
<!--            this.refreshTips = "Suelta para actualizar";-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    touchend(event) {-->
<!--      if (!this.openRefresh) return-->
<!--      this.obj.style.cssText = `transition:transform 0.2s cubic-bezier(0,.2,.5,.7);transform:translateY(0);`-->
<!--      if (this.isPull) {-->
<!--        const h = Math.ceil(this.obj.getBoundingClientRect().top + 1)-->
<!--        this._transitionHeight = event.changedTouches[0].screenY - this._startPos;-->
<!--        if (h >= this.objTop) {-->
<!--          this.state = 3;-->
<!--          this.refreshTips = "Actualizando";-->
<!--          this.obj.style.transform = "translateY(40px)";-->
<!--          clr2 = setTimeout(() => {-->
<!--            this.obj.style.transform = "translateY(0)";-->
<!--            clearTimeout(clr2);-->
<!--          }, 1000);-->
<!--          clr3 = setTimeout(() => {-->

<!--            clearTimeout(clr2);-->
<!--            this.refreshTips = ''-->
<!--            this.isPull = false;-->
<!--            this.$emit("refresh", true);-->
<!--          }, 1500);-->
<!--        }-->
<!--      } else {-->
<!--        clr2 = setTimeout(() => {-->
<!--          this.state = 1;-->
<!--          clearTimeout(clr2);-->
<!--        }, 400);-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  destroyed() {-->
<!--    clearTimeout(clr);-->
<!--    clearTimeout(clr2);-->
<!--    clearTimeout(clr3);-->
<!--  },-->
<!--  mounted() {-->
<!--    if (this.openRefresh) {-->
<!--      this.$nextTick(() => {-->
<!--        this.refresh()-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style scoped>-->
<!--.loadmore {-->
<!--  margin-top: -40px;-->
<!--}-->

<!--.fade-enter-active, .fade-leave-active {-->
<!--  -webkit-transition: all 0.2s ease;-->
<!--  transition: all 0.2s ease;-->
<!--}-->

<!--.fade-enter, .fade-leave-to {-->
<!--  opacity: 0;-->
<!--}-->

<!--.loadmore-tip {-->
<!--  color: #aaa;-->
<!--  font-size: 12px;-->
<!--  text-align: center;-->
<!--  height: 40px;-->
<!--  line-height: 40px;-->
<!--}-->

<!--.pull-wrap {-->
<!--  height: 40px;-->
<!--  line-height: 40px;-->
<!--  text-align: center;-->
<!--  width: 100%;-->
<!--}-->

<!--.no-data-tip {-->
<!--  text-align: center;-->
<!--  padding-top: 36%;-->
<!--}-->

<!--.no-data-tip p {-->
<!--  font-size: 16px;-->
<!--  margin: 10px auto;-->
<!--  color: #aaa;-->
<!--  padding: 0;-->
<!--}-->

<!--.no-data-tip img {-->
<!--  display: block;-->
<!--  margin: 0 auto;-->
<!--  width: auto;-->
<!--  max-width: 150px;-->
<!--}-->

<!--@keyframes rotate-loading {-->
<!--  0% {-->
<!--    -webkit-transform: rotate(0);-->
<!--    transform: rotate(0);-->
<!--  }-->
<!--  100% {-->
<!--    -webkit-transform: rotate(360deg);-->
<!--    transform: rotate(360deg);-->
<!--  }-->
<!--}-->

<!--@-webkit-keyframes rotate-loading {-->
<!--  0% {-->
<!--    -webkit-transform: rotate(0);-->
<!--    transform: rotate(0);-->
<!--  }-->
<!--  100% {-->
<!--    -webkit-transform: rotate(360deg);-->
<!--    transform: rotate(360deg);-->
<!--  }-->
<!--}-->

<!--.loadmore-icon {-->
<!--  vertical-align: -2px;-->
<!--  width: 12px;-->
<!--  height: 12px;-->
<!--  display: inline-block;-->
<!--  background: url("data:image/png;base64,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") no-repeat;-->
<!--  background-size: 12px 12px;-->
<!--  -webkit-animation: rotate-loading 0.5s linear forwards infinite;-->
<!--  animation: rotate-loading 0.5s linear forwards infinite;-->
<!--}-->

<!--.pull-text {-->
<!--  text-align: center;-->
<!--  color: #aaa;-->
<!--  height: 40px;-->
<!--  font-size: 12px;-->
<!--  line-height: 40px;-->
<!--}-->

<!--.pull-arrow {-->
<!--  vertical-align: -6px;-->
<!--  height: 18px;-->
<!--  width: 14px;-->
<!--  display: inline-block;-->
<!--  background: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjAxLjg5NCAyMDEuODk0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMDEuODk0IDIwMS44OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cG9seWdvbiBzdHlsZT0iZmlsbDojMDEwMDAyOyIgcG9pbnRzPSIzMy43NjgsNjYuMDE5IDM5LjEwOCw3MS4yNjYgOTcuMTcxLDE0LjIwNCA5Ny4xNzEsMjAxLjg5NCAxMDQuNzE5LDIwMS44OTQgDQoJCQkxMDQuNzE5LDE0LjE5NCAxNjIuNzg2LDcxLjI2NiAxNjguMTI1LDY2LjAxOSAxMDAuOTQ3LDAgCQkiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==") no-repeat;-->
<!--  transition: all 0.2s ease;-->
<!--}-->

<!--.pull-toggle {-->
<!--  vertical-align: -2px;-->
<!--  -webkit-transform: rotate(180deg);-->
<!--  transform: rotate(180deg);-->
<!--}-->
<!--</style>-->
