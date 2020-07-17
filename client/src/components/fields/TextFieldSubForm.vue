<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="textField.hasDefault" label="Has default?" />
      </div>

      <q-input
        filled
        v-model="textField.defaultValue"
        :disable="!textField.hasDefault"
        label="Default value"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      textField: {
        defaultValue: "",
        hasDefault: false
      },
    };
  },
  methods: {
    getData: function() {
      return this.textField;
    },
  },
};
</script>
