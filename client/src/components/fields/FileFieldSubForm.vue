<template>
  <div>
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="fileField.uploadTo"
        label="Upload to"
        hint="Relative directory where files will be stored."
      />

      <q-input
        filled
        type="number"
        v-model="fileField.maxLength"
        label="Max length"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Max length cannot be blank.',
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
      fileField: {
        maxLength: 100,
        uploadTo: "uploads/",
      },
    };
  },
  methods: {
    getData: function() {
      return this.fileField;
    },
  },
};
</script>
