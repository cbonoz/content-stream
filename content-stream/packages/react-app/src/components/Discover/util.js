import faker from "faker";

export const LOCK_ADDRESS = "0xcB604f078E85e161A77429BBDBe69F505497e7cB";

export const createCard = (userName, title, eth, description, img, createdAt) => {
  return { userName, title, eth, description, img, createdAt };
};

export const bytesToSize = bytes => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const initCards = () => {
  const cards = [];
  for (let i = 0; i < 1; i++) {
    const d = faker.date.recent();
    const user = faker.internet.userName();
    const card = createCard(
      user,
      `${user} ${d.toLocaleDateString()} stream`,
      faker.commerce.price(),
      faker.image.cats(),
      faker.image.image(),
      d,
    );
    cards.push(card);
  }
  console.log(cards);
  return cards;
};

export const EXAMPLE_CARDS = initCards();
