const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  //login
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role,
                createdAt: checkUser.createdAt
              },
            },
            "secret",
            {
              expiresIn: "1h"
            }
          );
          res.status(200).json({ message: "sukses signin", data: token });
        } else {
          res.status(403).json({ message: "Invalid password" });
        }
      } else {
        res.status(403).json({ message: "Invalid email" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  //register
  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      if (password !== confirmPassword) {
        res.status(403).json({
          message: "Password and confirm password dont match"
        });
        return;
      }
      if (!name) {
        res.status(403).json({
          message: "Tolong input nama anda",
        });
        return;
      }
      const checkEmail = await User.findOne({
        where: {
          email: email,
        }
      })
      if (checkEmail) {
        res.status(403).json({
          message: "email sudah ada"
        })
        return;
      }

      const checkRole = () => {
        switch (role) {
          case "":
            return "admin"
          case "admin":
            return role
          case "kasir":
            return role
          default:
            return "admin"
        }
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: checkRole(),
      })

      delete user.dataValues.password;

      res.status(201).json({
        message: "sukses signup",
        data: user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  //check jwt and refresh jwt
  checkJwt: async (req, res, next) => {
    try {
      const tokenHeader = req.headers.authorization;
      const token = tokenHeader.substring(7);
      // Assume that the token is stored in a variable called `token`
      const decoded = jwt.decode(token);

      // Check if the token has expired
      if (decoded?.exp < Date.now() / 1000) {
        // The token has expired, so generate a new token
        const newToken = jwt.sign(
          { user: decoded.user }, // Use the same user object from the decoded token
          "secret", // Use the same secret key used to sign the original token
          { expiresIn: "1h" } // Set a new expiration time for the new token
        );

        // Set the new token in the response header or body
        res.header("Authorization", "Bearer " + newToken);
        res.status(401).json({ message: "token expired", newToken: newToken, });
      } else {
        // The token is still valid, so continue with the request
        // ...
        res.status(200).json({ message: "token not expired", token: token });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
}