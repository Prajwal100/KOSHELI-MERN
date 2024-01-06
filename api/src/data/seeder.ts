import db from "../models";
import users from "./users";
import User from "../models/user";
import Settings from "../models/settings";

db.once("open", function () {
  console.log("Connected to MongoDB database");
});

const seedData = async () => {
  try {
    await User.deleteMany({
      email: {
        $in: ["admin@gmail.com", "user@gmail.com"],
      },
    });

    await User.insertMany(users);
    await Settings.create({
      site_name:"Kosheli Store",
      site_keywords:"Online shopping, shopping, ecommerce",
      site_description:"Online Shopping Description",
      logo:"logo.png",
      favicon:"",
      email:"kosheli@gmail.com",
      phone:"+977-98765432",
      address:"Kadaghari, Kathmandu",
      symbol:"$",
      copyright:"Copyright © 2022 All Rights Reserved.",
      facebookUrl:"https://www.facebook.com/prajwal.iar",
      instagramUrl:"https://instagram.com/prajwal.iar",
      linkedinUrl:"https://linkedin.com/prajwal.iar",
      twitterUrl:"https://twitter.com/prajwal.iar"
    });
    console.log("Users seeded successfully.");
    console.log("Seed completed.");
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany({
      email: {
        $in: ["admin@gmail.com", "user@gmail.com"],
      },
    });

    console.log("Users Destroyed!");

    console.log("Destroy completed.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  seedData();
}
