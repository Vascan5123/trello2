<template>
  <div>
    <v-container mt-12>
      <v-row justify="center">
        <v-col cols="12" sm="4" lg="4" xl="3" class="text-block">
          <v-card flat>
            <v-card-title
              class="text-h4 text-center text-sm-left title-1"
            >Работайте с любой командой</v-card-title>
            <v-card-subtitle
              class="text-subt text-h6 text-center text-sm-left"
            >Trello помогает организовывать команды на работе, во время параллельного проекта или семейных выходных.</v-card-subtitle>
            <v-card-actions class="justify-center justify-sm-start mx-2">
              <v-btn color="primary">Начать работу</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="7" lg="7" xl="5">
          <v-card v-PhoneScroll class="card-1-top pb-4">
            <v-card-title>
              <div class="card-title-1">Командные задачи</div>
            </v-card-title>
            <div class="d-flex">
              <!--LeftBlock-->
              <v-col cols="5" md="4" class="block-1-left ml-4">
                <v-card-subtitle class="text-subtitle-1 pa-0">В процессе</v-card-subtitle>
                <!--One-->
                <div class="block-white pb-4 my-2">
                  <div class="color-block red mt-1"></div>
                  <v-card-text class="px-0 py-2">Встреча с клиентом</v-card-text>
                  <v-icon>mdi-format-align-left</v-icon>
                  <div class="img-autor">
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/87c23234a3807e474d70ea3ab47bd8dc/user-1.png"
                    />
                  </div>
                </div>
                <!--Two-->
                <div class="block-white pb-4 my-2">
                  <div class="color-block green mt-1"></div>
                  <v-card-text class="px-0 py-2">Запланируйте вебинар</v-card-text>
                  <v-icon>mdi-format-align-left</v-icon>
                  <div class="img-autor">
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/87c23234a3807e474d70ea3ab47bd8dc/user-1.png"
                    />
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/8022b0b4f4360ba3f737c48cd908e448/user-2.png"
                    />
                  </div>
                </div>
                <!--Three-->
                <div class="block-white pb-4 my-2">
                  <div class="color-block blue mt-1"></div>
                  <v-card-text class="px-0 py-2">Рассылка по электронной почте</v-card-text>
                  <v-icon>mdi-format-align-left</v-icon>
                  <div class="img-autor">
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/8022b0b4f4360ba3f737c48cd908e448/user-2.png"
                    />
                  </div>
                </div>
                <v-card-text class="pa-1 text-add-card">Добавить карточку…</v-card-text>
              </v-col>

              <!--RightBlock-->
              <v-col cols="5" md="4" class="block-1-left mx-3 h-100">
                <v-card-subtitle class="text-subtitle-1 pa-0">В процессе</v-card-subtitle>
                <!--One-->
                <div class="block-white pb-4 my-2">
                  <div class="color-block red mt-1"></div>
                  <v-card-text class="px-0 py-2">Опубликуйте подкаст</v-card-text>
                  <v-icon>mdi-format-align-left</v-icon>
                  <div class="img-autor">
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/87c23234a3807e474d70ea3ab47bd8dc/user-1.png"
                    />
                  </div>
                </div>
                <!--Two-->
                <div class="block-white pb-4 my-2">
                  <div class="color-block green mt-1"></div>
                  <v-card-text class="px-0 py-2">Запустите сайт</v-card-text>
                  <v-icon>mdi-format-align-left</v-icon>
                  <div class="img-autor">
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/87c23234a3807e474d70ea3ab47bd8dc/user-1.png"
                    />
                    <img
                      width="28px"
                      class="mx-1"
                      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/pattern-library/images/8022b0b4f4360ba3f737c48cd908e448/user-2.png"
                    />
                  </div>
                </div>
                <v-card-text class="pa-1 text-add-card">Добавить карточку…</v-card-text>
              </v-col>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container mt-12>
      <v-row justify="center">
        <v-col cols="9" sm="4" lg="3" xl="2">
          <v-card v-PhoneScroll class="card-2-top pb-4" elevation="10">
            <div class="phone_panel_top"></div>
            <div class="phone_button_right"></div>
            <div class="phone_button_left"></div>
            <div class="screen-card-2-top">
              <div class="phone_panel_left"></div>
              <div class="phone_panel_right"></div>

              <v-card-subtitle class="screen_panel_top pa-2 white--text text-body-1">
                <v-btn icon><v-icon class="white--text text-body-1 mx-2">mdi-arrow-bottom-left mdi-rotate-45</v-icon></v-btn>Отдых летом
                <v-btn icon class="float-right"><v-icon class="mx-1 white--text">mdi-dots-horizontal</v-icon></v-btn>
              </v-card-subtitle>
              <div class="screen_all_blocks">
                <div class="d-flex">
                  <!--LeftBlock-->
                  <v-col cols="8" md="8" class="block-1-left ma-3">
                    <v-card-subtitle class="text-subtitle-1 pa-0">Нужно сделать</v-card-subtitle>
                    <!--One-->
                    <div class="block-white my-2">
                      <v-card-text class="px-0 py-1">Плавание</v-card-text>
                    </div>
                    <!--Two-->
                    <div class="block-white my-2 pa-0">
                      <img
                        width="100%"
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/d5a49602b492398e848bdd7d14a60a23/card-surfing-lessons.jpg"
                      />
                      <v-card-text class="px-2 py-2">Уроки сёрфинга</v-card-text>
                    </div>
                    <!--Three-->
                    <div class="block-white pb-4 my-2">
                      <div class="color-block blue mt-1"></div>
                      <v-card-text class="px-0 py-2">Китовый туризм</v-card-text>
                    </div>
                  </v-col>
                  <!--RightBlock-->
                  <v-col cols="8" md="8" class="block-1-left ma-3">
                    <v-card-subtitle class="text-subtitle-1 pa-0">Еда</v-card-subtitle>
                    <!--One-->
                    <div class="block-white my-2">
                      <v-card-text class="px-0 py-1">Мороженое</v-card-text>
                    </div>
                    <!--Two-->
                    <div class="block-white my-2 pa-0">
                      <img
                        width="55%"
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/79108507bf0ec067873590ceb530a5aa/card-tiki-drinks.jpg"
                      />
                      <v-card-text class="px-2 py-2">Напитки</v-card-text>
                    </div>
                    <!--Three-->
                    <div class="block-white pb-4 my-2">
                      <div class="color-block red mt-1"></div>
                      <v-card-text class="px-0 py-2">Сладкое</v-card-text>
                    </div>
                  </v-col>
                </div>
                <div class="d-flex">
                  <!--Left_2_Block-->
                  <v-col cols="8" md="8" class="block-1-left ma-3 mb-10">
                    <v-card-subtitle class="text-subtitle-1 pa-0">В процессе</v-card-subtitle>
                    <!--One-->
                    <div class="block-white my-2">
                      <v-card-text class="px-0 py-1">Доделать работу</v-card-text>
                    </div>
                    <!--Two-->
                    <div class="block-white my-2 pa-0">
                      <img
                        width="100%"
                        src="https://eksmo.ru/upload/iblock/041/books_720_min_min.jpg"
                      />
                      <v-card-text class="px-2 py-2">Прочесть книгу</v-card-text>
                    </div>
                    <!--Three-->
                    <div class="block-white pb-4 my-2">
                      <div class="color-block blue mt-1"></div>
                      <v-card-text class="px-0 py-2">Доделать проект</v-card-text>
                    </div>
                  </v-col>
                  <!--Right_2_Block-->
                  <v-col cols="8" md="8" class="block-1-left ma-3 mb-10">
                    <v-card-subtitle class="text-subtitle-1 pa-0">В процессе</v-card-subtitle>
                    <!--One-->
                    <div class="block-white my-2">
                      <v-card-text class="px-0 py-1">Мороженое</v-card-text>
                    </div>
                    <!--Two-->
                    <div class="block-white my-2 pa-0">
                      <img
                        width="100%"
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/d5a49602b492398e848bdd7d14a60a23/card-surfing-lessons.jpg"
                      />
                      <v-card-text class="px-2 py-2">Уроки сёрфинга</v-card-text>
                    </div>
                    <!--Three-->
                    <div class="block-white pb-4 my-2">
                      <div class="color-block blue mt-1"></div>
                      <v-card-text class="px-0 py-2">Китовый туризм</v-card-text>
                    </div>
                  </v-col>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="0" sm="1"></v-col>
        <v-col cols="12" sm="6" lg="5" xl="5" class="text-block">
          <v-card flat>
            <v-card-title
              class="text-h4 text-center text-sm-left title-1"
            >Вся информация в наглядном виде</v-card-title>
            <v-card-subtitle
              class="text-subt text-h6 text-center text-sm-left"
            >Добавляйте подробную информацию, например комментарии, вложения, сроки и другие сведения, прямо в карточки Trello. Работайте над проектами вместе с коллегами от начала и до конца.</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
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
.block-1-left {
  background-color: #e5eff5;
  border-radius: 6px;
  box-shadow: 0, 2px, 4px, rgba(0, 0, 0, 0.5);
  padding: 8px;
}
.h-100 {
  height: 100%;
}
.block-white {
  background-color: #fff;
  padding: 6px 8px;
  min-height: 33px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.color-block {
  width: 30px;
  height: 7px;
  border-radius: 3.5px;
}
.img-autor {
  position: absolute;
  right: 0%;
  bottom: 0%;
  margin-right: 2%;
}
.text-add-card {
  color: #aaa;
}
.card-2-top {
  height: 510px;
  background: linear-gradient(-90deg, #333, #111);
  word-break: break-word;
  border-radius: 20px !important;
  user-select: none;
  position: relative;
}
.screen-card-2-top {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  width: 100%;
  height: 92%;
  background: linear-gradient(#696cbf, #e2859f);
  border-radius: 20px !important;
  overflow: hidden;
}
.phone_panel_left {
  height: 100%;
  width: 3%;
  position: absolute;
  left: 0%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 2;
}
.phone_panel_right {
  height: 100%;
  width: 3%;
  position: absolute;
  right: 0%;
  background: linear-gradient(-90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 2;
}
.screen_all_blocks {
  height: 94%;
  overflow: scroll;
  width: 100%;
}
.screen_all_blocks::-webkit-scrollbar {
  width: 1px;
  height: 3px;
}
.screen_all_blocks.scroll {
    font-size:1em;
}
.phone_panel_top {
  width: 15%;
  height: 4px;
  background: #444;
  position: absolute;
  left: 50%;
  top: 1.3%;
  border-radius: 20px;
  transform: translate(-50%, 0%);
}
.phone_button_right {
  position: absolute;
  top: 23%;
  width: 2%;
  height: 8%;
  background: #444;
  right: -1.5%;
  z-index: 2;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.phone_button_left {
  position: absolute;
  top: 18%;
  width: 2%;
  height: 16%;
  background: #444;
  left: -1.5%;
  z-index: 2;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.screen_panel_top {
  width: 100%;
  height: 9%;
  background: #3c4fa0;
}
</style>
<style>
.before-enter{
  opacity: 0;
  transform: translate(0%,30%);
  transition: 1.5s !important;
}
.enter{
  opacity: 1;
  transform: translate(0%,0%);
  transition: 1.5s !important;
}
</style>