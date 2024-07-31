<template>
  <div id="app" class="dark:bg-gray-900 bg-white min-h-screen my-0">
    <div class="MainDiv p-4">
      <CharsTable v-if="showscreentable" @selectCharacter="selectCharacter" />
      <LcdScreen :heightScreen=selected[1] :widthScreen=selected[0] @changeCharacters="updateCode($event)"
        :draworErase="draworErase" :widthCharstable="showscreentable" :key="lcdkey" :defaultchartosel="selectchar" />
    </div>
    <div
      class="Menu medium-margin [&>*]:px-2 [&>*]:m-2 [&>button>i]:m-1 dark:[&>button]:text-white [&>button]:border-2 [&>button]:rounded-lg">
      <button class="" @click="toggleEdit()" :disabled="draworErase" :class="{ ' border-teal-700': draworErase }">
        <i class="pi pi-pencil"></i>
        <span>Draw</span>
      </button>
      <button class="" @click="toggleEdit()" :disabled="!draworErase" :class="{ ' border-teal-700': !draworErase }">
        <i class="pi pi-eraser"></i>
        <span>Eraser</span>
      </button>
      <button class=" hover:border-red-700 active:border-yellow-400" @click="clearScreen()">
        <i class="pi pi-trash"></i>
        <span>Clear</span>
      </button>
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" @click="toggleScreenchars()"
          class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]">
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable chars table</span>
      </label>
    </div>
    <div class=" items-baseline flex justify-center">
      <h6 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white p-2">LCD Size</h6>
      <select @change="changeLcdSize($event)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="size in lcdsizes" :key=size.text>
          {{ size.text }}
        </option>
      </select>
    </div>
    <div v-if="eightwarnchar" class=" z-10 p-4 w-screen justify-center flex">
      <div class=" group z-10 p-4 bg-orange-500 rounded-2xl drop-shadow-lg fixed self-center bottom-10 text-white">
        <i class="pi pi-exclamation-triangle m-2"></i>
        <span class="">More than 8 characters</span>
        <span class="hidden group-hover:block">The most common LCD screens only support 8 custom characters</span>
      </div>
    </div>
    <div class="p-2">
      <VCodeBlock lang="c" :code="msg" theme="dark" highlightjs
        class=" rounded-lg border-4 border-gray-200 dark:border-gray-700" />
    </div>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import LcdScreen from './LcdScreen.vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import "material-dynamic-colors";
import 'highlight.js/styles/a11y-dark.css';
import getCodeString from '../scripts/getcodestring.js'
import CharsTable from './charstable.vue'
import VCodeBlock from '@wdns/vue-code-block'
export default {
  name: 'MainApp',
  data() {
    return {
      lcdkey: 0,
      msg: '',
      draworErase: true,
      showinfo: false,
      selected: [2, 2],
      lcdsizes: [
        { text: '2x2', value: [2, 2] },
        { text: '1x1', value: [1, 1] },
        { text: '16x2', value: [16, 2] },
        { text: '20x4', value: [20, 4] }
      ],
      theme: "is-dark",
      eightwarnchar: false,
      showscreentable: false,
      selectchar: Array(8)
    }
  },
  components: {
    CharsTable,
    LcdScreen,
    VCodeBlock,
  },
  methods: {
    updateCode(characters) {
      var charquantity
      [this.msg, charquantity] = getCodeString(characters)
      this.eightwarnchar = (charquantity > 8)
    },
    changeLcdSize(event) {
      this.selected = this.lcdsizes[event.target.selectedIndex].value
      this.clearScreen()
    },
    toggleEdit() {
      this.draworErase = !this.draworErase
    },
    clearScreen() {
      this.lcdkey = this.lcdkey + 1
      this.msg = " "
      this.eightwarnchar = false
    },
    toggleScreenchars() {
      this.showscreentable = !this.showscreentable
    },
    selectCharacter: function (charsel) {
      this.selectchar = charsel
    }

  },
  mounted() {
    hljs.registerLanguage('c', c);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
}

.Codebox {
  width: 70%;
  margin: auto;
}

.MainDiv {
  width: 100%;
}

.CodeDiv {
  width: 100%;
  margin: 100px;
}

.Menu {
  margin: auto;
  text-align: center;
  align-content: center;
  display: flex;
  justify-content: center;
}

.ItemMenu {
  text-align: center;
  padding-left: 10px;
  align-content: center;
  display: flex;
  justify-content: center;
}
</style>
