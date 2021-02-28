<template>
    <step-content>
    <div class="review-container">
     <div class="credit-card-content">
      <row container :gutter="12" style="justify-content: center">
        <img src="../../assets/credit-card.png" alt="" class="credit-card-img">
      </row>

      <div class="credit-card-infos">
        <div class="credit-card-title">Kredi Kartı Bilgileri</div>
      <row container :gutter="12">
        <column class="d-flex" :xs="12" :md="6" :lg="12">
          <label>Kartın Üzerindeki İsim</label>
          <input type="text" class="text-input" v-model="allFields.card_name" placeholder="Kartın üzerindeki ismi giriniz">
        </column>
      </row>
      <row container :gutter="12">
        <column class="d-flex" :xs="12" :md="12" :lg="12">
          <label>Kartın Numarası</label>
          <input type="text" class="text-input" v-model="allFields.card_number" placeholder="Kartın numarasını giriniz">
        </column>
      </row>
      <row container :gutter="12">
        <column class="d-flex" :xs="12" :md="6" :lg="3" >
          <label>Kartın Son Kullanma Tarihi</label>
          <select class="select-input" style="margin-right:10px" v-model="allFields.card_date_month">
            <option value="" disabled selected hidden>Ay</option>
            <option v-for="item in months" :value="item" :key="item">
              {{ item }}
            </option>
          </select>
        </column>
        <column class="d-flex" style="margin-top: 28px;" :xs="12" :md="3" :lg="3">
          <select class="select-input" style="margin-left:10px" v-model="allFields.card_date_year">
            <option value="" disabled selected hidden>Yıl</option>
            <option v-for="item in (2040 - 2020 + 1)" :value="item + 2020" :key="item">
              {{ item  + 2020}}
            </option>
          </select>
        </column>
        <column class="d-flex" :xs="12" :md="3" :lg="3" style="margin-left: 25%">
          <label>CCV</label>
          <input type="text" class="text-input" v-model="allFields.card_cvv" placeholder="CCV giriniz">
        </column>
      </row>
      </div>
     </div>

     <div class="payment-info-container">
      <p class="hotel-name"><b>{{firstStepData.hotel.hotel_name}}</b> ({{foundHotel.city}})</p>

      <row container :gutter="12">
        <column :xs="12" :md="6" :lg="6" >
          <div class="info-box">
            <p><b>Giriş Tarihi:</b></p>
            <p>{{firstStepData.checkin}}</p>
          </div>
        </column>
        <column :xs="12" :md="6" :lg="6" >
          <div class="info-box">
            <p><b>Çıkış Tarihi:</b></p>
            <p>{{firstStepData.checkout}}</p>
          </div>
        </column>
      </row>

      <row container :gutter="12">
        <column :xs="12" :md="6" :lg="6" >
          <div class="info-box">
            <p><b>Yetişkin:</b></p>
            <p>{{firstStepData.adultNumber}}</p>
          </div>
        </column>
        <column :xs="12" :md="6" :lg="6" >
          <div class="info-box">
            <p><b>Çocuk:</b></p>
            <p>{{firstStepData.childNumber === null ? 0 : firstStepData.childNumber}}</p>
          </div>
        </column>
      </row>

      <row container :gutter="12">
        <column :xs="12" :md="6" :lg="6" >
          <div class="info-box">
            <p><b>Oda Tipi:</b></p>
            <p>{{secondStepData.selectedRoom.title}}</p>
          </div>
        </column>
        <column :xs="12" :md="6" :lg="6" >
          <div class="info-box">
            <p><b>Manzara:</b></p>
            <p>{{secondStepData.selectedScenic.title}}</p>
          </div>
        </column>
      </row>

      <row container :gutter="12">
        <column :xs="12" :md="12" :lg="12" >
          <div class="info-box row">
            <input type="text" placeholder="Kupon kodu" class="text-input">
            <button class="use-button">Kodu kullan</button>
          </div>
        </column>
      </row>

      <div class="info-box not-center price">
        <p><b>Oda Fiyatı</b><span>{{secondStepData.selectedRoom.price}} TL</span></p>
        <p><b>Fiyat Etki Oranı</b> <span>%{{secondStepData.selectedScenic.price_rate}}</span></p>
        <p><b>Konaklama </b> ({{dateDifference}} gün) <span>{{totalRoomPrice}} TL</span></p>
        <div class="divider"></div>

        <div class="total-price">
          <p>Toplam Tutar</p>
          <p style="font-size: 28px">{{totalPrice}} TL</p>
        </div>
      </div>

     </div>
    </div>
  </step-content>
