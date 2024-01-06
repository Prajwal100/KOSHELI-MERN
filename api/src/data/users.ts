import bcrypt from 'bcryptjs';

const users=[
    {
        name: "Mr. Admin",
        email: "admin@gmail.com",
        avatar: "",
        password: bcrypt.hashSync("111111", 10),
        role: "admin",
        emailVerified: true,
        status: "active",
      },
      {
        name: "Mr. User",
        email: "user@gmail.com",
        avatar: "",
        password: bcrypt.hashSync("111111", 10),
        role: "user",
        emailVerified: true,
        status: "active",
      },
      {
        name: "Prajwal Rai",
        email: "prajwal.iar@gmail.com",
        avatar: "",
        password: bcrypt.hashSync("111111", 10),
        role: "user",
        emailVerified: true,
        status: "active",
      },
      {
        name: "Demo User",
        email: "demo@gmail.com",
        avatar: "",
        password: bcrypt.hashSync("111111", 10),
        role: "user",
        emailVerified: true,
        status: "active",
      },
      {
        name: "John Doe",
        email: "john.doe@gmail.com",
        avatar: "",
        password: bcrypt.hashSync("111111", 10),
        role: "user",
        emailVerified: true,
        status: "active",
      },
      {
        name: "Mr tester",
        email: "tester@gmail.com",
        avatar: "",
        password: bcrypt.hashSync("111111", 10),
        role: "user",
        emailVerified: true,
        status: "active",
      },
];

export default users;