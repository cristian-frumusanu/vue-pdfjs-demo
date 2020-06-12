import Vue from 'vue';
import throttle from 'lodash/throttle';

Vue.directive('scroll', {
  inserted(el, binding) {
    const callback = binding.value;
    if (binding.modifiers.immediate) {
      callback();
    }
    const throttledScroll = throttle(callback, 300);
    el.addEventListener('scroll', throttledScroll, true);
  },
});
