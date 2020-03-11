<template>
  <div>
    <div id="snappy" class="relative shadow-lg">
      <div class="absolute z-10 flex mt-4 ml-5">
        <span class="h-3 w-3 bg-red-500 rounded-full"></span>
        <span class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></span>
        <span class="ml-2 h-3 w-3 bg-green-500 rounded-full"></span>
      </div>
      <vue-prism-editor v-model="code" :language="language" class="block"></vue-prism-editor>
    </div>
    <div class="flex justify-end">
      <select v-on:change="switchTheme" v-model="theme" class="ml-2">
        <option value="material-dark">Material Dark</option>
        <option value="atom-dark">Atom Dark</option>
        <option value="nord">Nord</option>
        <option value="xonokai">Monokai</option>
        <option value="github">Github</option>
        <option value="material-light">Material Light</option>
      </select>
      <select v-model="language" class="ml-2">
        <option>php</option>
        <option>html</option>
        <option>css</option>
        <option>js</option>
      </select>
      <button @click="snap" class="bg-indigo-500 text-white ml-2 px-4 py-2 rounded">Snap</button>
    </div>
  </div>
</template>

<script>
import VuePrismEditor from "vue-prism-editor";
import html2canvas from "html2canvas";
import "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
/* eslint-disable */
import GithubTheme from "!!raw-loader!prism-themes/themes/prism-ghcolors.css";
import AtomDarkTheme from "!!raw-loader!prism-themes/themes/prism-atom-dark.css";
import MaterialLightTheme from "!!raw-loader!prism-themes/themes/prism-material-light.css";
import MaterialDarkTheme from "!!raw-loader!prism-themes/themes/prism-material-dark.css";
import NordTheme from "!!raw-loader!../assets/themes/prism-nord.css";
import XonokaiTheme from "!!raw-loader!prism-themes/themes/prism-xonokai.css";
let themes = {
    'github': GithubTheme,
    'atom-dark': AtomDarkTheme,
    'xonokai': XonokaiTheme,
    'material-light': MaterialLightTheme,
    'material-dark': MaterialDarkTheme,
    'nord': NordTheme
};
/* eslint-enable */

export default {
  name: "Snappy",
  components: {
    VuePrismEditor
  },
  mounted() {
    this.switchTheme();
  },
  data() {
    return {
      code: "// type",
      language: "php",
      theme: "material-dark"
    };
  },
  methods: {
    switchTheme() {
      if (
        typeof document.getElementById("theme") != "undefined" &&
        document.getElementById("theme") != null
      ) {
        document.getElementById("theme").remove();
      }

      this.styleTag = document.createElement("style");
      this.styleTag.setAttribute("id", "theme");
      this.styleTag.appendChild(document.createTextNode(themes[this.theme]));

      document.getElementsByTagName('head')[0].insertAdjacentElement('afterbegin', this.styleTag);
    },

    snap() {
      html2canvas(document.querySelector("#snappy")).then(canvas => {
        window
          .open()
          .document.write('<img src="' + canvas.toDataURL() + '" width="674">');
      });
    }
  }
};
</script>

<style>
pre[class*="language-"] {
  @apply rounded-lg px-5 pb-6 pt-12 outline-none;
}
code[class*="language-"] {
    @apply font-mono leading-loose;
}
</style>