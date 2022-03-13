<template>
  <section class="hero-wrapper">
    <img
      class="absolute min-w-full h-full object-cover object-center"
      :src="require('../assets/bg.webp')"
    >
    <div class="absolute min-w-full h-full bg-gradient-to-b from-transparent to-orange-100"></div>

    <div id="content" class="relative w-full h-5/6 max-w-4xl mx-auto flex flex-col items-center justify-around p-4 sm:p-8 z-10">
      <div class="relative w-60 h-60 rounded-full overflow-hidden shadow-md" style="min-height: 15rem;">
        <img
          :src="require('../assets/me.jpg')"
          class="absolute object-cover rounded-full"
          style="width: 32rem; height: 32rem; top: -149px;"
        >
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center">
          <div class="flex text-xl mt-8">
            <p class="mr-5">นายติณห์ดนัย</p>
            <p>วงศ์พิพัฒโนภาส</p>
          </div>
          <p>(ติณห์)</p>
        </div>

        <p class="text-3xl font-medium mt-4">ขอกราบลาอุปสมบท</p>
        <div class="mt-4 text-center">
           กรรมใดที่ผู้อุปสมบทได้ล่วงเกินต่อท่านด้วย<br class="sm:hidden">
           กายกรรม วจีกรรม มโนกรรม<br>
           ขอได้โปรดอโหสิกรรมนั้นให้แก่ผู้อุปสมบทด้วยเทอญ
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.hero-wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: min(calc(80vh + 20px), 620px);
}
</style>