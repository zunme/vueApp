import { createStore } from "vuex";

const store = createStore({
  state: {
    apiInterval: 0,
    items:[
      {
          id: 'm1',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mighty_Mountains_with_Snow.jpg/640px-Mighty_Mountains_with_Snow.jpg',
          title: 'A trip into the mountains',
          description: 'It was a really nice trip!',
        },
        {
          id: 'm2',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/A_surfer_surfing_on_the_ocean_%28Unsplash%29.jpg/640px-A_surfer_surfing_on_the_ocean_%28Unsplash%29.jpg',
          title: 'Surfing the sea side',
          description: 'Feeling the cool breeze',
        },
    ]
  },
  getters: {
    getItems( state: any){
      return state.items;
    }
  },
  mutations: {
    setItems(state: any , value: any) {
      state.items = value;
    },
    
    startInterval(state: any){
      state.apiInterval = setInterval(()=>{
        console.log ( "start interval")
      }, 5000)
    },
    
    stopInterval(state: any){
      clearInterval(state.apiInterval)
    }    
  },
  actions: {
    setItems(context: any) {
      context.commit('setItems', []);
    },
    setInterval(context: any, value: any) {
      if (value ==='start') context.commit('startInterval');
      else context.commit('stopInterval');
    },
  },
});
export { store }