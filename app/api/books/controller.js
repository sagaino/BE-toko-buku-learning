const { Book, Category } = require('../../db/models');
const { Op } = require('sequelize');
const fs = require("fs");
const path = require("path");

module.exports = {
  getAllBook: async (req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;
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
      if(category !== ""){
        condition = {
          ...condition,
          category: category,
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
      const image = `/uploads/${req.file.filename}`;

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

  updateBook: async (req, res, next) => {
    try {
      if (!req.file) {
        const user = req.user.id;
        const id = req.query.id;
        const { title, price, category, author, published, stock } = req.body;

        const checkBook = await Book.findOne({
          where: {
            id: id,
            user
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        })

        if (!checkBook) {
          return res.status(404).json({
            message: "id buku tidak di temukan",
          });
        }

        const book = await checkBook.update({
          title, user, price, category, author, published, stock,
        });

        return res.status(200).json({
          message: "berhasil update buku",
          data: book,
        });

      } else {
        const user = req.user.id;
        const id = req.query.id;
        const { title, price, category, author, published, stock } = req.body;

        const checkBook = await Book.findOne({
          where: {
            id: id,
            user
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        })

        if (!checkBook) {
          return res.status(404).json({
            message: "id buku tidak di temukan",
          });
        }
        try {
          fs.unlinkSync(path.join(`public/${checkBook.image}`));

          const image = `/uploads/${req.file.filename}`;

          await checkBook.update({
            title, user, price, category, author, published, stock, image,
          });

          const book = await checkBook.reload({
            include: {
              model: Category,
              attributes: ["id", "name"],
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });

          return res.status(200).json({
            message: "berhasil update buku",
            data: book,
          });
        } catch (err) {
          // Handle errors during image deletion or book update
          console.log(err);
          fs.unlinkSync(path.join(`public/uploads/${req.file.filename}`));
          return res.status(500).json({
            message: "Gagal menghapus gambar lama atau memperbarui buku",
            status: "gagal"
          });
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  deleteBook: async(req, res, next) => {
    try {
      const id = req.query.id;
      const user = req.user.id;

      const checkIdBook = await Book.findOne({
        where: {
          id,
          user
        },
      });

      if(!checkIdBook){
        return res.status(404).json({
          message: "id buku tidak di temukan",
        });
      }

      await checkIdBook.destroy();

      return res.status(200).json({
        message: "berhasil hapus buku",
        data: checkIdBook
      });

    } catch (err) {
      console.log(err.message);
      next(err.message);
    }
  },
};