import WaterIcon from "../assets/icons/WaterIcon.png";
import SunIcon from "../assets/icons/SunIcon.png";
import BagIcon from "../assets/icons/BagIcon.png";

import GardenCareIcon from "../assets/icons/GardenCareIcon.png";
import PlantRenovationIcon from "../assets/icons/PlantRenovationIcon.png";
import WateringGardenIcon from "../assets/icons/WateringGardenIcon.png";

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

export const StaticMPCare = [
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

export const StaticMPGarden = [
  {
    id: 1,
    icon: GardenCareIcon,
    alt: "GardenCareIcon",
    title: "Garden Care",
    text: "In the Garden Care section you will find useful tips and tricks for caring for your garden. Determine how to properly trim plants, fertilize the soil, and provide optimal conditions for the healthy growth of flowers and ornamental shrubs.",
  },
  {
    id: 2,
    icon: PlantRenovationIcon,
    alt: "PlantRenovationIcon",
    title: "Plant Renovation",
    text: "Plant Renovation is your path to the revival and renewal of plants in the garden. Here you will find ideas for replanting, restoring plant health, as well as tips for strengthening the root system and stimulating growth.",
  },
  {
    id: 3,
    icon: WateringGardenIcon,
    alt: "WateringGardenIcon",
    title: "Watering Graden",
    text: "In the Watering Garden section we will share with you the best practices for watering your garden. Learn how to properly determine your plants' water needs, choose the optimal time to water, and create effective automatic watering systems for the health of your garden.",
  },
];
