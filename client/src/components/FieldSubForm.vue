<template>
  <q-form
    class="q-gutter-md"
    style="margin-left: 50px; margin-top: 10px; margin-right: 10px"
  >
    <div class="text-h6">
      <div class="row justify-between">
        <div class="col-4">
          Field
        </div>
        <div class="col-4">
          <q-btn
            flat
            size="sm"
            icon="close"
            style="float: right"
            @click="onRemoveField"
          />
        </div>
      </div>
    </div>
    <q-input
      filled
      v-model="field.name"
      label="Field name"
      hint="Recommended to use snake_case."
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-select
      v-model="field.fieldType"
      :options="fieldTypes"
      label="Field Type"
    />

    <div class="q-gutter-sm">
      <q-checkbox v-model="field.isNull" label="Can be null" />
      <q-checkbox v-model="field.isBlank" label="Can be blank" />
      <q-checkbox v-model="field.isUnique" label="Is unique" />
      <q-checkbox v-model="field.isPrimaryKey" label="Is PK" />
    </div>

    <!-- Field specific forms -->
    <NoArgFieldSubForm v-if="field.fieldType === 'AutoField'" ref="AutoField" />
    <NoArgFieldSubForm
      v-if="field.fieldType === 'BigAutoField'"
      ref="BigAutoField"
    />
    <NoArgFieldSubForm
      v-if="field.fieldType === 'DurationField'"
      ref="DurationField"
    />
    <NoArgFieldSubForm
      v-else-if="field.fieldType === 'SmallAutoField'"
      ref="SmallAutoField"
    />

    <DateFieldSubForm v-if="field.fieldType === 'DateField'" ref="DateField" />
    <DateFieldSubForm
      v-if="field.fieldType === 'DateTimeField'"
      ref="DateTimeField"
    />
    <DateFieldSubForm
      v-else-if="field.fieldType === 'TimeField'"
      ref="TimeField"
    />

    <!-- Big Integer -->
    <NumberFieldSubForm
      min="-9223372036854775808"
      max="9223372036854775807"
      v-else-if="field.fieldType === 'BigIntegerField'"
      ref="BigIntegerField"
    />

    <!-- Integer -->
    <NumberFieldSubForm
      min="-2147483648"
      max="2147483647"
      v-else-if="field.fieldType === 'IntegerField'"
      ref="IntegerField"
    />
    <NumberFieldSubForm
      min="0"
      max="2147483647"
      v-else-if="field.fieldType === 'PositiveIntegerField'"
      ref="PositiveIntegerField"
    />
    <NumberFieldSubForm
      min="0"
      max="32767"
      v-else-if="field.fieldType === 'PositiveSmallIntegerField'"
      ref="PositiveSmallIntegerField"
    />
    <NumberFieldSubForm
      min="-32768"
      max="32767"
      v-else-if="field.fieldType === 'SmallIntegerField'"
      ref="SmallIntegerField"
    />


    <BooleanFieldSubForm
      v-else-if="field.fieldType === 'BooleanField'"
      ref="BooleanField"
    />
    <CharFieldSubForm v-if="field.fieldType === 'CharField'" ref="CharField" />

    <DecimalFieldSubForm
      v-if="field.fieldType === 'DecimalField'"
      ref="DecimalField"
    />

    <EmailFieldSubForm
      v-if="field.fieldType === 'EmailField'"
      ref="EmailField"
    />
    <FileFieldSubForm v-if="field.fieldType === 'FileField'" ref="FileField" />
    <ForeignKeyFieldSubForm
      v-else-if="field.fieldType === 'ForeignKeyField'"
      ref="ForeignKeyField"
    />
    
    <SlugFieldSubForm
      v-else-if="field.fieldType === 'SlugField'"
      ref="SlugField"
    />
    <TextFieldSubForm
      v-else-if="field.fieldType === 'TextField'"
      ref="TextField"
    />

    <URLFieldSubForm
      v-else-if="field.fieldType === 'URLField'"
      ref="URLField"
    />
  </q-form>
</template>

<script>
import BooleanFieldSubForm from "./fields/BooleanFieldSubForm";
import CharFieldSubForm from "./fields/CharFieldSubForm";
import DateFieldSubForm from "./fields/DateFieldSubForm";
import DecimalFieldSubForm from "./fields/DecimalFieldSubForm";
import EmailFieldSubForm from "./fields/EmailFieldSubForm";
import FileFieldSubForm from "./fields/FileFieldSubForm";
import ForeignKeyFieldSubForm from "./fields/ForeignKeyFieldSubForm";
import SlugFieldSubForm from "./fields/SlugFieldSubForm";
import TextFieldSubForm from "./fields/TextFieldSubForm";
import URLFieldSubForm from "./fields/URLFieldSubForm";

import NoArgFieldSubForm from "./fields/NoArgFieldSubForm";
import NumberFieldSubForm from "./fields/NumberFieldSubForm";

export default {
  components: {
    BooleanFieldSubForm,
    CharFieldSubForm,

    DecimalFieldSubForm,
    EmailFieldSubForm,
    FileFieldSubForm,
    ForeignKeyFieldSubForm,
    SlugFieldSubForm,
    TextFieldSubForm,
    URLFieldSubForm,

    NoArgFieldSubForm,
    DateFieldSubForm,
    NumberFieldSubForm,
  },
  props: ["id"],
  data: function() {
    return {
      field: {
        name: "my_field",
        fieldType: "AutoField",
        isUnique: false,
        isNull: false,
        isBlank: false,
        isPrimaryKey: false,
      },
      fieldTypes: [
        "AutoField",
        "BigAutoField",
        "BigIntegerField",
        "BinaryField",
        "BooleanField",
        "CharField",
        "DateField",
        "DateTimeField",
        "DecimalField",
        "DurationField",
        "EmailField",
        "FileField",
        "ForeignKeyField",
        "IntegerField",
        "PositiveIntegerField",
        "PositiveSmallIntegerField",
        "SlugField",
        "SmallAutoField",
        "SmallIntegerField",
        "TextField",
        "TimeField",
        "URLField",
      ],
    };
  },
  methods: {
    onRemoveField: function() {
      this.$emit("removeFieldClicked", this.id);
    },
    getData: function() {
      const type = this.field.fieldType;
      if (!this.$refs[type]) return;
      return { commonOptions: this.field, ...this.$refs[type].getData() };
    },
  },
};
</script>
