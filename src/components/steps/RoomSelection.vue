<template>
  <step-content>
      <div class="preview-reservation">
          <p class="hotel-name"><b>{{getReservation.hotel.hotel_name}}</b> ({{foundHotel.city}})</p>
          <p><b>Giriş Tarihi: </b> {{getReservation.checkin}} - <b>Çıkış Tarihi:</b> {{getReservation.checkout}} - <b>Yetişkin:</b> {{adults}} - <b>Çocuk:</b> {{childs}} </p>
      </div>

      <div class="room-types">
        <h2>Oda Tipi Seçimi</h2>
        <div class="divider"></div>

        <select-image
            :dataHotels="foundHotel.room_type"
            :reservationInfo="getReservation"
            type="room"
            @onselectimage="onSelectRoom"
           >
        </select-image>
      </div>

      <div class="room-types">
        <h2>Manzara Seçimi</h2>
        <div class="divider"></div>

        <select-image
            :dataHotels="foundHotel.room_scenic"
            :reservationInfo="getReservation"
            @onselectimage="onSelectScenic"
            type="scenic"
        >
        </select-image>
      </div>
  </step-content>
</template>

<script>
import StepContent from './StepContent';
import axios from 'axios';
import SelectImage from '../SelectImage';

export default {
    name: 'room-selection',
    components: { StepContent, SelectImage },

    props: {
      data: {
        type: Object,
        default: () => ({})
      },
      cursor: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        hotelDescriptions: [],
        fields: {
          selectedRoom: [],
          selectedScenic: []
        }
      };
    },
    mounted() {
    //   this.passDataToParent();
    },

    computed: {
        getReservation () {
            return this.$store.getters.getAddedDataList[0][0].content;
        },
        hotelDetails () {
            return this.$store.getters.getHotelDetails;
        },
        adults() {
            return this.getReservation.adultNumber === null ? 0 : this.getReservation.adultNumber;
        },
        childs() {
            return this.getReservation.childNumber === null ? 0 : this.getReservation.childNumber;
        },
        foundHotel(){
            return this.hotelDetails.find(o => o.id === this.getReservation.hotel.id);
        }
    },

    created() {
      this.getHotelNames()
    //   this.getHotelDescriptions()
    },

  methods: {
    getHotelNames() {
      axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels`)
      .then(response => {
      this.hotels = response.data
     })
    },
    getHotelDescriptions () {
      axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details`)
      .then(response => {
      this.hotelDescriptions = response.data
     })
    },
    onChangeField(field, value) {
      this.fields[field] = value;
      this.passDataToParent();
    },
    passDataToParent() {
      this.$emit('set-data', {
        data: this.fields,
      });
    },
    onSelectRoom(data) {
      this.fields.selectedRoom = data;
      this.passDataToParent();
    },
    onSelectScenic(data) {
      this.fields.selectedScenic = data;
      this.passDataToParent();
    }
  }
}
</script>

<style lang="scss">
.preview-reservation {
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 40px;
}
.hotel-name {
    font-size: 24px;
    padding-bottom: 15px;
}
.divider {
    width: 100%;
    height: 1px;
    background-color: #f2f2f2;
    margin-bottom: 25px;
}
</style>