</template>

<script>
import Column from '@/components/responsive/Column.vue';
import Row from '@/components/responsive/Row.vue';
import StepContent from './StepContent';

export default {
  components: {Column, Row, StepContent},

   data() {
      return {
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        // allFields :
        //   {
        //     hotel_id: this.firstStepData.hotel.id ,
        //     start_date: this.firstStepData.checkin,
        //     end_date: this.firstStepData.checkout,
        //     adult: this.firstStepData.adultNumber,
        //     child: this.firstStepData.childNumber === null ? 0 : this.firstStepData.childNumber,
        //     room_type: 2,
        //     room_scenic: 3,
        //     price: 7676,
        //     coupon_code: "CODE100", 
        //     card_name: "Ali Yılmaz", 
        //     card_number: "1111222233334444", 
        //     card_date_month: "01", 
        //     card_date_year: "2030",
        //     card_cvv: "999"
        // }
         allFields :
          {
            hotel_id: null ,
            start_date: null,
            end_date: null,
            adult: null,
            child: null,
            room_type: null,
            room_scenic: null,
            price: null,
            coupon_code: "", 
            card_name: "", 
            card_number: "", 
            card_date_month: "", 
            card_date_year: "",
            card_cvv: ""
        }
    }
  },
  computed: {
    firstStepData() {
      return this.$store.getters.getAddedDataList[0][0].content
    },
    secondStepData() {
      return this.$store.getters.getAddedDataList[1][1].content
    },
    hotelDetails () {
      return this.$store.getters.getHotelDetails;
    },
    foundHotel(){
      return this.hotelDetails.find(o => o.id === this.firstStepData.hotel.id);
    },
    dateDifference() {
      return this.$store.getters.getDateDifference;
    },
    totalRoomPrice() {
      return this.secondStepData.selectedRoom.price * this.firstStepData.adultNumber * (this.firstStepData.childNumber !== null ? this.firstStepData.childNumber : 1)
    },
    totalPrice() {
      let priceRate =  (this.secondStepData.selectedScenic.price_rate * this.totalRoomPrice) / 100;
      let total = this.totalRoomPrice + priceRate;

      console.log('aa', this.totalRoomPrice, priceRate);
      return total
    }
  }
}
</script>

<style lang="scss">
.review-container {
  display: flex;
  .credit-card-content {
    width: 60%;
    margin-right: 8px;
    border: 1px solid #efefef;
    padding: 3%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .credit-card-img {
      width: 100%;
      max-width: 400px;
      height: auto;
    }
    .credit-card-info {
      display: flex;
      flex-direction: column;
    }

    .text-input{
      height: 24px;
      margin-bottom: 10px;
    }
    .select-input {
      height: 24px;
    }
  }
  .reservation-info {
    width: 40%;
  }
  .credit-card-infos {
    border: 1px solid #323232;
    padding: 25px 15px;
    margin-top: 30px;

    .credit-card-title {
      position: absolute;
      margin-top: -2%;
      z-index: 9;
      background: white;
      padding: 0 5px;
      font-weight: bold;
    }
  }
  .payment-info-container {
    background-color: #f2f2f2;
    border-radius: 10px;
    width: 28%;
    margin-left: 8px;
    padding: 3%;

    .info-box {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      margin: 10px;
      align-items: center;
      display: flex;
      flex-direction: column;

      &.row {
        flex-direction: row;
      }
      &.not-center {
        align-items: initial !important;;
      }

      &.price {
        p {
          display: flex;
          padding-bottom: 10px;

          span {
            margin-left: auto;
          }
        }
        .total-price {
          font-weight: bold;

          p {
            justify-content: center;
            text-transform: uppercase;
          }
        }
      }
    }

    .use-button {
      background-color: #233A62;
      color: white;
      margin-left: auto;
    }
  }
}

</style>