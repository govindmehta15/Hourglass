// Copy this file into your Vue 3 project (e.g. src/composables/useHourglass.js).
// Requires hourglass.js to already be loaded/registered on the page, and
// `isCustomElement` configured to recognize `hour-glass` — see the main README.
//
// Usage:
//   <template>
//     <hour-glass ref="hg" width="220"></hour-glass>
//   </template>
//   <script setup>
//   import { ref } from 'vue';
//   import { useHourglass } from './useHourglass.js';
//
//   const hg = ref(null);
//   const duration = ref(12);
//   const color = ref('#e6b93d');
//   useHourglass(hg, { duration, color });
//   </script>

import { onMounted, watch } from 'vue';

/**
 * Syncs Vue reactive refs onto an <hour-glass> element's live-updatable
 * attributes.
 *
 * @param {import('vue').Ref<HTMLElement|null>} elRef template ref bound to <hour-glass>
 * @param {{
 *   duration?: import('vue').Ref<number>,
 *   color?: import('vue').Ref<string>,
 *   paused?: import('vue').Ref<boolean>,
 *   glow?: import('vue').Ref<boolean>,
 *   width?: import('vue').Ref<number|string>,
 * }} props
 */
export function useHourglass(elRef, { duration, color, paused, glow, width } = {}) {
  function bind(attr, source) {
    if (!source) return;
    watch(
      source,
      (value) => {
        if (elRef.value && value != null) elRef.value.setAttribute(attr, String(value));
      },
      { immediate: true }
    );
  }

  onMounted(() => {
    bind('duration', duration);
    bind('sand-color', color);
    bind('paused', paused);
    bind('glow', glow);
    bind('width', width);
  });
}
