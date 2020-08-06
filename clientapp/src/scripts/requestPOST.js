export default async function requestPOST(url, body) {
    try {
      const headers = {
        "content-type": "application/json",
      };
      return await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
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