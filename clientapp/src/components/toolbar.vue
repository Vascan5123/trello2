<template>
  <div>
    <v-toolbar :class="{'toolbar2' : windowTop > 600}" class="toolbar1 d-block" flat>
      <a class="d-block aLogo ml-5" href="/">
        <img class="h-100 imgLogo" src="../assets/PrimaryPage/trello-logo-blue.png" />
      </a>

      <v-spacer></v-spacer>

      <v-btn
        color="green darken-1"
        dark
        class="mx-sm-5 mx-1 text-subtitle-1 font-weight-medium toolbar_button"
        @click="SetSign('true'), SetSignMode('login')"
      >
        Войти
        <v-icon class="ml-3">mdi-account-key</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      windowTop: 0
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  computed: {
    GetSignMode() {
      return this.$store.getters.get_sign_mode;
    }
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
  }
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
.toolbar2{
  background: linear-gradient(135deg, #0079bf, #5067c5) !important;
}
</style>