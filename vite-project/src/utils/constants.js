const weatherImageOptions = [
  {
    isDay: true,
    condition: "cloudy",
    imageUrl: new URL("../assets/cloudyDay.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "sunny",
    imageUrl: new URL("../assets/sunnyDay.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "rain",
    imageUrl: new URL("../assets/rainDay.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "storm",
    imageUrl: new URL("../../assets/stormDay.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "snow",
    imageUrl: new URL("../../assets/snowDay.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "fog",
    imageUrl: new URL("../../assets/fogDay.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "cloudy",
    imageUrl: new URL("../../assets/cloudyNight.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "sunny",
    imageUrl: new URL("../../assets/sunnyNight.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "rain",
    imageUrl: new URL("../../assets/rainNight.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "storm",
    imageUrl: new URL("../../assets/stormNight.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "snow",
    imageUrl: new URL("../../assets/snowNight.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "fog",
    imageUrl: new URL("../../assets/fogNight.png", import.meta.url).href,
  },
];

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const apiKey = "8ecc5cfe21d771794ef5a24ac44e2ca0";
const latitude = 41.1253;
const longitude = -84.8533;

export {
  weatherImageOptions,
  defaultClothingItems,
  apiKey,
  latitude,
  longitude,
};
