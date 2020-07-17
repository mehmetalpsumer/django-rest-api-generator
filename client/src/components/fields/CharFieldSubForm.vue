<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="charField.hasDefault" label="Has default?" />
      </div>

      <q-input
        filled
        v-model="charField.defaultValue"
        label="Default value"
        :disable="!charField.hasDefault"
        :maxlength="charField.maxLength"
      />

      <q-input
        filled
        type="number"
        v-model="charField.maxLength"
        label="Max length"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Max length cannot be blank.',
          (val) => val > 0 || 'Max length cannot be negative.',
        ]"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      charField: {
        maxLength: 32,
        defaultValue: "",
        hasDefault: false,
      },
    };
  },
  methods: {
    getData: function() {
      return this.charField;
    },
  },
};
</script>
