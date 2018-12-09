<template>
  <div class="grid-container">
    <div class="grid-x grid-padding-x">
      <div class="medium-6 cell">
        <label for="username">Username
          <input id="username" type="text" v-model="username">
        </label>
      </div>
      <div class="medium-6 cell">
        <label for="password">Password
          <input id="password" type="text" v-model="password">
        </label>
      </div>
    </div>
    <div class="grid-x grid-padding-x">
      <div class="medium-6 cell">
        <label for="method">Method
          <select id="method" v-model="selectedMethod">
            <option v-for="(method, index) in methods" :key="index">{{method}}</option>
          </select>
        </label>
      </div>
      <fieldset class="medium-6 cell">
        <legend>Method</legend>
        <span v-for="(method, index) in methods" :key="index">
              <input type="radio" id="method2" v-model="selectedMethod" :value="method">
            <label for="method2">{{method}}</label>
          </span>
      </fieldset>
    </div>
    <div class="callout">
      <div>
        <code v-show="encryptedResult !== ''">{{ username }}{{ seperator }}{{ encryptedResult }}</code>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

const METHODS = { MD5: "md5", SHA1: "sha1" };
export default {
  name: "HtAccess",
  data() {
    return {
      username: "",
      password: "",
      selectedMethod: "md5",
      methods: ["md5", "sha1"]
    };
  },
  computed: {
    encryptedResult() {
      if (this.password !== "") {
        return this.getHash(this.selectedMethod, this.password);
      } else {
        return "";
      }
    },
    seperator() {
      return this.password !== "" ? ":" : "";
    }
  },
  methods: {
    getHash(method, value) {
      if (method === METHODS.MD5) {
        return CryptoJS.HmacMD5("!123", value).toString();
      } else if (method === METHODS.SHA1) {
        return CryptoJS.HmacSHA1(value).toString();
      }
    }
  }
};
</script>
