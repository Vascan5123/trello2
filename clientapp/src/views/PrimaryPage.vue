<template>
  <div>
    <v-main>
      <toolbar heightScroll="600" color="1" />
      <v-card class="div1_top pt-12" dark>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" xl="4" lg="6" md="6" sm="10">
              <v-card-title
                class="text-md-h3 text-sm-h4 text-h5 pb-0 TitleTop text-center text-sm-left"
              >
                <p>
                  <b>Trello</b> способствует более тесному сотрудничеству и увеличению эффективности работы.
                </p>
              </v-card-title>
              <v-card-title
                class="text-sm-h5 text-subtitle-1 pt-0 TitleTop2 text-center text-sm-left mr-xl-5"
              >
                Благодаря доскам, спискам и карточкам Trello пользователи могут
                упорядочивать проекты и расставлять приоритеты — работать станет гораздо удобнее и приятнее!
              </v-card-title>
            </v-col>
            <v-col cols="9" sm="8" md="6" xl="4" align-self="center">
              <v-img src="../../src/assets/PrimaryPage/top.svg" />
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center">
          <v-btn
            v-show="!GetIsAuthenticated"
            color="green darken-1"
            large
            class="mb-7"
            @click="SetSign(true), SetSignMode('reg')"
          >Зарегистрируйтесь бесплатно</v-btn>
          <v-btn
            v-show="GetIsAuthenticated"
            color="green darken-1"
            large
            class="mb-7"
            href="/home"
          >Перейти к вашим доскам</v-btn>
        </v-row>
      </v-card>
      <!--Register-->
      <div class="text-center">
        <v-bottom-sheet :value="Get_sign" persistent>
          <v-sheet class="text-center">
            <v-btn class="mt-6" icon color="red" @click="SetSign(false)" title="Закрыть / Close">
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <!--SignUp-->
            <v-container v-show="GetSignMode == 'reg'">
              <form action="/api/newuser" method="POST">
                <div class="py-3 font-weight-medium">Регистрация аккаунта</div>
                <v-row justify="center">
                  <v-col cols="11" sm="6">
                    <v-text-field
                      label="Введите адрес электронной почты"
                      outlined
                      v-model="SignUpData.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="11" sm="6">
                    <v-text-field
                      name="name"
                      label="Введите полное имя"
                      outlined
                      v-model="SignUpData.name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="11" sm="6">
                    <v-text-field
                      label="Введите пароль"
                      outlined
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      value
                      v-model="SignUpData.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center" class="text-subtitle-2">
                  <v-col cols="11" sm="6">
                    Регистрируясь, я соглашаюсь с
                    <a
                      href="https://www.atlassian.com/legal/cloud-terms-of-service"
                      target="blank"
                    >Условиями использования продуктов Cloud</a>
                    и принимаю
                    <a
                      href="https://www.atlassian.com/legal/privacy-policy"
                      target="blank"
                    >Политику конфиденциальности Atlassian.</a>
                  </v-col>
                </v-row>
                <v-btn
                  class="mt-4 mb-4"
                  dark
                  color="green darken-1"
                  @click="registerBotton = !registerBotton, SignUpF()"
                >Регистрация</v-btn>
                <v-row justify="center">
                  <v-btn
                    color="primary"
                    class="mb-4"
                    text
                    @click="SetSignMode('login')"
                  >Уже есть аккаунт? Войти</v-btn>
                </v-row>
              </form>
            </v-container>
            <!--SignIN-->
            <v-container v-show="GetSignMode == 'login'">
              <div class="py-3 font-weight-medium">Вход</div>
              <v-row justify="center">
                <v-col cols="11" sm="6">
                  <v-text-field
                    label="Введите адрес электронной почты"
                    outlined
                    v-model="SignInData.email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="11" sm="6">
                  <v-text-field
                    label="Введите пароль"
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    value
                    v-model="SignInData.password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" class="text-subtitle-2">
                <v-col cols="11" sm="6">
                  <a
                    href="https://www.atlassian.com/legal/privacy-policy"
                    target="blank"
                  >Политика конфиденциальности</a> -
                  <a
                    href="https://www.atlassian.com/legal/cloud-terms-of-service"
                    target="blank"
                  >Условия использования</a>
                </v-col>
              </v-row>
              <v-btn
                class="mt-4 mb-4"
                dark
                color="green darken-1"
                @click="registerBotton = !registerBotton, SignInF()"
              >Вход</v-btn>
              <v-row justify="center">
                <v-btn
                  color="secondary"
                  class="mb-4"
                  @click="RestorePassword = true"
                  text
                >Не удается войти?</v-btn>
                <v-btn
                  color="primary"
                  class="mb-4 ml-2"
                  text
                  @click="SetSignMode('reg')"
                >Зарегистрировать аккаунт</v-btn>
              </v-row>
            </v-container>
          </v-sheet>
        </v-bottom-sheet>
      </div>
      <!--Dialog Restore Password-->
      <v-dialog v-model="RestorePassword" width="50%">
        <v-card>
          <v-row justify="center">
            <v-card-actions>
              <v-btn
                class="mt-6"
                icon
                color="red"
                @click="RestorePassword = false"
                title="Закрыть / Close"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-card-title class="headline" primary-title>Восстановить пароль</v-card-title>
          </v-row>
          <v-row justify="center">
            <v-col cols="12">
              <v-text-field label="Введите адрес электронной почты" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn class="mb-8" dark color="red" @click="RestorePassword = false">Отправить</v-btn>
          </v-row>
        </v-card>
      </v-dialog>

      <PrimaryPageBlocks />
      <PrimaryPageBlocksPart2 />
    </v-main>
  </div>
