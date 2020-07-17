<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          Django CRUD REST API Generator
        </q-toolbar-title>

        <div>
          <github-button
            href="https://github.com/mehmetalpsumer/django-crud-rest-api-generator"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star mehmetalpsumer/django-crud-rest-api-generator on GitHub"
            >Star</github-button
          >
          <!-- Place this tag where you want the button to render. -->
          <github-button
            href="https://github.com/mehmetalpsumer/django-crud-rest-api-generator/issues"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-icon="octicon-issue-opened"
            data-size="large"
            data-show-count="true"
            aria-label="Issue mehmetalpsumer/django-crud-rest-api-generator on GitHub"
            >Issue</github-button
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <FlexWrapper />
    </q-page-container>
  </q-layout>
</template>

<script>
import FlexWrapper from "./components/FlexWrapper.vue";
import GithubButton from "vue-github-button";

export default {
  name: "LayoutDefault",

  components: {
    GithubButton,
    FlexWrapper,
  },
};
</script>

<style></style>
