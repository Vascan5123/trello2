<template>
  <div>
    <v-container fill-height fluid>
      <v-layout row wrap align-center>
      <v-row align="center" justify="center">
        <v-col cols="5">
          <form>
            <v-text-field v-model="form.name" label="Name" required></v-text-field>
            <v-text-field v-model="form.lastname" label="E-mail"></v-text-field>

            <v-btn class="mr-4 primary" :disabled="!CanCreate" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </v-col>
      </v-row>
      </v-layout>
    </v-container>



    <v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="10">
            Centered both vertically and horizontally
        </v-col>
    </v-row>
</v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        lastname: ""
      },
      contacts: []
    };
  },
  computed: {
    CanCreate() {
      return this.form.name.trim() && this.form.lastname.trim();
    }
  },
  methods: {
    async submit() {
      const { ...value } = this.form;

      const newContact = await request("/api/contacts/", "POST", value);

      this.contacts.push({ ...newContact });

      console.log(newContact);

      /* this.contacts.push({...value, id: Date.now()}) */
      this.form.name = this.form.lastname = "";
    },
    clear() {
      this.form.name = this.form.lastname = "";
    }
  },
  async mounted() {
    var data = await request("/api/contacts/");
    /* var data = await request("http://localhost:8080/api/contacts/"); */

    /* for(var i = 0; i < data.length; i++)
        this.contacts.push({...data[i]}) */
    console.log(data);
  }
};

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};

    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    return await fetch(url, {
      method,
      headers,
      body,
      mode: "no-cors"
    })
      .then(res => {
        return res;
      })
      .catch(error => {
        console.log(error);
      });

    //.json()
  } catch (e) {
    console.log("Ошибка запроса: ", e);
  }
}
</script>

<style>
</style>