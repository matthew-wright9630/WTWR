const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getClothingItems() {
  // return fetch(`${baseUrl}/items`).then(checkResponse);
  return request(`${baseUrl}/items`);
}

function addClothingItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteClothingItem(item) {
  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { getClothingItems, addClothingItem, deleteClothingItem };
