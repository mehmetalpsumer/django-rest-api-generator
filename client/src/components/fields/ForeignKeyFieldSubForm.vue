<template>
  <q-form>
    <q-select
      v-model="foreignKeyField.model"
      :options="otherModels"
      label="Foreign key to"
    />
    <q-select
      v-model="foreignKeyField.onDelete"
      :options="onDeleteOptions"
      label="On delete"
    />
  </q-form>
</template>

<script>
export default {
  data: function() {
    return {
      foreignKeyField: {
        model: "",
        onDelete: "models.SET_NULL",
      },
      onDeleteOptions: [
        "models.SET_NULL",
        "models.SET_DEFAULT",
        "models.CASCADE",
      ],
    };
  },
  computed: {
    otherModels: function() {
      const parent = this.getParent("MainForm");
      if (!parent) return [];
      return parent.getModelNames();
    },
  },
  methods: {
    getParent: function(name) {
      let p = this.$parent;
      while (typeof p !== "undefined") {
        if (p.$options.name === name) {
          return p;
        } else {
          p = p.$parent;
        }
      }
      return false;
    },
    getData: function() {
      return this.foreignKeyField;
    },
  },
};
</script>
