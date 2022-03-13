<template>
  <div id="app">
    <transition name="page">
      <div v-show="!isLoadAssets" id="my-scrollbar">
        <HelloHero id="fixed"></HelloHero>
        <ContentWrapper
          id="content-wrapper-el"
          :is-scroll-to="isScrollTo"
        ></ContentWrapper>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * When there's only one statement, you can drop the {} and the return
 * x => y is equivalent to x => { return y; }
 * @param {string} path
 */
function checkImageOnLoad(path) {
    // If have error more than 10 then that mean the picture is undefined
    // else maybe have a problem while fetching
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
            reject('img404');
        };
        img.src = path;
    });
}

/**
     * Load image from array of image path
     * @param {string[]} paths
     */
async function loadImg(paths) {
    let response;
    await Promise.all(paths.map(checkImageOnLoad))
        .then(() => {
            response = true;
        })
        .catch((err) => {
            response = err;
            return Promise.reject(err);
        });
    return response;
}

import HelloHero from './components/HelloHero.vue';
import ContentWrapper from './components/ContentWrapper.vue';
import Scrollbar from 'smooth-scrollbar';
export default {
  name: 'App',
  components: {
    HelloHero,
    ContentWrapper
  },
  data() {
    return {
      isLoadAssets: true,
      scrollbar: null,
      fixedElem: null,
      contentWrapperEl: null,
      isScrollTo: false
    }
  },
  async created() {
    this.isLoadAssets = true
    try {
      await loadImg([
        require('@/assets/bg.webp'),
        require('@/assets/me.jpg'),
      ]);
        this.isLoadAssets = false;
    } catch {
        this.isLoadAssets = false;
    }
  },
  mounted() {
    this.fixedElem = document.getElementById('fixed');
    const myScrollbarEl = document.getElementById('my-scrollbar');
    this.scrollbar = Scrollbar.init(
      myScrollbarEl,
    );
    myScrollbarEl.style.height = `${window.innerHeight}px`;

    this.contentWrapperEl = document.getElementById('content-wrapper-el')

    this.scrollbar.addListener(this.handleOnScroll);

    window.addEventListener('resize', function() {
      const scrollbarEl = document.getElementById('my-scrollbar');
      scrollbarEl.style.height = `${window.innerHeight}px`;
    })
  },
  methods: {
    handleOnScroll(status) {
      const offset = status.offset;
      this.fixedElem.style.top = offset.y + 'px';
      this.fixedElem.style.left = offset.x + 'px';

      const halfWayPos = this.contentWrapperEl.getBoundingClientRect().top / 3
      if (Math.abs(this.scrollbar.contentEl.getBoundingClientRect().top) > halfWayPos) {
        this.isScrollTo = true
      } else {
        this.isScrollTo = false
      }
    }
  }
}
</script>

<style>
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

#app {
  font-family: 'Bai Jamjuree', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
