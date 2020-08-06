export default  async function requestGET(url) {
    try {
      return await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });
  
      //.json()
    } catch (e) {
      console.log("Ошибка запроса: ", e);
    }
  }

