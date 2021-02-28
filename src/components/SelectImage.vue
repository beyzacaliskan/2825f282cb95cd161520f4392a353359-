<template>
  <div :class="rootClass">
    <row container :gutter="12" :class="`${rootClass}__wrapper`">
      <column :xs="12" :md="6" :lg="4" v-for="(dataHotel, index) in dataHotelsLocal" :key="index" style="padding-right: 15px">
        <div
          :class="classThumbnail(singleSelected.id, dataHotel.id)"
          @click="onSelectImage(dataHotel)"
        >
        <div style="padding-bottom: 10px"><b>{{dataHotel.title}}</b></div>

          <img
            :src="dataHotel.photo"
            :id="dataHotel.id"
            :height="h"
            :width="w"
            :class="`${rootClass}__img`"
          />
          <div class="info-wrapper" v-if="type === 'room'">
            <div>
              <p>{{calculateDateDifference}} Gün</p>
              <p>{{reservationInfo.adultNumber}} Yetişkin 
                <span>{{childStatus}}</span>
              </p>
            </div>

            <p class="big-effect">{{ dataHotel.price * calculateDateDifference * reservationInfo.adultNumber * (reservationInfo.childNumber !== null ? reservationInfo.childNumber : 1) + ' TL' }}</p>
          </div>

          <div v-else class="info-wrapper">
            <p>Fiyat Etki Oranı</p>
            <p class="big-effect"> + {{dataHotel.price_rate}}%</p>
          </div>
        </div>
      </column>
    </row>
  </div>
</template>

<script>
import moment from 'moment';
import Column from '@/components/responsive/Column.vue';
import Row from '@/components/responsive/Row.vue';

export default {
  name: "select-image",
  components: { Column, Row },
  props: {
    dataHotels: {
      type: Array,
      default: () => []
    },
    selectedImages: {
      type: Array,
      default: () => []
    },
    useLabel: {
      type: Boolean,
      default: false
    },
    rootClass: {
      type: String,
      default: "vue-select-image"
    },
    activeClass: {
      type: String,
      default: "--selected"
    },
    h: {
      type: String,
      default: "auto"
    },
    w: {
      type: String,
      default: "auto"
    },
    limit: {
      type: Number,
      default: 0
    },
    reservationInfo: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      singleSelected: {
        id: ""
      },
    };
  },
  computed: {
    dataHotelsLocal: function() {
      return this.dataHotels || [];
    },
    calculateDateDifference() {
      var start = moment(this.reservationInfo.checkin, "YYYY-MM-DD");
      var end = moment(this.reservationInfo.checkout, "YYYY-MM-DD");
      this.$store.dispatch('addDateDifferenceAction', moment.duration(end.diff(start)).asDays());
      return moment.duration(end.diff(start)).asDays();
    },
    childStatus() {
      return this.reservationInfo.childNumber === null ? '' : (this.reservationInfo.childNumber + ' Çocuk')
    },
    calculatedPrice() {
      let roomPrice = this.dataHotels;
      console.log('roomPrice', roomPrice)
      return roomPrice;
    }
  },
  mounted() {
    // set initial selectedImage
    this.setInitialSelection();
  },
  methods: {
    classThumbnail(selectedId, imageId, isDisabled) {
      const baseClass = `${this.rootClass}__thumbnail`;
      if (isDisabled) {
        return `${baseClass} ${baseClass}--disabled`;
      }
      if (selectedId === imageId) {
        return `${baseClass} ${baseClass}${this.activeClass}`;
      }
      return `${baseClass}`;
    },
    onSelectImage(objectImage) {
      if (!objectImage.disabled) {
        this.singleSelected = Object.assign({}, this.singleSelected, objectImage);
        this.$emit("onselectimage", objectImage);
      }
    },
    isExistInArray(id) {
      return this.multipleSelected.find(item => {
        return id === item.id;
      });
    },
    removeFromSingleSelected() {
      this.singleSelected = {};
      this.$emit("onselectimage", {});
    },
    setInitialSelection() {
      if (this.selectedImages) {
        if (this.selectedImages.length === 1) {
          this.singleSelected = Object.assign({}, this.selectedImages[0]);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.vue-select-image__wrapper {
  overflow: auto;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

.vue-select-image__item {
  margin: 0px 12px 12px 0px;
  float: left;
}

.vue-select-image__thumbnail{
  cursor: pointer;
  padding: 30px;
  border: 1px solid #fafafa;

  display: block;
  line-height: 20px;

  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;

  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);

  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.vue-select-image__thumbnail--selected{
  border-color: #589c2a;
}

.vue-select-image__thumbnail--disabled{
  background: #b9b9b9;
  cursor: not-allowed;
}

.vue-select-image__thumbnail--disabled > .vue-select-image__img{
  opacity: .5;
}

.vue-select-image__img{
  -webkit-user-drag: none;
  display: block;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.vue-select-image__lbl{
  line-height: 3;
}

@media only screen and (min-width: 1200px) {
  .vue-select-image__item {
    margin-left: 30px;
  }
}

.info-wrapper {
  display: flex;
  justify-content: space-between;
  padding-top:10px;

  .big-effect {
    font-size: 24px;
  }
}
</style>