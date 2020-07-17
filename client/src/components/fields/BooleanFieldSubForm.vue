<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="booleanField.hasDefault" label="Has default?" />
      </div>

      <q-select
        v-model="booleanField.defaultValue"
        :options="boolOptions"
        :disable="!booleanField.hasDefault"
        label="Default value"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      booleanField: {
        defaultValue: "True",
        hasDefault: false
      },
      boolOptions: ["True", "False"],
    };
  },
  methods: {
    getData: function() {
      return this.booleanField;
    },
  },
};
</script>
