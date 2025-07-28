// hash-password.js
const bcrypt = require("bcrypt");
const { User } = require("./models");

(async () => {
  const password = await bcrypt.hash("Anuj5996", 10);
  const user = await User.create({
    name: "Admin",
    email: "banoteanuj999@gmail.com",
    password,
    role: "admin", // or "user"
  });

  console.log("✅ Admin created:", user.email);
})();
