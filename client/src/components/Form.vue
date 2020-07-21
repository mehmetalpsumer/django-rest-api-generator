<template>
  <div class="q-pa-md" style="width: 70%;">
    <q-stepper v-model="step" color="primary" animated keep-alive>
      <!-- Step 1: Project -->
      <q-step
        :name="1"
        title="Project settings"
        icon="settings"
        :done="step > 1"
      >
        <ProjectSubForm ref="projectSubForm"></ProjectSubForm>

        <q-stepper-navigation>
          <q-btn @click="toNextStep" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <!-- Step 2: App -->
      <q-step :name="2" title="App" icon="create_new_folder" :done="step > 2">
        <AppSubForm ref="appSubForm" />

        <q-stepper-navigation>
          <q-btn @click="toNextStep" color="primary" label="Continue" />
          <q-btn
            flat
            @click="toPrevStep"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- Step 3: Models -->
      <q-step :name="3" title="Models" icon="assignment" :done="step > 3">
        <ModelSubForm
          v-for="modelId of models"
          v-bind:key="modelId"
          ref="modelSubForms"
          :id="modelId"
          @removeModelClicked="removeModel(modelId)"
        />

        <q-stepper-navigation>
          <q-btn @click="toNextStep" color="primary" label="Continue" />
          <q-btn
            flat
            @click="addModel"
            color="primary"
            label="Add model"
            class="q-ml-sm"
          />
          <q-btn
            flat
            @click="toPrevStep"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- Step 4: Finish -->
      <q-step :name="4" title="Review & Complete" icon="add_comment">
        Review your project settings.

        <div class="q-pa-md q-gutter-sm">
          <q-tree
            :default-expand-all="true"
            :nodes="treeData"
            node-key="label"
          />
        </div>

        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Finish"
            @click="submit"
            :loading="submitted"
            :disable="submitted"
          />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

    <p>
      You can check the
      <a
        href="https://github.com/mehmetalpsumer/django-rest-api-generator/blob/master/README.md"
        target="_blank"
        >README on GitHub</a
      >
      for the instructions.
    </p>
  </div>
</template>

<script>
import axios from "axios";
import ProjectSubForm from "./ProjectSubForm";
import AppSubForm from "./AppSubForm";
import ModelSubForm from "./ModelSubForm";

console.log();
export default {
  name: "MainForm",
  data() {
    return {
      host:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://django-apigen.herokuapp.com",
      submitted: false,
      step: 1,
      models: [],
      modelCounter: 0,
      formData: {
        project: {},
        app: {},
        models: [],
      },
      treeData: [],
    };
  },
  components: {
    ProjectSubForm,
    AppSubForm,
    ModelSubForm,
  },
  methods: {
    toNextStep: function() {
      this.updateData();
      this.step = Math.min(++this.step, 4);
    },
    toPrevStep: function() {
      this.updateData();
      this.step = Math.max(--this.step, 1);
    },
    updateData: function() {
      let ref;
      switch (this.step) {
        case 1:
          ref = this.$refs.projectSubForm;
          this.formData.project = ref.getData();
          break;
        case 2:
          ref = this.$refs.appSubForm;
          this.formData.app = ref.getData();
          break;
        case 3:
          ref = this.$refs.modelSubForms;
          this.formData.models = ref.map((model) => model.getData());
          break;
        default:
          break;
      }
      this.updateTreeData();
    },
    updateTreeData: function() {
      const jsonData = this.getJsonData();
      this.treeData = [
        {
          label: jsonData.name,
          children: [
            {
              label: jsonData.app.name,
              children: jsonData.app.models.map((model) => {
                return {
                  label: model.name,
                  children: model.fields.map((field) => {
                    return {
                      label: `${field.commonOptions.name} [${field.commonOptions.fieldType}]`,
                    };
                  }),
                };
              }),
            },
          ],
        },
      ];
    },
    addModel: function() {
      this.models.push(this.modelCounter++);
    },
    removeModel: function(id) {
      const index = this.models.indexOf(id);
      this.models.splice(index, 1);
    },
    getModelNames: function() {
      const modelRefs = this.$refs.modelSubForms;
      return modelRefs.map((model) => model.getData().name);
    },
    getJsonData: function() {
      const data = this.formData.project;
      if (!data) return;
      data.app = this.formData.app;
      data.app.models = this.formData.models;
      return data;
    },
    submit: async function() {
      const data = this.getJsonData();
      this.submitted = true;

      try {
        const apiRoute = this.host + "/api/project";
        const response = await axios({
          method: "POST",
          url: apiRoute,
          data,
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "project.zip");
        document.body.appendChild(link);
        link.click();

        this.submitted = false;
      } catch (e) {
        this.submitted = false;
        const errMsg = `
          An error occurred! :(\n
          Please consider submitting a GitHub issue, thanks.\n
          ${e}`;
        alert(errMsg);
        console.error(e);
      }
    },
  },
  mounted() {
    this.addModel();
  },
};
</script>
