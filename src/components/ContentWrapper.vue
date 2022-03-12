<template>
  <section
    :class="[
      'content-wrapper bg-white rounded-t-2xl',
      isScrollTo ? 'custom-shadow' : null
    ]">
    <div class="w-full max-w-4xl mx-auto px-4 py-8">
      <h5
        :class="[
          'schedule-title text-2xl font-medium text-center',
          isScrollTo ? 'scrolled' : null
        ]"
      >
        กำหนดการงานอุปสมบท
      </h5>
      <div class="mt-8 text-center">
        ณ วัดโพธิ์พุฒตาล<br>
        ซอย เอกชัย ๑๐๙ แขวง บางบอน<br>
        เขต บางบอน จังหวัด กรุงเทพมหานคร<br>
        <a
          target="_blank"
          href="https://goo.gl/maps/L2reB1f7tVFiGJ7y7"
          class="text-xs text-slate-600 hover:underline"
        >
          (แผนที่ คลิก)
        </a>
      </div>
      <div class="mt-10" aria-label="schedule-table">
        <div
          v-for="(scheduleItem, index) in scheduleTableItems"
          :key="`scheduleItem${index}`"
          :class="[
            'grid grid-cols-2 py-3 divide-slate-800',
            index === 0 ? 'border-y' : 'border-b',
            isPassed(scheduleItem.dateTime) ? 'text-slate-200' : null,
            isPassed(scheduleItem.dateTime)
            && scheduleTableItems[index + 1]
            && isCurrent(scheduleItem.dateTime, scheduleTableItems[index + 1].dateTime)
              ? 'text-orange-400'
              : null,
          ]"
        >
          <p class="justify-self-center">
            เวลา {{ scheduleItem.timeText }}
          </p>
          <p aria-label="description">
            {{ scheduleItem.description }}
          </p>
        </div>
      </div>
      <p class="mt-10 text-center">
        จึงกราบเรียนญาติมิตรและท่านที่เคารพนับถือ<br class="sm:hidden">ร่วมอนุโมธนาการอุปสมบทในครั้งนี้
      </p>
      <p class="mt-3 text-center text-sm">(ขออภัยหากมิได้ไปเรียนเชิญด้วยตนเอง)</p>
    </div>
  </section>
</template>

<script>
require('@/assets/datejs');
export default {
  props: {
    isScrollTo: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      scheduleTableItems: [
        {
          dateTime: Date.parse('2022-03-13T01:16:00'),
          timeText: '๐๗.๐๐',
          description: 'พิธีปลงผมนาค',
        },
        {
          dateTime: Date.parse('2022-03-13T01:17:00'),
          timeText: '๐๘.๐๐',
          description: 'พิธีปลงผมนาค พิธีปลงผมนาค พิธีปลงผมนาค',
        },
        {
          dateTime: Date.parse('2022-03-13T01:17:30'),
          timeText: '๐๙.๐๐',
          description: 'พิธีปลงผมนาค',
        },
        {
          dateTime: Date.parse('2022-03-13T01:17:50'),
          timeText: '๑๐.๓๐',
          description: 'พิธีปลงผมนาค',
        }
      ],
      currrentTime: new Date().toString('HH:mm:ss'),

      interval: null,
    }
  },
  created() {
    if (this.isAllDone) {
      return;
    }
    this.interval = setInterval(this.setCurrentTime, 1000)
  },
  computed: {
    dateTimeNow() {
      return Date.parse(`${Date.today().toString('yyyy-MM-dd')}T${this.currrentTime}`)
    },
    isAllDone() {
      return this.isPassed(this.scheduleTableItems[this.scheduleTableItems.length - 1].dateTime)
    },
  },
  methods: {
    setCurrentTime() {
      console.log('in sets')
      this.currrentTime = new Date().toString('HH:mm:ss');
      if (this.isAllDone) {
      console.log('out sets')
        clearInterval(this.interval)
      }
    },

    isPassed(checkTime) {
      return this.dateTimeNow.compareTo(checkTime) > 0
    },
    isCurrent(checkTimeFrom, checkTimeTo) {
      return this.dateTimeNow.between(checkTimeFrom, checkTimeTo)
    },
  }
}
</script>

<style>
.content-wrapper {
  position: relative;
  z-index: 2;
  margin-top: min(80vh, 570px);
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-wrapper.custom-shadow {
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.schedule-title {
  position: relative;
}
.schedule-title::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 2px;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
  background-color: #fb923c;
  transition: width 600ms ease-in-out;
  transition-delay: 200ms;
}
.schedule-title.scrolled::after {
  width: 85px;
}

</style>