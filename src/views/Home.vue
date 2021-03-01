<template>
  <div class="home">
    <stepper :steps="steps" @stepper-finished="postAllDatas">
    </stepper>
  </div>
</template>

<script>
import Stepper from '@/components/Stepper.vue'
import HotelDateSelection from '@/components/steps/HotelDateSelection.vue'
import RoomSelection from '../components/steps/RoomSelection.vue'
import ReviewAndPayment from '../components/steps/ReviewAndPayment'
import axios from 'axios';

export default {
  name: 'Home',
  components: { Stepper },
  data() {
    return {
      steps: [
        {
          icon: 'date_range',
          name: 'first',
          title: 'Otel ve Tarih Seçimi',
          component: HotelDateSelection,
          content: {},
          completed: false
        },
        {
          icon: 'hotel',
          name: 'second',
          title: 'Oda Tipi ve Manzara Seçimi',
          component: RoomSelection,
          content: {},
          completed: false
        },
        {
          icon: 'credit_card',
          name: 'third',
          title: 'Önizleme ve Ödeme İşlemleri',
          component: ReviewAndPayment,
          content: {},
          completed: false
        }
      ]
    }
  },
  computed: {
    datas() {
      return this.$store.getters.getAllFields;
    }
  },
  methods:{
    postAllDatas() {
      axios.post('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings',
        this.datas[0]
     )
      .then(function (response) {
        console.log(response);
      })
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 0 10%;
}
</style>