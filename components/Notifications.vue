<template>
<div>
  <!-- Icon notifications-->
  <div class="setting-wrapper">
    <div class="setting-trigger-btn settingTriggerBtn" id="settingTriggerBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
        <defs>
          <linearGradient id="gradientSettings" spreadMethod="pad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" style="stop-color: #0134d4; stop-opacity:1;"></stop>
            <stop offset="100%" style="stop-color: #28a745; stop-opacity:1;"></stop>
          </linearGradient>
        </defs>
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
      </svg>
      <span></span>
    </div>
  </div>

  <!-- Setting Popup Overlay -->
  <div id="setting-popup-overlay"></div>
  <!-- Setting Popup Notification -->
  <div class="card setting-popup-card shadow-lg" id="settingCard">
    <div class="card-body">
      <div class="container">
        <div class="setting-heading d-flex align-items-center justify-content-between mb-3">
          <p class="mb-0">Notificaciones</p>
          <svg id="settingCardClose" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg btn-close" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Notifications"
}
</script>

<style scoped>

</style>
