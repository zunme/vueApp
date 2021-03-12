import { createStore } from "vuex";

const store = createStore({
  state: {
    counter: 10
  },
  getters: {
    time2(state) {
      return state.counter * 2;
    }
  },
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    }
  }
});

export {store}