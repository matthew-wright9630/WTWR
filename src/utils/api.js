const baseUrl = "http://localhost:3001";

function getClothingItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addClothingItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    return res ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteClothingItem(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    return res ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getClothingItems, addClothingItem, deleteClothingItem };
