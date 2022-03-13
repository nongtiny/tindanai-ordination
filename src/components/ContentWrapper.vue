<template>
  <section
    :class="[
      'content-wrapper bg-white rounded-t-2xl',
      isScrollTo ? 'custom-shadow' : null
    ]"
  >
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
      <p
        :class="[
          'text-xl text-center mt-10',
          isPassed(scheduleTableItems10[0].dateTime) ? 'text-slate-200' : null,
        ]"
      >
        วันอาทิตย์ที่ ๑๐ เมษายน พ.ศ. ๒๕๖๕
      </p>
      <div class="mt-4" aria-label="schedule-table">
        <div
          v-for="(scheduleItem, index) in scheduleTableItems10"
          :key="`scheduleItem${index}`"
          :class="[
            'grid grid-cols-2 py-3 divide-slate-800',
            index === 0 ? 'border-y' : 'border-b',
            isPassed(scheduleItem.dateTime) ? 'text-slate-200' : null,
            isPassed(scheduleItem.dateTime)
            && scheduleTableItems10[index + 1]
            && isCurrent(scheduleItem.dateTime, scheduleTableItems10[index + 1].dateTime)
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

        <p
          :class="[
            'text-xl text-center mt-10',
            isPassed(scheduleTableItems11[scheduleTableItems11.length - 1].dateTime) ? 'text-slate-200' : null,
          ]"
        >
          วันจันทร์ที่ ๑๑ เมษายน พ.ศ. ๒๕๖๕
        </p>
        <div class="mt-4" aria-label="schedule-table">
          <div
            v-for="(scheduleItem, index) in scheduleTableItems11"
            :key="`scheduleItem${index}`"
            :class="[
              'grid grid-cols-2 py-3 divide-slate-800',
              index === 0 ? 'border-y' : 'border-b',
              isPassed(scheduleItem.dateTime) ? 'text-slate-200' : null,
              isPassed(scheduleItem.dateTime)
              && scheduleTableItems11[index + 1]
              && isCurrent(scheduleItem.dateTime, scheduleTableItems11[index + 1].dateTime)
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
      </div>
      <p class="mt-10 text-center">
        กราบเรียนญาติมิตรและท่านที่เคารพนับถือ<br class="sm:hidden">ร่วมอนุโมธนาการอุปสมบทในครั้งนี้
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
      scheduleTableItems10: [
        {
          dateTime: Date.parse('2022-04-10T15:00:00'),
          timeText: '๑๕.๐๐',
          description: 'ประกอบพิธีปลงผมนาค ขอขมาผู้ใหญ่',
        },
      ],
      scheduleTableItems11: [
      {
          dateTime: Date.parse('2022-04-11T08:00:00'),
          timeText: '๐๘.๐๐',
          description: 'ตั้งขบวนส่งนาค',
        },
        {
          dateTime: Date.parse('2022-04-11T08:30:00'),
          timeText: '๐๘.๓๐',
          description: 'เริ่มตั้งขบวนแห่นาคเข้าโบสถ์',
        },
        {
          dateTime: Date.parse('2022-04-11T09:00:00'),
          timeText: '๐๙.๐๐',
          description: 'ผู้บรรพชาอุปสมบท เข้าโบสถ์เพื่อทำพิธีทางศาสนา',
        },
        {
          dateTime: Date.parse('2022-04-11T10:00:00'),
          timeText: '๑๐.๐๐',
          description: 'เป็นพระภิกษุใหม่เรียบร้อย',
        },
        {
          dateTime: Date.parse('2022-04-11T10:30:00'),
          timeText: '๑๐.๓๐',
          description: 'พระสงฆ์ สวดเจริญพุทธมนต์',
        },
        {
          dateTime: Date.parse('2022-04-11T11:00:00'),
          timeText: '๑๑.๐๐',
          description: 'ตักบาตรเลี้ยงพระใหม่',
        },
        {
          dateTime: Date.parse('2022-04-11T12:00:00'),
          timeText: '๑๒.๐๐',
          description: 'เลี้ยงฉลองพระใหม่ เชิญแขกร่วมรับประทานอาหาร',
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
    isDate10April() {
      return Date.today().equals(Date.parse('2022-04-10'))
    },
    isDate11April() {
      return Date.today().equals(Date.parse('2022-04-11'))
    },
    dateTimeNow() {
      return Date.parse(`${Date.today().toString('yyyy-MM-dd')}T${this.currrentTime}`)
    },
    isAllDone() {
      if (this.isDate10April) {
        return this.isPassed(this.scheduleTableItems10[this.scheduleTableItems10.length - 1].dateTime)
      }
      if (this.isDate11April) {
        return this.isPassed(this.scheduleTableItems11[this.scheduleTableItems11.length - 1].dateTime)
      }
      return false;
    },
  },
  methods: {
    setCurrentTime() {
      this.currrentTime = new Date().toString('HH:mm:ss');
      if (this.isAllDone) {
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
  margin-top: min(80vh, 600px);
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