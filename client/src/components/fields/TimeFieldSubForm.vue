<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="timeField.autoNow" label="auto_now" />
        <q-checkbox v-model="timeField.autoNowAdd" label="auto_now_add" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      timeField: {
        autoNow: false,
        autoNowAdd: false,
      },
    };
  },
  methods: {
    getData: function() {
      return this.timeField;
    },
  },
};
</script>
