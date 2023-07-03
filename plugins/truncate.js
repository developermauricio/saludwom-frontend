import Vue from 'vue';

Vue.filter('truncate', function(value, words) {
  if (!value) return '';
  value = value.toString();
  let truncated = value.split(' ').splice(0, words).join(' ');
  return truncated + (value.split(' ').length > words ? '...' : '');
});
