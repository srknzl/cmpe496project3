<template>
  <div class="home">
    <h1 style="text-align: center;">Furniture Shop</h1>
    <b-button v-if="!loggedIn" style="max-width: 10rem" variant="success" @click="onSignup">Signup</b-button>
    <b-button v-if="loggedIn" style="max-width: 10rem" variant="danger" @click="onLogout">Logout</b-button>
    <br />
    <p v-if="loggedIn">Logged in as {{user}}</p>
    <br />
    <p>Our most loved furnitures will be listed first</p>
    <br />
    <div id="furnitures">
      <b-card
        v-for="(f,ind) in furnitures"
        :key="ind"
        :title="f.name"
        :img-src="f.imageUrl"
        :img-alt="'Mobilya resmi '+ ind"
        img-top
        tag="article"
        img-height="300"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Price: {{f.price}}₺</b-card-text>
        <b-card-text>Bought: {{f.vote}} times</b-card-text>
        <b-button @click="onBuy(f.id)" variant="primary">Buy</b-button>
      </b-card>
    </div>

    <b-modal
      id="modal-1"
      title="Login"
      @ok="handleLogin"
      :ok-disabled="!validationEmail || !validationPassword"
    >
      <b-form>
        <label for="feedback-email">Email</label>
        <b-input
          autofocus
          v-model="email"
          type="email"
          :state="validationEmail"
          id="feedback-email"
        ></b-input>
        <b-form-invalid-feedback :state="validationEmail">Not a valid email</b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationEmail">Looks Good.</b-form-valid-feedback>
        <label for="feedback-password">Password</label>
        <b-input
          v-model="password"
          :state="validationPassword"
          id="feedback-password"
          type="password"
        ></b-input>
      </b-form>
    </b-modal>

    <b-modal
      id="modal-2"
      title="Signup"
      @ok="handleSignup"
      :ok-disabled="!validationEmail2 || !validationPassword2"
    >
      <b-form>
        <label for="feedback-email2">Email</label>
        <b-input
          autofocus
          v-model="email2"
          type="email"
          :state="validationEmail2"
          id="feedback-email2"
        ></b-input>
        <b-form-invalid-feedback :state="validationEmail2">Not a valid email</b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationEmail2">Looks Good.</b-form-valid-feedback>
        <label for="feedback-password2">Password</label>
        <b-input
          v-model="password2"
          :state="validationPassword2"
          id="feedback-password2"
          type="password"
        ></b-input>
      </b-form>
    </b-modal>
    <b-modal
      id="modal-3"
      title="Buy Furniture"
      @ok="handleCreditCard"
      :ok-disabled="!validationCreditCardType|| !validationCreditCardNumber || !validationDate || !validationEmail3"
    >
      <b-form>
        <b-form-group id="creditcardtype" label="Credit Card Type" label-for="creditcardtypeinput">
          <b-form-select
            id="creditcardtypeinput"
            name="creditcardtype"
            v-model="creditcardtype"
            :options="creditcardtypes"
            :state="validationCreditCardType"
          ></b-form-select>
          <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="creditcardnumber" label="Credit Card" label-for="creditcardnumberinput">
          <b-form-input
            autofocus
            id="creditcardnumberinput"
            name="creditcardnumber"
            type="text"
            :state="validationCreditCardNumber"
            v-model="creditcardnumber"
          ></b-form-input>
          <b-form-invalid-feedback>Your credit card number should be 16 characters long.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="date" label="Date:" label-for="dateinput">
          <b-form-input
            type="text"
            id="dateinput"
            name="date"
            :state="validationDate"
            v-model="date"
          ></b-form-input>
          <b-form-invalid-feedback>Please enter as mm/yy</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="email3" label="Email" label-for="email3input">
          <b-form-input
            type="email"
            id="email3input"
            name="email"
            :state="validationEmail3"
            v-model="email3"
          ></b-form-input>
          <b-form-invalid-feedback>Not a valid email</b-form-invalid-feedback>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#furnitures {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
  grid-column-gap: 1rem;
}
@media screen and (max-width: 640px) {
  #furnitures {
    display: grid;
    grid-template-columns: auto;
    justify-content: center;
    align-items: center;
    grid-column-gap: 0rem;
  }
}
</style>
<script>
import store from "../store/index";

export default {
  name: "Home",
  components: {},
  created() {
    store.dispatch("fetchFurnitures", { vue: this });
  },
  data() {
    return {
      email: "",
      password: "",
      email2: "",
      email3: "",
      date: "",
      password2: "",
      id: 1,
      creditcardnumber: "",
      creditcardtype: "",
      creditcardtypes: ["", "Mastercard", "Visa", "Discover"]
    };
  },
  computed: {
    validationEmail() {
      const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      return email_regex.test(this.email);
    },
    validationPassword() {
      return this.password != "";
    },
    validationEmail2() {
      const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      return email_regex.test(this.email2);
    },
    validationEmail3() {
      const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      return email_regex.test(this.email3);
    },
    validationPassword2() {
      return this.password2 != "";
    },
    validationCreditCardNumber() {
      return this.creditcardnumber.length == 16;
    },
    validationCreditCardType() {
      return this.creditcardtype != "";
    },
    validationDate() {
      return (
        this.date.length == 5 &&
        this.date[2] == "/" &&
        parseInt(this.date.substring(0, 2)) <= 12 &&
        parseInt(this.date.substring(0, 2)) >= 1 &&
        parseInt(this.date.substring(3, 5)) <= 99 &&
        parseInt(this.date.substring(3, 5)) >= 0
      );
    },
    furnitures() {
      return store.state.furnitures.sort((a, b) => (a.vote < b.vote ? 1 : -1));
    },
    loggedIn() {
      return store.state.loggedIn;
    },
    user() {
      return store.state.user;
    }
  },
  methods: {
    onBuy(id) {
      if (!this.loggedIn) {
        this.email = "";
        this.password = "";
        this.$bvModal.show("modal-1");
      } else {
        store.dispatch("vote", {
          vue: this,
          id: id
        });
      }
    },
    onSignup() {
      this.email2 = "";
      this.password2 = "";
      this.$bvModal.show("modal-2");
    },
    onLogout() {
      store.commit("logout");
      this.$bvToast.toast("Logged out!");
    },
    handleLogin() {
      store.dispatch("login", {
        vue: this
      });
    },
    handleLogout() {
      store.commit("logout");
    },
    handleSignup() {
      store.dispatch("signup", { vue: this });
    },
    creditCard(id) {
      this.id = id;
      this.creditcardnumber = "";
      this.creditcardtype = "";
      this.date = "";
      this.email3 = "";
      this.$bvModal.show("modal-3");
    },
    handleCreditCard() {
      store.dispatch("voteDone", {
        vue: this,
        id: this.id
      });
    }
  }
};
</script>
