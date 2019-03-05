<template>
  <popper trigger="click" :options="{placement: 'bottom'}">
    <div class="popper">
      Popper Content
    </div>

    <button slot="reference">
      Reference Element
    </button>
  </popper>
</template>

<script>
  import Popper from 'vue-popperjs';
  import 'vue-popperjs/dist/css/vue-popper.css';
  
  export default {
    components: {
      'popper': Popper
    },
  }
</script>