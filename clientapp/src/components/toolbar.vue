<template>
  <div>
    <v-toolbar :class="{'toolbar2' : windowTop >= heightScroll}" class="toolbar1 d-block" flat>
      <a class="d-block aLogo ml-5" href="/">
        <img class="h-100 imgLogo" src="../assets/PrimaryPage/trello-logo-blue.png" />
      </a>

      <v-spacer></v-spacer>
      <!--not registered-->
      <v-btn
        v-show="!GetIsAuthenticated"
        color="green darken-1"
        dark
        class="mx-sm-5 mx-1 text-subtitle-1 font-weight-medium toolbar_button"
        @click="SetSign('true'), SetSignMode('login')"
      >
        Войти
        <v-icon class="ml-3">mdi-account-key</v-icon>
      </v-btn>

      <!--registered-->
      <div v-show="GetIsAuthenticated">
        <v-btn icon dark class="mx-sm-2 mx-1 text-subtitle-1 font-weight-medium" title="Домой">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn icon dark class="mx-sm-2 mx-1 text-subtitle-1 font-weight-medium" href="/createtable" title="Создать">
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          icon
          dark
          class="mx-sm-2 mx-1 text-subtitle-1 font-weight-medium"
          title="Профиль"
          href="/profile"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import requestGET from "../scripts/requestGET.js";

export default {
  props: {
    heightScroll: String,
  },
  data() {
    return {
      windowTop: 0,
    };
  },
  async mounted() {
    window.addEventListener("scroll", this.onScroll);
    
    var autoLogin = await requestGET("/api/autologin/");

    await this.$store.dispatch("AutoLogin", autoLogin);
  },
  computed: {
    GetSignMode() {
      return this.$store.getters.get_sign_mode;
    },
    GetIsAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
  },
  methods: {
    SetSignMode(mode) {
      this.$store.dispatch("SetSignModeAction", mode);
    },
    SetSign(mode) {
      this.$store.dispatch("SetSignAction", mode);
    },
    onScroll(e) {
      this.windowTop = e.target.documentElement.scrollTop;
    }
  },
  
};
</script>

<style scoped>
.imgLogo {
  height: 100%;
}
.aLogo {
  height: 80%;
}
.toolbar1 {
  background: rgba(0, 0, 0, 0) !important;
  box-shadow: 0px !important;
  position: fixed;
  width: 100%;
  z-index: 2;
}
.toolbar2 {
  background: linear-gradient(135deg, #0079bf, #5067c5) !important;
}
</style>