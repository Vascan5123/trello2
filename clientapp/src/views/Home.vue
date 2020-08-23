<template>
  <v-main class="mainn">
    <toolbar heightScroll="100"   color="2" />

    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="11" md="8">
          <v-card class="elevation-12 row_tables" :max-height="heightF/1.3">
            <v-toolbar class="toolbar_2" dark flat>
              <v-toolbar-title class="ma-auto">Мои доски</v-toolbar-title>
            </v-toolbar>
            <v-row class="py-5 mx-auto" justify="center">
                <v-col cols="10" sm="5" md="4" lg="3" v-for="n in  alltables" :key="n.name">
                  <v-img :src="images[n.fon]" aspect-ratio="1.8" class="all_tables elevation-4" @click="SetTable(n.name)">
                    <v-card-title class="text-table text-h4" v-text="n.name"></v-card-title>
                    <div class="back_black"></div>
                  </v-img>
                </v-col>

                <v-card-title v-if="length < 1" class="grey--text">У вас нет созданных досок</v-card-title>


            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
import toolbar from "../components/toolbar.vue";
import requestGET from "../scripts/requestGET.js";
import requestPOST from "../scripts/requestPOST.js";

export default {
  components: {
    toolbar,
  },
  data() {
    return {
      alltables: null,
      length: null,
      images: [
        "",
        require("../assets/fons/1.jpg"),
        require("../assets/fons/2.jpg"),
        require("../assets/fons/3.jpg"),
        require("../assets/fons/4.jpg"),
        require("../assets/fons/5.jpg"),
        require("../assets/fons/6.jpg"),
        require("../assets/fons/7.jpg"),
        require("../assets/fons/8.jpg"),
      ],
    };
  },
  methods:{
    SetTable(n){
      location.href = `/table/${n}`;
    }
  },
  computed: {
    heightF() {
      return window.innerHeight;
    },
  },
  async mounted() {
    var data = {
      id: localStorage.getItem("id"),
    };
    var ResponseAllTables = await requestPOST("/api/alltables", data);
    if (ResponseAllTables != undefined) {
      this.alltables = ResponseAllTables.tables;
      this.length = ResponseAllTables.length
    }
  },
  async beforeCreate() {
    var autoLogin = await requestGET("/api/autologin/");
    if (autoLogin == undefined) {
      location.href = "/";
    }
  },
};
</script>

<style scoped>
.mainn {
  background: url("https://storge.pic2.me/cm/1920x1080/433/5875542e04577.jpg");
  background-size: cover;
}
.toolbar_2 {
  background: url("https://img-fotki.yandex.ru/get/6614/127863950.115/0_a890a_1f69512f_orig.jpg");
  background-size: cover;
}
.all_tables {
  border-radius: 20px;
  position: relative;
  z-index: 3;
}
.all_tables:hover .back_black {
  opacity: 0.3;
}
.all_tables:hover {
  cursor: pointer;
}
.text-table {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 2px 2px 5px black, 0 0 2em black;
  width: 80%;
  z-index: 1;
  justify-content: center;
  user-select: none;
}
.back_black {
  background: black;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  transition: 0.3s;
  opacity: 0;
}
.row_tables {
  overflow-y: auto;
}
</style>