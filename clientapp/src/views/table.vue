<template>
  <v-main class="mainn" id="mainid">
    <toolbar heightScroll="0" color="2" />
    <v-container fluid class="pa-0 container_1 pt-md-16 pt-14 d-flex">
      <div class="div_top mt-2">
        <v-btn
          @click.stop="dialogNewTable = !dialogNewTable"
          dark
          text
          class="text-h4 title_1"
        >{{$route.params.id}}</v-btn>

        <v-btn @click.stop="drawer = !drawer" class="mx-2 float-right">
          <v-icon class="mr-1">mdi-dots-horizontal</v-icon>Меню
        </v-btn>
      </div>

      <div class="row_lists d-flex pt-16">
        <v-card
          color="transparent"
          flat
          class="col_lists mx-2"
          :style="{zoom : slider_zoom / 100}"
          v-for="numberList in lists"
          :key="numberList.title"
        >
          <v-card class="cards" :color="numberList.fon">
            <v-card-title class="py-2">
              {{numberList.title}}
              <v-spacer></v-spacer>
              <v-menu transition="slide-x-reverse-transition" :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-col class="shrink">
                      <v-btn text @click="expand = !expand">Выбрать фон из списка</v-btn>
                      <v-expand-transition>
                        <v-card flat v-show="expand" class="mx-auto my-2" width="200">
                          <v-btn
                            class="colors_fon_lists ma-1"
                            @click="SetFonList(numberList.id, 'primary')"
                            color="primary"
                          ></v-btn>
                          <v-btn
                            class="colors_fon_lists ma-1"
                            @click="SetFonList(numberList.id, 'grey lighten-4')"
                            color="grey lighten-4"
                          ></v-btn>
                          <v-btn
                            class="colors_fon_lists ma-1"
                            @click="SetFonList(numberList.id, 'grey darken-2')"
                            color="grey darken-2"
                          ></v-btn>
                          <v-btn
                            class="colors_fon_lists ma-1"
                            @click="SetFonList(numberList.id, 'white')"
                            color="white"
                          ></v-btn>
                          <v-btn
                            class="colors_fon_lists ma-1"
                            @click="SetFonList(numberList.id, 'green')"
                            color="green"
                          ></v-btn>
                          <v-btn
                            class="colors_fon_lists ma-1"
                            @click="SetFonList(numberList.id, 'teal')"
                            color="teal"
                          ></v-btn>
                        </v-card>
                      </v-expand-transition>
                    </v-col>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card class="card_rows pa-2 ma-2">
              <b>Номер один</b>
            </v-card>

            <v-btn class="add_card pa-5" text>
              <v-icon>mdi-plus</v-icon>Добавить ещё одну карточку
            </v-btn>
          </v-card>
        </v-card>

        <v-card color="transparent" flat class="col_lists mx-2" :style="{zoom : slider_zoom / 100}">
          <v-btn class="card_end pa-10 px-15" @click="dialogNewList = true">
            <v-row justify="center">
              <b>
                <v-icon>mdi-credit-card-plus</v-icon>Добавить список
              </b>
            </v-row>
          </v-btn>
        </v-card>
      </div>
    </v-container>

    <v-navigation-drawer v-model="drawer" app clipped right temporary>
      <v-row justify="center" class="text-h4 ma-2">Меню</v-row>
      <v-divider></v-divider>

      <v-card flat>
        <v-row justify="center">
          <v-col cols="5">
            <v-img class="img_avatar" contain :src="avatar[avatarN]"></v-img>
          </v-col>
          <v-col cols="5" align-self="center">
            <div class="text-h6">{{name}}</div>
          </v-col>
        </v-row>
      </v-card>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-format-align-left</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Описание</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-textarea
          v-model="description"
          auto-grow
          filled
          rows="4"
          @input="descriptionSave(description)"
        ></v-textarea>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-format-float-left</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Маштаб - {{slider_zoom}} %</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-slider @input="SaveZoom(slider_zoom)" v-model="slider_zoom" class="align-center my-2" max="200" min="10" hide-details></v-slider>
        </v-list-item>

        <v-btn text block class="py-7 ma-0" @click="expand = !expand">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Сменить фон</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-btn>

        <v-col cols="12">
          <v-expand-transition>
            <v-card v-show="expand" flat>
              <v-row>
                <v-col
                  v-for="n in 8"
                  :key="n"
                  class="d-flex child-flex img_fon"
                  cols="6"
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
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-expand-transition>
        </v-col>

        <v-btn text block class="py-7 my-5" color="red" @click="dialog = true">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-dropbox</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Удалить доску</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Удалить доску?</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Нет</v-btn>
          <v-btn color="red" text @click="dialog = false, DropTable()">Да</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNewList" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Новый список</v-card-title>

        <v-divider></v-divider>

        <v-text-field v-model="TitleNewList" label="Ввести заголовок списка" class="ma-5"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" width="30%" text @click="dialogNewList = false">Отмена</v-btn>
          <v-btn
            color="success"
            width="60%"
            text
            @click="dialogNewList = false, NewList(TitleNewList)"
          >Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNewTable" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Изменить имя доски</v-card-title>

        <v-divider></v-divider>

        <v-text-field v-model="NewTitleTable" label="Ввести новое имя доски" class="ma-5"></v-text-field>
        <v-alert v-show="TableEnabel != ''" type="error">{{TableEnabel}}</v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" width="30%" text @click="dialogNewTable = false">Отмена</v-btn>
          <v-btn
            color="success"
            width="60%"
            text
            @click="SetNewTitleTable(NewTitleTable)"
          >Переименовать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      drawer: null,
      expand: false,
      activeColor: "red",
      fontSize: 30,
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      avatarN: localStorage.getItem("avatar"),
      fon: null,
      description: null,
      lists: [],
      dialog: false,
      dialogNewList: false,
      TitleNewList: "",
      dialogNewTable: false,
      NewTitleTable: "",
      TableEnabel: "",
      slider_zoom: 100,
      avatar: [
        require("../assets/profile/avatar/1.png"),
        require("../assets/profile/avatar/2.png"),
        require("../assets/profile/avatar/3.png"),
        require("../assets/profile/avatar/4.png"),
      ],
      images: [
        "",
        "https://i.ibb.co/0MNssWM/1.jpg",
        "https://i.ibb.co/99pgL7h/2.jpg",
        "https://i.ibb.co/j5nvdxg/3.jpg",
        "https://i.ibb.co/yVHL5wG/4.jpg",
        "https://i.ibb.co/TcCTRPH/5.jpg",
        "https://i.ibb.co/RBVvgqC/6.jpg",
        "https://i.ibb.co/9hy4cjB/7.jpg",
        "https://i.ibb.co/VqrF7cV/8.jpg",
      ],
    };
  },
  methods: {
    async SaveZoom(zoomNumber){
      var DataNewZoom = {
        id: this.id,
        name: this.$route.params.id,
        zoom: zoomNumber
      };
      var NewZoomRequest = await requestPOST(
        "/api/newzoom/",
        DataNewZoom
      );
      if (NewZoomRequest == undefined) {
        location.reload();
      }
    },
    async SetFonList(idList, color) {
      var DataFonList = {
        id: this.id,
        name: this.$route.params.id,
        idList: idList,
        color: color,
      };
      var TitleTableRequest = await requestPOST(
        "/api/setfonlist/",
        DataFonList
      );
      if (TitleTableRequest == undefined) {
        location.reload();
      } else if (TitleTableRequest.succes == true) {
        this.lists[TitleTableRequest.number].fon = color;
      }
    },
    async SetNewTitleTable(title) {
      var DataTitleTable = {
        id: this.id,
        name: this.$route.params.id,
        title: title,
      };
      var TitleTableRequest = await requestPOST(
        "/api/NewTitleTable/",
        DataTitleTable
      );
      if (TitleTableRequest == undefined) {
        location.reload();
      } else if (TitleTableRequest.succes == true) {
        location.href = `/table/${title}`;
      } else if (TitleTableRequest.succes == false) {
        this.TableEnabel = TitleTableRequest.msg;
      }
    },
    async NewList(title) {
      var DataNewList = {
        id: this.id,
        name: this.$route.params.id,
        title: title,
      };
      var NewListRequest = await requestPOST("/api/NewList/", DataNewList);
      if (NewListRequest == undefined) {
        location.reload();
      } else if (NewListRequest.succes == true) {
        this.lists.push(NewListRequest.newTable);
      }
    },
    async setFon(numberFon) {
      (this.fon = numberFon),
        (document.getElementById(
          "mainid"
        ).style.backgroundImage = `url(${this.images[numberFon]})`);

      var dataSetNewFon = {
        id: this.id,
        name: this.$route.params.id,
        fon: numberFon,
      };
      var SetNewFon = await requestPOST("/api/SetNewFon/", dataSetNewFon);
      if (SetNewFon == undefined) {
        location.reload();
      }
    },
    async DropTable() {
      var dataDropTable = {
        id: this.id,
        name: this.$route.params.id,
      };
      var DropTableRequest = await requestPOST(
        "/api/droptable/",
        dataDropTable
      );
      if (DropTableRequest != undefined) {
        location.href = "/home";
      }
    },
    async descriptionSave(description) {
      var DataSetDescription = {
        id: this.id,
        name: this.$route.params.id,
        description: description,
      };
      var SetDescription = await requestPOST(
        "/api/setdescription/",
        DataSetDescription
      );
      if (SetDescription == undefined) {
        location.reload();
      }
    },
  },
  async beforeCreate() {
    var autoLogin = await requestGET("/api/autologin/");
    if (autoLogin == undefined) {
      location.href = "/";
    }
    var dataGetInfoTable = {
      id: this.id,
      name: this.$route.params.id,
    };
    var getInfoTable = await requestPOST(
      "/api/getInfoTable/",
      dataGetInfoTable
    );
    this.description = getInfoTable.table.description;
    this.fon = getInfoTable.table.fon;

    this.lists = getInfoTable.table.lists;
    this.slider_zoom = getInfoTable.table.zoom;

    document.getElementById("mainid").style.backgroundImage = `url(${
      this.images[this.fon]
    })`;
  },
};
</script>

<style scoped>
.card_rows {
  text-align: center;
  transition: 0.1s;
}
.card_rows:hover {
  cursor: pointer;
  opacity: 0.7;
}
.colors_fon_lists {
  width: 40%;
}
.add_card {
  width: 100%;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
}
.title_1 {
  text-transform: none;
}
.mainn {
  background-size: cover;
}
.img_avatar {
  background: rgba(0, 0, 0, 0.4);
  background-size: cover;
  border-radius: 50%;
}
.img_fon {
  cursor: pointer;
}
.cards {
  background: white;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
}
.card_end {
  background: rgba(255, 255, 255, 0.3) !important;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
}
.row_lists {
  overflow-x: scroll;
  min-width: 100%;
  height: 100%;
}
.container_1 {
  max-width: 100%;
  height: 100%;
  flex-wrap: wrap;
}
.div_top {
  height: auto;
  padding: 8px 4px 4px 8px;
  position: absolute;
  width: 100%;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 13px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #8f8f8f0c;
  border-radius: 20px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}
</style>