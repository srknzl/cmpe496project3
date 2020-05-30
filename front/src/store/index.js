import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    furnitures: [],
    loggedIn: false,
    user: "",
  },
  mutations: {
    login(state, { user }) {
      state.user = user;
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = "";
    },
    setFurnitures(state, { furnitures }) {
      state.furnitures = furnitures;
    },
  },
  actions: {
    async fetchFurnitures(context, { vue }) {
      try {
        const res = await axios.get("http://localhost:3000/furnitures");
        context.commit("setFurnitures", { furnitures: res.data });
      } catch (error) {
        vue.$bvToast.toast(
          "Cannot fetch db records, make sure server is running"
        );
      }
    },
    async login(context, { vue }) {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          email: vue.email,
          password: vue.password,
        });
        context.commit("login", { user: res.data.user });
        vue.$bvToast.toast("Welcome " + res.data.user);
      } catch (error) {
        vue.$bvToast.toast("Cannot login, check your email and password");
      }
    },
    async vote(context, { vue, id }) {
      try {
        vue.creditCard(id);
      } catch (error) {
        vue.$bvToast.toast("Cannot reach to server, make sure it is running");
      }
    },
    async voteDone(context, { vue, id }) {
      try {
        const res = await axios.post("http://localhost:3000/vote", {
          user: vue.user,
          vote: id,
        });
        vue.$bvToast.toast("Bought!");
        context.dispatch("fetchFurnitures", { vue: vue });
      } catch (error) {
        vue.$bvToast.toast("Cannot reach to server, make sure it is running");
      }
    },
    async signup(context, { vue }) {
      try {
        const res = await axios.post("http://localhost:3000/signup", {
          email: vue.email2,
          password: vue.password2,
        });
        vue.$bvToast.toast("Signup complete");
      } catch (error) {
        vue.$bvToast.toast("Cannot login, check your email and password");
      }
    },
  },
  modules: {},
});
