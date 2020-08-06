<template>
  <div>
    
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
    await request("/api/contacts/");
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
      .then(response => {
        return response.json();
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