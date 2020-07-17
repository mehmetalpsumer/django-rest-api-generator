<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form class="q-gutter-md"
    >
      <q-input
              filled
              v-model="project.name"
              label="Project name"
              hint="Name of the Django project"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
              filled
              type="number"
              v-model="project.port"
              label="Port"
              hint="Port that Django will run on"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'Please type something',
          val => val > 1024 && val < 65535 || 'Please type a valid port number'
        ]"
      />
    </q-form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        project: {
          name: 'my_project',
          port: 8000,
        }
      }
    },

    methods: {
      getData: function() {
        return this.project;
      }
    }
  }
</script>
