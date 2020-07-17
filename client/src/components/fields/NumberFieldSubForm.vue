<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="numberField.hasDefault" label="Has default?" />
      </div>

      <q-input
        :disable="!numberField.hasDefault"
        filled
        type="number"
        v-model="numberField.defaultValue"
        label="Default value"
        lazy-rules
        :hint="`Values must be between ${min} and ${max}.`"
        :rules="[
          (val) => val >= min || 'This number is too small!',
          (val) => val <= max || 'This number is too big!',
        ]"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  props: ["min", "max"],
  data: function() {
    return {
      numberField: {
        defaultValue: null,
        hasDefault: false,
      },
    };
  },
  methods: {
    getData: function() {
      return this.numberField;
    },
  },
};
</script>
