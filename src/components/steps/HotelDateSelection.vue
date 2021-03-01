<template>
  <step-content>
    <div class="wrapper">
      <form>
      <row container :gutter="12">
        <column :xs="12" :md="12" :lg="12">
        <div class="search-icon">
           <i class="fas fa-search"></i>
        </div>
          <select class="hotel-select" v-model="hotelForm.hotel" @change="onHotelSelected($event)" :class="{ 'is-invalid': submitted && $v.hotelForm.hotel.$error }">
            <option value="" disabled selected hidden>Rezervasyon yapmak istediğiniz oteli seçiniz</option>
            <option v-for="item in hotels" :value="item"
              :key="item.id" >
                {{ item.hotel_name }}
            </option>
          </select>
          <div v-if="submitted && !$v.hotelForm.hotel.required" class="invalid-feedback">Otel seçimi zorunlu</div>
        </column>
      </row>

      <row container :gutter="12" class="table-content">
        <column class="d-flex table-cell" :xs="12" :md="6" :lg="3">
          <label>Giriş Tarihi</label>
          <date-picker v-model="hotelForm.checkin" valueType="format" :class="{ 'is-invalid': submitted && $v.hotelForm.checkin.$error }" @change="(event) => onChangeField('checkin', event)"></date-picker>
          <div v-if="submitted && !$v.hotelForm.checkin.required" class="invalid-feedback">Lütfen tarih seçiniz</div>
        </column>
        <column class="d-flex table-cell" :xs="12" :md="4" :lg="3">
          <label>Çıkış Tarihi</label>
          <date-picker v-model="hotelForm.checkout" valueType="format" @change="(event) => onChangeField('checkout', event)"></date-picker>
        </column>
        <column class="d-flex table-cell" :xs="12" :md="6" :lg="3">
          <label>Yetişkin Sayısı</label>
          <input class="number-input" type="number" v-model="hotelForm.adultNumber" list="adults" min="0" :max="adultSize" @change="(event) => onChangeField('adultNumber', hotelForm.adultNumber)">
          <datalist id="adults">
            <option v-for="adult in adultSize"
              :key="adult" >
                {{ adult }}
            </option>
          </datalist>
        </column>
        <column class="d-flex table-cell" :xs="12" :md="6" :lg="3">
          <label>Çocuk Sayısı</label>
          <input class="number-input" type="number" v-model="hotelForm.childNumber" list="childs" min="0" max="5" :disabled="!childStatus" @change="(event) => onChangeField('childNumber', hotelForm.childNumber)">
          <datalist id="childs">
            <option v-for="size in 5" :value="size"
              :key="size" >
                {{ size }}
            </option>
          </datalist>
        </column>
      </row>
    </form>
    </div>
  </step-content>
</template>

<script>
import Column from '@/components/responsive/Column.vue';
import Row from '@/components/responsive/Row.vue';
import StepContent from './StepContent';
import axios from 'axios';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'hotel-date-selection',
    components: { StepContent, Column, Row, DatePicker},
    mixins: [validationMixin],

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
        hotels: [],
        hotelDescriptions: [],
        hotelForm: {
          hotel: '',
          checkin: '',
          checkout: '',
          adultNumber: null,
          childNumber: null
        },
        adultSize: null,
        childStatus: null,
        submitted: false,
        deneme: null
      };
    },
    mounted() {
      this.passDataToParent();
    },

    created() {
      this.getHotelNames(),
      this.getHotelDescriptions()
    },
  validations() {
    let validationObj = {
      hotelForm: {
        hotel: { required },
        checkin: { required },
        checkout: { required },
        adultNumber: { required }
      }
    };

    return validationObj;
  },
  watch: {
    clickedNext(val) {
      if(val === true) {
          this.$v.hotelForm.$touch();
      }
    }
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
    onHotelSelected () {
      let findHotel = this.hotelDescriptions.find(o => o.id === this.hotelForm.hotel.id);
      this.adultSize = findHotel.max_adult_size ? findHotel.max_adult_size : 5;
      this.childStatus = findHotel.child_status;
      this.$store.dispatch('addHotelDataAction', findHotel);
    },
    onChangeField(field, value) {
      this.hotelForm[field] = value;
      this.passDataToParent();
    },
    passDataToParent() {
      this.$emit('set-data', {
        data: this.hotelForm
      });
    },
    save() {
        this.submitted = true;

        let form = this.$v.hotelForm;
        form.$touch();

      if (form.$invalid) {
        return;
      }
    }
  }
}
</script>

<style lang="scss">
.hotel-select {
  width: 100%;
  padding: 10px;
  padding-left: 35px;
  font-size: 16px;
}
label {
  padding-bottom: 10px;
}
select {
    border-color: #363636;
    height: 50px;
  }
  input::-webkit-calendar-picker-indicator {
    display: none;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button{
    opacity: 1;
    width: 36px;
    height: 48px;
}

.number-input {
  height: 48px;
  padding: 0;
  padding-left: 10px;
  border-width: 1px;
}
  .mx-datepicker {
    width: 100%;
    .mx-input {
      height: 50px;
      border-color: #363636;
      border-radius: 0;
    }

    .mx-icon-calendar {
      color: #363636;
      font-size: 24px;
    }
  }

  .d-flex {
    display: flex;
    flex-direction: column;
  }
  .search-icon {
    position: absolute;
    margin-top: 14px;
    margin-left: 8px;
    i {
      font-size: 24px;
    }
  }
  .wrapper {
    border: 1px solid #efefef;
    border-radius: 10px;
    padding: 4%;
  }
  .table-content {
    padding-top: 30px;
    .table-cell {
      border: 1px solid #363636;
      padding: 25px;
    }

    @media (min-width: 992px) {
      .table-cell:not(:first-child) {
          border-left: none;
        }
    }
    @media (min-width: 1200px) {
      .table-cell:not(:first-child) {
          border-left: none;
        }
    }
}
</style>