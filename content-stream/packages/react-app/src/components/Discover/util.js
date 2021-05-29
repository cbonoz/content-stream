import faker from "faker";

export const createCard = (title, eth, description, img) => {
  return { title, eth, description };
};

const initCards = () => {
  const cards = [];
  for (let i = 0; i < 9; i++) {
    const card = createCard(
      `${faker.internet.userName()} stream`,
      faker.commerce.price(),
      faker.image.cats(),
      faker.image.image(),
    );
    cards.push(card);
  }
  return cards;
};

export const EXAMPLE_CARDS = initCards();
