<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="slugField.hasDefault" label="Has default?" />
      </div>

      <q-input
        filled
        v-model="slugField.defaultValue"
        :disable="!slugField.hasDefault"
        :maxlength="slugField.maxLength"
        label="Default value"
        lazy-rules
        :rules="[(val) => isSlug(val) || 'Please enter a valid slug']"
      />

      <q-input
        filled
        type="number"
        v-model="slugField.maxLength"
        label="Max length"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type something',
          (val) => val > 0 || 'Please type a valid length',
        ]"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      slugField: {
        maxLength: 50,
        defaultValue: "",
        hasDefault: false
      },
    };
  },
  methods: {
    getData: function() {
      return this.slugField;
    },
    isSlug: function(val) {
      return new RegExp(`[a-zA-Z0-9_-]`).test(val);
    },
  },
};
</script>
