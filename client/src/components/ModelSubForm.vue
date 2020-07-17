<template>
  <div style="margin-bottom: 30px">
    <q-card-section>
      <div class="text-h6">
        <div class="row justify-between">
          <div class="col-4">
            Model
          </div>
          <div class="col-8">
            <q-btn size="sm" flat icon="close" style="float: right" label="Remove model" @click="onRemoveModel"/>
            <q-btn size="sm" flat icon="add" style="float: right" label="Add field" @click="addField"/>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form class="q-gutter-md"
      >
        <q-input
                filled
                v-model="model.name"
                label="Model name"
                lazy-rules
                hint="Recomended to separate words with spaces."
                :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-form>
    </q-card-section>

    <q-separator inset />

    <FieldSubForm ref="fields" v-for="fieldId in fields" v-bind:key="fieldId" :id="fieldId" @removeFieldClicked="removeField(fieldId)"/>
  </div>
</template>

<script>
  import FieldSubForm from "./FieldSubForm";

  export default {
    components: {
      FieldSubForm
    },
    props: ['id'],
    data: function() {
      return {
        model: {
          name: 'My Model',
        },
        fields: [],
        fieldCounter: 0,
      }
    },
    methods: {
      addField: function() {
        this.fields.push(this.fieldCounter++);
      },
      removeField: function(id) {
        const index = this.fields.indexOf(id);
        this.fields.splice(index, 1);
      },
      onRemoveModel: function() {
        this.$emit("removeModelClicked", this.id);
      },
      getData: function() {
        let model = this.model;
        model['fields'] = this.$refs.fields.map(field => field.getData());
        return model;
      },
    },
    mounted() {
      this.addField();
    }
  }
</script>
