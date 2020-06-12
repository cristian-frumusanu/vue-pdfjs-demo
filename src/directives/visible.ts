import Vue from 'vue';

import 'intersection-observer';

const instances = new WeakMap();

const disconnectObserver = observer => {
  if (observer) observer.disconnect();
};

const createObserver = (el, vnode, modifiers, callback) => {
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      callback();
      if (modifiers.once) {
        disconnectObserver(observer);
      }
    }
  });

  // Observe when element is inserted in DOM
  vnode.context.$nextTick(() => observer.observe(el));

  return observer;
};

const bind = (el: HTMLElement, binding, vnode) => {
  const { value, modifiers } = binding;

  if (typeof window.IntersectionObserver === 'undefined') {
    console.log('IntersectionObserver API is not available in your browser.');
  } else {
    const observer = createObserver(el, vnode, modifiers, () => {
      const callback = value;
      if (typeof callback === 'function') callback();
    });

    instances.set(el, { observer });
  }
};

Vue.directive('visible', {
  bind,

  update(el, binding, vnode) {
    const { value, oldValue } = binding;

    if (value === oldValue) return;

    const { observer } = instances.get(el);
    disconnectObserver(observer);
    bind(el, { value, modifiers: null }, vnode);
  },

  unbind(el) {
    if (instances.has(el)) {
      const { observer } = instances.get(el);
      disconnectObserver(observer);
      instances.delete(el);
    }
  },
});
