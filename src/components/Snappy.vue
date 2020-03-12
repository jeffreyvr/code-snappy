<template>
  <div>
    <div>
      <div id="snappy" class="relative">
        <div class="absolute z-10 flex mt-4 ml-5">
          <span class="h-3 w-3 bg-red-500 rounded-full"></span>
          <span class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></span>
          <span class="ml-2 h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        <vue-prism-editor
          v-model="code"
          :language="language"
          :class="(editorGrow ? 'min-w-sm w-auto ' : 'min-w-full ') + 'max-w-full inline-block shadow-lg rounded'"
          ref="editor"
        ></vue-prism-editor>
      </div>
    </div>
    <div class="flex justify-between mt-6">
      <div>
        <div class="relative inline-block">
          <select
            v-on:change="switchTheme"
            v-model="theme"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value disabled selected>Select your theme</option>
            <option value="material-dark">Material Dark</option>
            <option value="atom-dark">Atom Dark</option>
            <option value="nord">Nord</option>
            <option value="xonokai">Monokai</option>
            <option value="github">Github</option>
            <option value="otwell">Otwell</option>
            <option value="material-light">Material Light</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div class="relative inline-block ml-2">
          <select
            v-model="language"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value disabled selected>Select your language</option>
            <option value="php">PHP</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">Javascript</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div class="block mt-4">
          <label class="md:w-2/3 block text-gray-500 font-bold">
            <input type="checkbox" v-model="editorGrow" class="mr-2 leading-tight" />
            <span class="text-sm">Enable Grow</span>
          </label>
        </div>
      </div>
      <div>
        <button
          @click="snap"
          class="bg-indigo-500 text-white ml-2 py-3 px-4 rounded flex items-center"
        >
          <svg
            class="w-4 h-4 inline mr-2 text-gray-100"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Page-1" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
              <g id="icon-shape">
                <path
                  d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z"
                  id="Combined-Shape"
                />
              </g>
            </g>
          </svg>
          Snap
        </button>
      </div>
    </div>

    <modal name="download-modal" :maxWidth="700" height="auto">
      <div v-if="canvas" class="p-6">
        <h2 class="text-2xl text-center mb-4 text-gray-800">Your image is ready</h2>
        <img :src="this.canvas.toDataURL()" :style="'width: ' + this.canvas.width" />
        <div class="flex justify-end">
          <button @click="download" class="bg-indigo-500 text-white ml-2 py-3 px-4 mt-4 rounded">
            <svg
              class="w-4 h-4 inline mr-2 text-gray-100"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="currentColor"
                fill-rule="evenodd"
              >
                <g id="icon-shape">
                  <path
                    d="M13,8 L13,2 L7,2 L7,8 L2,8 L10,16 L18,8 L13,8 Z M0,18 L20,18 L20,20 L0,20 L0,18 Z"
                    id="Combined-Shape"
                  />
                </g>
              </g>
            </svg>
            Download
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import VuePrismEditor from "vue-prism-editor";
import html2canvas from "html2canvas";
import "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
/* eslint-disable */
import OtwellTheme from "!!raw-loader!../assets/themes/prism-otwell.css";
import GithubTheme from "!!raw-loader!prism-themes/themes/prism-ghcolors.css";
import AtomDarkTheme from "!!raw-loader!prism-themes/themes/prism-atom-dark.css";
import MaterialLightTheme from "!!raw-loader!prism-themes/themes/prism-material-light.css";
import MaterialDarkTheme from "!!raw-loader!prism-themes/themes/prism-material-dark.css";
import NordTheme from "!!raw-loader!../assets/themes/prism-nord.css";
import XonokaiTheme from "!!raw-loader!prism-themes/themes/prism-xonokai.css";
let themes = {
  github: GithubTheme,
  "atom-dark": AtomDarkTheme,
  xonokai: XonokaiTheme,
  "material-light": MaterialLightTheme,
  "material-dark": MaterialDarkTheme,
  nord: NordTheme,
  otwell: OtwellTheme
};
/* eslint-enable */

export default {
  name: "Snappy",
  components: {
    VuePrismEditor
  },
  mounted() {
    this.switchTheme();
    this.$refs.editor.$refs.pre.focus();
  },
  data() {
    return {
      code: null,
      language: "php",
      theme: "material-dark",
      canvas: null,
      editorGrow: false
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

      document
        .getElementsByTagName("head")[0]
        .insertAdjacentElement("afterbegin", this.styleTag);
    },

    snap() {
      html2canvas(document.querySelector("#snappy"), {
        allowTaint: true,
        backgroundColor: "rgba(0,0,0,0)"
      }).then(canvas => {
        this.canvas = canvas;

        this.$modal.show("download-modal");
      });
    },

    download() {
      var link = document.createElement("a");
      link.href = this.canvas.toDataURL();
      link.download = "snappy";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style>
pre[class*="language-"] {
  @apply rounded-lg px-5 pb-6 pt-12 outline-none m-0;
}
code[class*="language-"] {
  @apply font-mono leading-loose break-all whitespace-pre-wrap;
}
</style>