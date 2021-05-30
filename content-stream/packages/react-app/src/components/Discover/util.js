import faker from "faker";

export const LOCK_ADDRESS = "0xcB604f078E85e161A77429BBDBe69F505497e7cB";

faker.seed(124);

export const createCard = (userName, title, eth, img, createdAt, key) => {
  return {
    userName,
    title,
    eth,
    img,
    createdAt,
    key: key || "bafzbeiafmqf335n3xigktpd6cvkno3md7353hc5zhtpu2censhivu6udxq",
  };
};

export const bytesToSize = bytes => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const initCards = () => {
  const cards = [];
  for (let i = 0; i < 7; i++) {
    const d = faker.date.recent();
    const user = faker.internet.userName();
    const img = `${faker.image.sports()}?random=${Math.round(Math.random() * 1000)}`;
    const card = createCard(user, `${user} ${d.toLocaleDateString()} stream`, "0.01", img, d);
    cards.push(card);
  }
  console.log(cards);
  return cards;
};

export const EXAMPLE_CARDS = initCards();

export const addCard = c => EXAMPLE_CARDS.push(c);
