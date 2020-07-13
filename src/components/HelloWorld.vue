<template>
  <div class="hello">
    <h1></h1>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  async mounted() {
    await request("http://localhost:8081/api/contacts/")
    .then(res => {
      console.log(res)
    })
    /* var data = await request("http://localhost:8080/api/contacts/"); */

    /* for(var i = 0; i < data.length; i++)
        this.contacts.push({...data[i]}) */
  }
}


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

<style scoped>
</style>
