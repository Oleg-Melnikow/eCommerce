import WaterIcon from "../assets/icons/WaterIcon.png";
import SunIcon from "../assets/icons/SunIcon.png";
import BagIcon from "../assets/icons/BagIcon.png";

export const enum Description {
  WELCOME = `Welcome to greenshop`,
  BETTERPLANET = `Let’s Make a Better `,
  ONLINESHOP = `We are an online plant shop offering a wide range of cheap and
  trendy plants. Use our plants to create an unique Urban Jungle.
  Order your favorite plants!`,

  TAKECARE = `By following these three steps - proper watering, appropriate
  sunlight, and providing essential nutrients - you'll be well on your
  way to maintaining healthy and thriving plants.`,
}

export const StaticMainPage = [
  {
    id: 1,
    icon: WaterIcon,
    alt: "WaterIcon",
    title: "Watering",
    text: "Water your plants when the top inch of soil feels dry to the touch. Avoid overwatering, as it can lead to root  dehydration.",
  },
  {
    id: 2,
    icon: SunIcon,
    alt: "Sunlight",
    title: "Sunlight",
    text: "Most plants need adequate sunlight to thrive. Place your plants in areas that receive the appropriate amount of light for their specific needs.",
  },
  {
    id: 3,
    icon: BagIcon,
    alt: "BagIcon",
    title: "Nutrients and Fertilizing",
    text: "Choose a suitable fertilizer based on the specific needs of your plants, whether it's a balanced or specialized formula.",
  },
];
