<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="urlField.hasDefault" label="Has default?" />
      </div>

      <q-input
        filled
        v-model="urlField.defaultValue"
        :disable="!urlField.hasDefault"
        :maxlength="urlField.maxLength"
        label="Default value"
        lazy-rules
        :rules="[(val) => isUrl(val) || 'Default value must be a valid URL.']"
      />

      <q-input
        filled
        type="number"
        v-model="urlField.maxLength"
        label="Max length"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      urlField: {
        maxLength: 200,
        defaultValue: "",
        hasDefault: false,
      },
    };
  },
  methods: {
    getData: function() {
      return this.urlField;
    },
    isUrl: function(val) {
      return /^(ftp|http|https):\/\/[^ "]+$/.test(val);
    },
  },
};
</script>
