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
          v-for="(numberList, index) in lists"
          :key="index"
        >
          <v-card class="cards" :color="numberList.fon">
            <v-card-title class="py-2">
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" class="text-h6 px-0" v-on="on" text>{{numberList.title}}</v-btn>
                </template>
                <v-card flat>
                  <v-text-field
                    dense
                    class="mx-2 pa-0"
                    autofocus
                    v-model="numberList.title"
                    @input="NewListName(numberList.id, numberList.title)"
                  ></v-text-field>
                </v-card>
              </v-menu>
              <v-spacer></v-spacer>
              <v-menu transition="slide-x-reverse-transition" :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn text @click="expand = !expand">Выбрать фон из списка</v-btn>
                  </v-list-item>
                  <v-list-item v-show="expand">
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
                  </v-list-item>
                  <v-list-item>
                    <v-btn text @click="DeleteList(numberList.id)">Удалить список</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card
              :color="cards.fon"
              @click="EditCard(index, index2), dialogEditCard = true"
              class="card_rows pa-2 ma-2"
              v-for="(cards, index2) in lists[index].cards"
              :key="index2"
            >
              <b>{{cards.title}}</b>
            </v-card>

            <v-menu transition="slide-y-reverse-transition" :close-on-content-click="true">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="add_card pa-5"
                  text
                  v-bind="attrs"
                  v-on="on"
                  @click="text_newCard = ''"
                >
                  <v-icon>mdi-plus</v-icon>Добавить ещё одну карточку
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-text-field label="Введите название карточки" autofocus v-model="text_newCard"></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    color="success"
                    block
                    @click="NewCard(text_newCard, numberList.id, index)"
                  >Создать</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-card>

        <v-card color="transparent" flat class="col_lists mx-2" :style="{zoom : slider_zoom / 100}">
          <v-btn class="card_end pa-10 px-15" @click="dialogNewList = true, TitleNewList = ''">
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
          <v-slider
            @input="SaveZoom(slider_zoom)"
            v-model="slider_zoom"
            class="align-center my-2"
            max="200"
            min="10"
            hide-details
          ></v-slider>
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

        <v-text-field
          v-model="NewTitleTable"
          :rules="[
              () => !!NewTitleTable || 'This field is required',
              () => !!NewTitleTable && NewTitleTable.length > 1 || 'minimum 2 letters'  
            ]"
          label="Ввести новое имя доски"
          class="ma-5"
        ></v-text-field>
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
    <v-dialog v-model="dialogEditCard" width="800">
      <v-card>
        <v-col cols="10" class="mx-auto">
          <v-card-actions>
            <v-btn
              class="mx-auto button_close"
              fab
              dark
              color="red"
              @click="dialogEditCard = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-credit-card</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Название</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-text-field
                placeholder="Название карточки"
                filled
                v-model="InfoEditCard.title"
                @input="SetNewTitleCard(InfoEditCard)"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-format-align-left</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Описание</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-textarea
                v-model="InfoEditCard.description"
                auto-grow
                filled
                rows="4"
                @input="SetNewDescriptionCard(InfoEditCard)"
              ></v-textarea>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-image</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Фон</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-btn
                class="colors_fon_card mx-auto ma-1"
                @click="SetFonCard(InfoEditCard.list, InfoEditCard.card, 'primary')"
                color="primary"
              ></v-btn>
              <v-btn
                class="colors_fon_card mx-auto ma-1"
                @click="SetFonCard(InfoEditCard.list, InfoEditCard.card, 'grey lighten-4')"
                color="grey lighten-4"
              ></v-btn>
              <v-btn
                class="colors_fon_card mx-auto ma-1"
                @click="SetFonCard(InfoEditCard.list, InfoEditCard.card, 'green')"
                color="green"
              ></v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                class="colors_fon_card mx-auto ma-1"
                @click="SetFonCard(InfoEditCard.list, InfoEditCard.card, 'teal')"
                color="teal"
              ></v-btn>
              <v-btn
                class="colors_fon_card mx-auto ma-1"
                @click="SetFonCard(InfoEditCard.list, InfoEditCard.card, 'indigo')"
                color="indigo"
              ></v-btn>
              <v-btn
                class="colors_fon_card mx-auto ma-1"
                @click="SetFonCard(InfoEditCard.list, InfoEditCard.card, 'cyan')"
                color="cyan"
              ></v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                class="mx-auto my-3"
                outlined
                color="red"
                @click="DeliteCard(InfoEditCard.list, InfoEditCard.card)"
              >Удалить</v-btn>
            </v-list-item>
          </v-list>
        </v-col>
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
      text_newCard: "",
      InfoEditCard: {},
      dialogEditCard: false,
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
    async NewListName(listid, title) {
      var DataNewListName = {
        id: this.id,
        name: this.$route.params.id,
        listid: listid,
        title: title
      };
      var NewListNameRequest = await requestPOST("/api/newlistname/", DataNewListName);
      if (NewListNameRequest == undefined) {
        location.reload();
      }
    },
    async DeleteList(listid) {
      var DataDelList = {
        id: this.id,
        name: this.$route.params.id,
        listid: listid,
      };
      var DelListRequest = await requestPOST("/api/delitelist/", DataDelList);
      if (DelListRequest == undefined) {
        location.reload();
      } else if (DelListRequest.succes == true) {
        this.lists = DelListRequest.lists1;
      }
    },
    async SetNewDescriptionCard(NewTitle) {
      var DataNewTitleCard = {
        id: this.id,
        name: this.$route.params.id,
        list: NewTitle.list,
        card: NewTitle.card,
        description: NewTitle.description,
      };
      var NewTitleCardRequest = await requestPOST(
        "/api/newdescriptioncard/",
        DataNewTitleCard
      );
      if (NewTitleCardRequest == undefined) {
        location.reload();
      } else if (NewTitleCardRequest.succes == true) {
        this.lists[NewTitle.list].cards[NewTitle.card].description =
          NewTitle.description;
      }
    },
    async SetNewTitleCard(NewTitle) {
      var DataNewTitleCard = {
        id: this.id,
        name: this.$route.params.id,
        list: NewTitle.list,
        card: NewTitle.card,
        title: NewTitle.title,
      };
      var NewTitleCardRequest = await requestPOST(
        "/api/newtitlecard/",
        DataNewTitleCard
      );
      if (NewTitleCardRequest == undefined) {
        location.reload();
      } else if (NewTitleCardRequest.succes == true) {
        this.lists[NewTitle.list].cards[NewTitle.card].title = NewTitle.title;
      }
    },
    async DeliteCard(list, card) {
      var DataDelCard = {
        id: this.id,
        name: this.$route.params.id,
        list: list,
        card: card,
      };
      var DelCardRequest = await requestPOST("/api/delitecard/", DataDelCard);
      if (DelCardRequest == undefined) {
        location.reload();
      } else if (DelCardRequest.succes == true) {
        this.lists[list].cards = DelCardRequest.card;
        this.dialogEditCard = false;
      }
    },
    async SetFonCard(list, card, fon) {
      var DataFonCard = {
        id: this.id,
        name: this.$route.params.id,
        list: list,
        card: card,
        fon: fon,
      };
      var FonCardRequest = await requestPOST("/api/setfoncard/", DataFonCard);
      if (FonCardRequest == undefined) {
        location.reload();
      } else if (FonCardRequest.succes == true) {
        this.lists[list].cards[card].fon = fon;
      }
    },
    async EditCard(list, card) {
      var DataEditCard = {
        id: this.id,
        name: this.$route.params.id,
        list: list,
        card: card,
      };
      var EditCardRequest = await requestPOST("/api/editcard/", DataEditCard);
      if (EditCardRequest == undefined) {
        location.reload();
      } else if (EditCardRequest.succes == true) {
        this.InfoEditCard = EditCardRequest.infoCard;
        (this.InfoEditCard.list = list), (this.InfoEditCard.card = card);
      }
    },
    async NewCard(text, idList, index) {
      if (text != "") {
        var DataNewCard = {
          id: this.id,
          name: this.$route.params.id,
          idList: idList,
          titleCard: text,
        };
        var NewCardRequest = await requestPOST("/api/newcard/", DataNewCard);
        if (NewCardRequest == undefined) {
          location.reload();
        } else if (NewCardRequest.succes == true) {
          this.lists[index].cards.push(NewCardRequest.newCard);
        }
      }
    },
    async SaveZoom(zoomNumber) {
      var DataNewZoom = {
        id: this.id,
        name: this.$route.params.id,
        zoom: zoomNumber,
      };
      var NewZoomRequest = await requestPOST("/api/newzoom/", DataNewZoom);
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
      if (title.length > 1) {
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
.colors_fon_card {
  width: 30%;
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