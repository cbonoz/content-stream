import faker from "faker";

export const createCard = (title, eth, description, img) => {
  return { title, eth, description };
};

const initCards = () => {
  const cards = [];
  for (let i = 0; i < 2; i++) {
    const card = createCard(
      faker.commerce.productName(),
      faker.internet.userName,
      faker.commerce.productDescription(),
      faker.image.image(),
    );
    cards.push(card);
  }
  return cards;
};

export const EXAMPLE_CARDS = initCards();
