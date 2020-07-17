<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="decimalField.hasDefault" label="Has default?" />
      </div>
      
      <q-input
        filled
        type="number"
        v-model="decimalField.maxDigits"
        label="Max digits"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Max digits cannot be blank.',
          (val) => val > 0 || 'Max digits cannot be negative.',
        ]"
      />

      <q-input
        filled
        type="number"
        v-model="decimalField.decimalPlaces"
        label="Decimal places"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Decimal places cannot be blank.',
          (val) => val > 0 || 'Decimal places cannot be negative.',
          (val) =>
            val < decimalField.maxDigits || 'Decimal places must be less than max digits.',
        ]"
      />

      <q-input
        filled
        v-model="decimalField.defaultValue"
        :disabled="!decimalField.hasDefault"
        label="Default value"
        lazy-rules
        :rules="[
          (val) => {
            // TODO; check
            let regexp = new RegExp(
              `^\d+\.\d{0,${decimalField.decimalPlaces}}$`
            );
            console.log(regexp);
            return (
              regexp.test(val) ||
              'Invalid decimal number, make sure to format with values above'
            );
          },
        ]"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      decimalField: {
        maxDigits: 5,
        decimalPlaces: 2,
        defaultValue: "",
        hasDefault: false,
      },
    };
  },
  methods: {
    getData: function() {
      return this.decimalField;
    },
  },
};
</script>
