<template>
  <div>
    <v-container mt-12>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="6" xl="5" class="text-block">
          <v-card flat>
            <v-card-title
              class="text-h4 text-center text-sm-left title-1"
            >Встроенная автоматизация рабочих процессов с помощью улучшения Butler</v-card-title>
            <v-card-subtitle class="text-subt text-h6 text-center text-sm-left">
              Делегируйте задания роботам! Если вы хотите повысить продуктивность своей команды, автоматизируйте рабочие процессы с помощью улучшения Butler, а монотонную работу смогут выполнить наши мощные инструменты:
              <ul>
                <li>Триггеры на основе правил</li>
                <li>Настраиваемые кнопки создания карточек и досок</li>
                <li>Команды для календаря</li>
                <li>Команды по дате выполнения</li>
              </ul>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5" md="5" xl="3" align-self="center">
          <img
            v-PhoneScroll
            width="100%"
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/06f0833d33e1d71bbf0858029839b406/butler.png"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container mt-12>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card flat>
            <v-card-title class="text-h4 text-center title-1 d-block">Как это работает?</v-card-title>
            <v-card-subtitle
              class="text-subt text-h6 text-center"
            >Trello помогает воплощать идеи в жизнь за считаные секунды — благодаря простым доскам, спискам и карточкам.</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="11" md="8" class="ma-0 pa-0">
          <v-carousel
            cycle
            hide-arrows-background
            show-arrows
            hide-delimiters
          >
            <v-carousel-item>
              <v-img
                class="carusele_image"
                src="./../assets/PrimaryPage/1.png"
                contain
              ></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img
                class="carusele_image"
                src="./../assets/PrimaryPage/2.png"
                contain
              ></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img
                class="carusele_image"
                src="./../assets/PrimaryPage/3.png"
                contain
              ></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img
                class="carusele_image"
                src="./../assets/PrimaryPage/4.png"
                contain
              ></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img
                class="carusele_image"
                src="./../assets/PrimaryPage/5.png"
                contain
              ></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>

      <v-row justify="center" class="footer">
        <v-col cols="12" sm="11" md="8">
        <v-img src="./../assets/PrimaryPage/fonPrimaryPage.png" contain position="bottom">
        <v-row justify="center" class="mb-15 pb-15">
          <v-col cols="11" sm="11" md="10" lg="6">
            <v-card-title class="text-md-h4 text-h5 text-center title-1 d-block">Начните строить планы прямо сейчас</v-card-title>
            <v-card-subtitle
              class="text-subt text-md-h6 text-subtitle-1 text-center"
            >Регистрируйтесь и присоединяйтесь к миллионам пользователей по всему миру, которые уже используют Trello в своей работе.</v-card-subtitle>
            <v-card-actions class="justify-center mx-2">
              <v-btn color="green" dark large>Начните — это бесплатно!</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        </v-img>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style >
.text-block {
  align-self: center;
}
.title-1 {
  word-break: break-word;
}
.text-subt {
  font-family: "Charlie Text", sans-serif !important;
  word-break: break-word;
}
.card-1-top {
  background: linear-gradient(#3eb9de, #3a80de);
  word-break: break-word;
  border-radius: 15px !important;
  user-select: none;
}
.card-title-1 {
  background: rgba(11, 86, 139, 0.25);
  border-radius: 6px;
  color: white;
  padding: 9px 15px;
  word-break: break-word;
}
.carusele_image {
  height: 100%;
}
.footer{
  background: linear-gradient(to bottom, #fff 0%, #f7ecff 46%, #d2ecff 100%, #fff 100%);
  margin: 0%;
}
</style>