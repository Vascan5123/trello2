<template>
  <v-main class="mainn">
    <toolbar heightScroll="100" />

    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5">
          <v-card class="elevation-12">
            <v-toolbar class="toolbar_2" dark flat>
              <v-toolbar-title class="ma-auto">Создание новой доски</v-toolbar-title>
            </v-toolbar>

            <v-form>
              <v-card-text>
                <v-text-field
                  v-model="nameTable"
                  label="Название доски"
                  name="name"
                  type="text"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
                <v-alert v-show="titleEnabel != ''" type="error">{{titleEnabel}}</v-alert>
                
              </v-card-text>
              <v-row justify="center" class="ma-0 pa-0">
                <v-card-title class="ma-0 pa-0">Выбирите фон</v-card-title>
              </v-row>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="n in 8"
                      :key="n"
                      class="d-flex child-flex img_fon"
                      cols="4"
                      sm="3"
                      @click="setFon(n)"
                    >
                      <v-card flat tile class="d-flex">
                        <v-img
                          :src="images[n]"
                          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                          aspect-ratio="1.5"
                          class="grey lighten-2"
                        >
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                          </template>

                          <template v-if="selectImage == n" class="template_black">
                            <v-row
                              class="fill-height ma-0 template_black"
                              align="center"
                              justify="center"
                            >
                              <v-icon class="mdi-48px">mdi-check</v-icon>
                            </v-row>
                          </template>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>

            <v-card-actions>
              <v-btn color="success ma-auto" @click="CreateTableF(nameTable, selectImage)">Создать</v-btn>
            </v-card-actions>
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
      selectImage: null,
      nameTable: "",
      titleEnabel: "",
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
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 2 || "Min 2 characters",
      },
    };
  },
  methods: {
    setFon(numberFon) {
      this.selectImage = numberFon;
    },
    async CreateTableF(name, fonNumber) {
      if (name.length >= 2) {
        if (fonNumber == null) {
          fonNumber = 1;
        }
        var data = {
          name: name,
          fon: fonNumber,
          id: localStorage.getItem("id"),
        };
        var CreateTable = await requestPOST("/api/createtable/", data);
        if (CreateTable.succes == true) {
          location.href = "/home";
        } else {
          this.titleEnabel = CreateTable.msg;
        }
      }
    },
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
.toolbar_2 {
  background: url("https://img-fotki.yandex.ru/get/6614/127863950.115/0_a890a_1f69512f_orig.jpg");
  background-size: cover;
}
.template_black {
  background: rgba(255, 255, 255, 0.5);
  border: 4px solid green;
}
.img_fon {
  cursor: pointer;
}
.mainn {
  background: url("https://storge.pic2.me/cm/1920x1080/433/5875542e04577.jpg");
}
</style>