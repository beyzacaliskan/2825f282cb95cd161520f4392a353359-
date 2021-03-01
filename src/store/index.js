import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: [],
    hotelDetails: [],
    dateDifference: null,
    allFields: []
  },
  mutations: {
    addDataMutation(state, data) {
      state.dataList.push(data)
    },
    addHotelDataMutation(state, data) {
      state.hotelDetails.push(data)
    },
    addDateDifferenceMutation(state, data) {
      state.dateDifference = data
    },
    addFieldsMutation(state, data) {
      state.allFields.push(data)
    }
  },
  actions: {
    addDataAction(context, data) {
      context.commit('addDataMutation', data);
    },
    addHotelDataAction(context, data) {
      context.commit('addHotelDataMutation', data);
    },
    addDateDifferenceAction(context, data) {
      context.commit('addDateDifferenceMutation', data);
    },
    addFieldsAction(context, data) {
      context.commit('addFieldsMutation', data);
    }
  },
  getters: {
    getAddedDataList(state) {
      return state.dataList;
    },
    getHotelDetails(state) {
      return state.hotelDetails;
    },
    getDateDifference(state) {
      return state.dateDifference;
    },
    getAllFields(state) {
      return state.allFields;
    }
  },
  modules: {
  }
})
