import Oleg from "assets/Oleg.jpg";
import Andrew from "assets/Andrew.png";
import Vladislav from "assets/Vladislav.png";

export const enum Description {
  DESCRIPTION = `Our project is a SPA application for selling plants of various types. Our goal is to create a convenient and enjoyable application for all plant lovers, helping them quickly and easily select and purchase the necessary plants for their garden or home. `,
  OURTEAM = `Each of us worked around the clock, trying to make the application optimized, adaptive, fix bugs, and also give it a stylish and attractive design. We called each other on Google Meet to share tasks and discussed how best to implement them. Also, for some small problems and questions, we supported communication in the telegram group. Our team of three people worked on the project:`,
}

export const teamData = [
  {
    name: "Oleg",
    role: "TeamLeader",
    about:
      "Has extensive knowledge in programming, and he also has experience in commercial application development, so we always turn to him for all questions about code structure, correct code writing, working with the framework and for other help. He wrote some of the most complex parts of the code, including tests, various react contexts, validation, etc.",
    description:
      "Has extensive knowledge in programming, and he also has experience in commercial application development, so we always turn to him for all questions about code structure, correct code writing, working with the framework and for other help. He wrote some of the most complex parts of the code, including tests, various react contexts, validation, etc.",
    photo: `${Oleg}`,
    gitHubLink: "https://github.com/Oleg-Melnikow",
  },
  {
    name: "Andrew",
    role: "Developer",
    about:
      "I am 35 years old. In 2011, I graduated from the Belarusian Technical University with a degree in Auto Service After graduating from the university, I work in my specialty. Currently, I am a service engineer for the repair of construction and warehouse equipment.",
    description:
      "Well versed in server requests, he has done a lot of work with commerce tools, setting up a personal account, product cards, tokens, a shopping cart and much more.",
    photo: `${Andrew}`,
    gitHubLink: "https://github.com/AndreiMakhnach2209",
  },
  {
    name: "Vladislav",
    role: "Developer",
    about:
      "I am 33 years old. In 2014, graduated from the Mogilev Belarusian-Russian University with a degree in welding technology and equipment. But i worked as an engineer for non-destructive testing of metals, checking our nuclear and power plants in the Republic of Belarus for defects. This work was harmful to my health and took a lot of time due to endless business trips, so I decided to change my field of activity to a front-end developer. I quit my job and for the last almost 2 years I have been trying to study this area of ​​programming.",
    description:
      "When we started our project, I didn’t know React at all, but gradually, thanks to Oleg’s advice and practice, I was able to learn a little about React, its features, helped the team to the best of my ability, and even created several pages of our application.",
    photo: `${Vladislav}`,
    gitHubLink: "https://github.com/JeckJonnyQ",
  },
];
