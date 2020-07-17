<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="emailField.hasDefault" label="Has default?" />
      </div>

      <q-input
        filled
        :disable="!emailField.hasDefault"
        :maxlength="emailField.maxLength"
        v-model="emailField.defaultValue"
        label="Default value"
        lazy-rules
        :rules="[
          (val) =>
            isEmail(val) || 'Default value must be a valid email address.',
        ]"
      />

      <q-input
        filled
        type="number"
        v-model="emailField.maxLength"
        label="Max length"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      emailField: {
        maxLength: 254,
        defaultValue: "",
        hasDefault: false,
      },
    };
  },
  methods: {
    getData: function() {
      return this.emailField;
    },
    isEmail: function(val) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
    },
  },
};
</script>
