<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form class="q-gutter-md"
    >
      <q-input
              filled
              v-model="app.name"
              label="App name"
              hint="Name of the Django app"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </q-form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        app: {
          name: 'my_app',
        }
      }
    },

    methods: {
      getData: function() {
        return this.app;
      }
    }
  }
</script>
