<template>
  <div class="grid-container">
    <div class="grid-x grid-padding-x">
      <div class="medium-6 cell">
        <label for="username">Username
          <input id="username" type="text" v-model.trim="username">
        </label>
      </div>
      <div class="medium-6 cell">
        <label for="password">Password
          <input id="password" type="password" v-model="password">
        </label>
      </div>
    </div>
    <div class="grid-x grid-padding-x">
      <div class="medium-6 cell">
        <label for="method">Method
          <select id="method" v-model="selectedMethod">
            <option v-for="(method, index) in methods" :value="method" :key="index">{{method}}</option>
          </select>
        </label>
      </div>
      <div class="medium-6 cell">
        <label for="salt">Salt length
          <input id="salt" type="number" v-model.number="saltLength">
        </label>
      </div>
    </div>
    <div class="callout">
      <div>
        <template v-if="calculating">
          <div class="loader"></div>
        </template>
        <template v-else>
          <code v-show="result !== ''">{{ username }}{{ seperator }}{{ result }}</code>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import debounce from "lodash.debounce";
import CryptoJS from "crypto-js";
const METHODS = { BCRYPT: "bcrypt", MD5: "md5" };
const PREFIXES = { BCRYPT: "$2y$", MD5: "$apr1$" };
export default {
  name: "Htpasswrd",
  data() {
    return {
      username: "",
      password: "",
      saltLength: 10,
      result: "",
      debounceTimer: 500,
      calculating: false,
      selectedMethod: METHODS.BCRYPT,
      methods: [METHODS.BCRYPT, METHODS.MD5]
    };
  },
  computed: {
    seperator() {
      return this.password !== "" ? ":" : "";
    }
  },
  watch: {
    password() {
      const self = this;
      if (self.password !== "") {
        if (this.selectedMethod === METHODS.BCRYPT) {
          this.debouncedBcrypt();
        } else if (this.selectedMethod === METHODS.MD5) {
          this.debouncedMd5();
        }
      } else {
        self.result = "";
      }
    }
  },
  methods: {
    setBcryptHash() {
      const self = this;
      self.calculating = true;
      bcrypt.genSalt(self.saltLength, (err, salt) => {
        if (!err) {
          bcrypt.hash(self.password, salt, (err, hash) => {
            if (!err) {
              self.result = `${PREFIXES.BCRYPT}${hash}`;
              self.calculating = false;
            }
          });
        }
      });
    },
    setMd5Hash() {
      const hash = CryptoJS.MD5(this.password).toString();
      this.result = `${PREFIXES.MD5}${hash}`;
    }
  },
  created() {
    this.debouncedBcrypt = debounce(this.setBcryptHash, this.debounceTimer);
    this.debouncedMd5 = debounce(this.setMd5Hash, this.debounceTimer);
  }
};
</script>
<style>
.loader {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
