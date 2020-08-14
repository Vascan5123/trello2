<template>
  <div>
    <toolbar heightScroll="0" />
    <v-container mt-15>
      <v-row justify="center">
        <v-col cols="11" sm="6" lg="5" xl="4">
          <v-card class="card_left" dark>
            <v-card-title>Мои данные</v-card-title>
            <v-row justify="center">
              <v-col cols="5">
                <v-img class="img_avatar" contain :src="avatar[avatarNumber]">
                  <div class="change_avatar" @click="ChangeAvatar = true">
                    <v-icon class="icon_plus_avatar" large>mdi-plus-circle</v-icon>
                  </div>
                </v-img>
              </v-col>
            </v-row>
            <v-card-title>
              <v-text-field v-model="name" label="Имя" outlined rounded></v-text-field>
            </v-card-title>
            <v-card-title>
              <v-text-field v-model="email" label="Email" outlined rounded></v-text-field>
            </v-card-title>
            <v-card-actions>
              <v-row justify="center" class="mb-4">
                <v-btn large color="primary" @click="changeNewName(name), changeNewEmail(email)" rounded>Сохранить</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <!--  -->
        <v-dialog v-model="ChangeAvatar" width="70%">
          <v-card>
            <v-row justify="center">
              <v-card-actions>
                <v-btn
                  class="mt-6"
                  icon
                  color="red"
                  @click="ChangeAvatar = false"
                  title="Закрыть / Close"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-actions>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center">
              <v-card-title class="headline" primary-title>Выбор главного изображения</v-card-title>
            </v-row>
            <v-row justify="center">
              <v-col cols="5" sm="2" ma-2>
                <v-img
                  @click="changeNewAvatar(0), ChangeAvatar = false"
                  class="avatars"
                  contain
                  :src="avatar[0]"
                ></v-img>
              </v-col>
              <v-col cols="5" sm="2" ma-2>
                <v-img
                  @click="changeNewAvatar(1), ChangeAvatar = false"
                  class="avatars"
                  contain
                  :src="avatar[1]"
                ></v-img>
              </v-col>
              <v-col cols="5" sm="2" ma-2>
                <v-img
                  @click="changeNewAvatar(2), ChangeAvatar = false"
                  class="avatars"
                  contain
                  :src="avatar[2]"
                ></v-img>
              </v-col>
              <v-col cols="5" sm="2" ma-2>
                <v-img
                  @click="changeNewAvatar(3), ChangeAvatar = false"
                  class="avatars"
                  contain
                  :src="avatar[3]"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <!--  -->
        <v-col cols="11" sm="6">
          <v-card>
            <v-card-title>Мои доски</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
      ChangeAvatar: false,
      name: null,
      email: null,
      avatarNumber: null,
      avatar: [
        require("../assets/profile/avatar/1.png"),
        require("../assets/profile/avatar/2.png"),
        require("../assets/profile/avatar/3.png"),
        require("../assets/profile/avatar/4.png"),
      ],
    };
  },
  mounted(){
    this.name = this.$store.getters.isUserName
    this.email = this.$store.getters.isUserEmail
    this.avatarNumber = this.$store.getters.isUserAvatar
  },
  computed: {

  },
  methods: {
    async changeNewAvatar(newAvatar) {
      var Obj = {
        id: localStorage.getItem("id"),
        newAvatar: newAvatar,
      };
      var newAvatarRequest = await requestPOST("/api/newAvatar/", Obj);
      if (newAvatarRequest == undefined) {
        console.log("ошибка смены аватара");
      } else if (newAvatarRequest.succes == true) {
        localStorage.setItem("avatar", newAvatar);
        this.avatarNumber = newAvatar;
        await this.$store.dispatch("SetAvatar", newAvatar);
      }
    },
    async changeNewName(newName) {
      var ObjName = {
        id: localStorage.getItem("id"),
        newName: newName,
      };
      var newNameRequest = await requestPOST("/api/newName/", ObjName);
      if (newNameRequest == undefined) {
        console.log("ошибка смены имени");
      } else if (newNameRequest.succes == true) {
        localStorage.setItem("name", newName);
        await this.$store.dispatch("SetName", newName);
      }
    },
    async changeNewEmail(newEmail) {
      var ObjEmail = {
        id: localStorage.getItem("id"),
        newEmail: newEmail,
      };
      var newEmailRequest = await requestPOST("/api/newEmail/", ObjEmail);
      if (newEmailRequest == undefined) {
        console.log("ошибка смены емайла");
      } else if (newEmailRequest.succes == true) {
        localStorage.setItem("email", newEmail);
        await this.$store.dispatch("SetEmail", newEmail);
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
.row {
  margin: 0px;
}
.img_avatar {
  height: auto;
  background: url("https://luxfon.com/images/201203/luxfon.com_6284.jpg");
  border-radius: 50%;
}
.card_left {
  background: url("https://i.pinimg.com/736x/dd/07/8e/dd078eb8119b6a21ac51a5d5e1fbeee7.jpg");
  background-size: cover;
}
.change_avatar {
  position: absolute;
  background: #111;
  z-index: 2;
  width: 100%;
  height: 50%;
  bottom: 0%;
  opacity: 0;
  transition: 0.3s;
}
.change_avatar:hover {
  opacity: 0.6;
  cursor: pointer;
}
.icon_plus_avatar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatars:hover {
  cursor: pointer;
  background: #444;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>