</template>

<script>
import toolbar from "../components/toolbar.vue";
import requestPOST from "../scripts/requestPOST.js";
import PrimaryPageBlocks from "../components/PrimaryPageBlocks.vue";
import PrimaryPageBlocksPart2 from "../components/PrimaryPageBlocksPart2.vue";

export default {
  components: {
    toolbar,
    PrimaryPageBlocks,
    PrimaryPageBlocksPart2,
  },
  data() {
    return {
      registerBotton: false,
      SignUp: false,
      show1: false,
      RestorePassword: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
      SignUpData: {
        email: "",
        name: "",
        password: "",
      },
      SignInData: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    GetSignMode() {
      return this.$store.getters.get_sign_mode;
    },
    Get_sign() {
      return this.$store.getters.get_sign;
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
    async SignUpF() {
      var data = {
        email: this.SignUpData.email,
        name: this.SignUpData.name,
        password: this.SignUpData.password,
      };
      var tokenSignUp = await requestPOST("/api/newuser/", data);
      if (tokenSignUp.succes == false) {
        console.log(tokenSignUp.msg);
      } else {
        localStorage.setItem("token", tokenSignUp.token);
        localStorage.setItem("id", tokenSignUp.user.id);
        localStorage.setItem("email", tokenSignUp.user.email);
        localStorage.setItem("name", tokenSignUp.user.name);
        localStorage.setItem("avatar", tokenSignUp.user.avatar);
        this.SetSign(false);
        location.reload();
      }
    },
    async SignInF() {
      var data = {
        email: this.SignInData.email,
        password: this.SignInData.password,
      };
      var tokenSignIn = await requestPOST("/api/signin/", data);
      localStorage.setItem("token", tokenSignIn.token);
      localStorage.setItem("id", tokenSignIn.user.id);
      localStorage.setItem("email", tokenSignIn.user.email);
      localStorage.setItem("name", tokenSignIn.user.name);
      localStorage.setItem("avatar", tokenSignIn.user.avatar);
      this.SetSign(false);
      location.reload();
    },
  },
};
</script>

<style scoped>
.div1_top {
  background: linear-gradient(135deg, #0079bf, #5067c5);
  margin: 0%;
  padding: 0%;
  width: 100%;
}
.TitleTop {
  word-break: break-word;
  line-height: 120%;
}
.TitleTop2 {
  word-break: break-word;
  line-height: 160%;
}
.registerTextField {
  color: #f6f6f6;
}
a {
  text-decoration: none;
}
.row {
  margin: 0px;
}
</style>