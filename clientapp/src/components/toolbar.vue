<template>
  <div>
    <v-toolbar class="toolbar1" flat>
      
      <a class="d-block aLogo ml-5" href="/"><img class="h-100 imgLogo" src="../assets/PrimaryPage/trello-logo-blue.png"/></a>  

      <v-spacer></v-spacer>

      <v-btn color="green darken-1" class="mx-sm-5 mx-1 text-subtitle-1 font-weight-medium" @click="SetSign('true'), SetSignMode('login')">
        Войти
        <v-icon class="ml-3">mdi-account-key</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  computed:{
    GetSignMode(){
      return this.$store.getters.get_sign_mode;
    }
  },
  methods:{
    SetSignMode(mode){
      this.$store.dispatch("SetSignModeAction", mode);
    },
    SetSign(mode){
      this.$store.dispatch("SetSignAction", mode);
    }
  }
}
</script>

<style scoped>
.imgLogo{
  height: 100%;
}
.aLogo{
  height: 80%;
}
.toolbar1{
  background: rgba(0, 0, 0, 0) !important;
  box-shadow: 0px !important;
}
</style>