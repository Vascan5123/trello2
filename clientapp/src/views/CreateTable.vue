<template>
  <v-main class="mainn">
    <toolbar heightScroll="0" />

    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5">
          <v-card class="elevation-12">
            <v-toolbar class="toolbar_2" dark flat>
              <v-toolbar-title class="ma-auto">Создание новой доски</v-toolbar-title>
            </v-toolbar>

            <v-form>
              <v-card-text>
                <v-text-field label="Название доски" name="name" type="text"></v-text-field>
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
                      class="d-flex child-flex"
                      cols="4"
                      sm="3"
                      @click="setFon(n)"
                    >
                      <v-card flat tile class="d-flex">
                        <v-img
                          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
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
                            <v-row class="fill-height ma-0 template_black" align="center" justify="center">
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
              <v-btn color="success ma-auto">Создать</v-btn>
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
/*import requestPOST from "../scripts/requestPOST.js"; */

export default {
  components: {
    toolbar,
  },
  data() {
    return {
      selectImage: null,
      images: [
        /* require("") */
      ],
    };
  },
  methods: {
    setFon(numberFon) {
      this.selectImage = numberFon;
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
.btn_images {
  width: 30%;
  height: auto;
  margin: 2%;
}
.template_black{
    background: rgba(255, 255, 255, 0.5);
    border: 4px solid green;
}
.mainn{
    background: url("https://storge.pic2.me/cm/1920x1080/433/5875542e04577.jpg");
}
</style>