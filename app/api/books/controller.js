const { Book, Category } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllBook: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = {
          ...condition,
          title: {
            [Op.iLike]: `%${keyword}%`,
          },
        };
      }

      const books = await Book.findAndCountAll({
        where: condition,
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
        limit: limit,
        offset: (page - 1) * limit,
      });

      if (books.rows.length > 0) {
        const totalPages = Math.ceil(books.count / limit);

        return res.status(200).json({
          message: "berhasil mendapatkan buku",
          data: books.rows,
          totalPages,
        });
      }

      return res.status(200).json({
        message: "list buku kosong",
        data: books.rows,
      });

    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  createBook: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { title, price, category, author, published, stock } = req.body;

      if (!req.file) {
        return res.status(403).json({
          message: "no file uploaded",
        });
      }
      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        }
      })

      if (!checkCategory) {
        return res.status(404).json({
          message: "Id category tidak di temukan",
        });
      }
      const image = `/upload/${req.file.filename}`;

      const books = await Book.create({
        title, user, price, category, author, published, stock, image,
      })
      return res.status(201).json({
        message: "success create books",
        data: books,
      });

    } catch (err) {
      console.log("err : ", err.message);
      next(err.message);
    }
  },
};