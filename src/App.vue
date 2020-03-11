<template>
  <div id="app" class="antialiased">
    <div class="container mx-auto max-w-2xl my-8">
      <div class="flex items-center mb-2">
        <svg
          class="h-8 mr-2 w-8 text-gray-600"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="Page-1" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
            <g id="icon-shape">
              <path
                d="M0.707106781,10.7071068 L-2.00988464e-13,10 L5.48528137,4.51471863 L6.89949494,5.92893219 L2.82842712,10 L6.89949494,14.0710678 L5.48528137,15.4852814 L0.707106781,10.7071068 Z M19.2928932,10.7071068 L20,10 L14.5147186,4.51471863 L13.1005051,5.92893219 L17.1715729,10 L13.1005051,14.0710678 L14.5147186,15.4852814 L19.2928932,10.7071068 Z"
                id="Combined-Shape"
              />
            </g>
          </g>
        </svg>
        <h1 class="text-3xl text-gray-800">
          Code<strong class="text-indigo-500">Snappy</strong>
        </h1>
      </div>
      <div class="mb-6 text-gray-800">Quickly make a code snippet image with CodeSnappy.</div>

      <snappy></snappy>

      <footer class="mt-12 text-xs text-gray-600 leading-relaxed">
        <div>
          Built by
          <a href="https://vanrossum.dev" class="text-pink-500">Jeffrey van Rossum</a>
        </div>
        <div>
          Special thanks to
          <a href="https://vuejs.org/" class="text-gray-800">Vue.js</a>,
          <a href="http://html2canvas.hertzen.com/" class="text-gray-800">html2canvas</a> and
          <a href="https://tailwindcss.com/" class="text-gray-800">TailwindCSS</a>
        </div>
        <div>
          <a href="https://github.com/jeffreyvr/code-snappy" class="text-indigo-500">@Github</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Snappy from "./components/Snappy";

export default {
  name: "App",
  components: {
    Snappy
  }
};
</script>

<style>
body {
  @apply .bg-gray-300;
}
</style>
