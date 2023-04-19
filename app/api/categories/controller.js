const { Category } = require('../../db/models');

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      var dataQuery; 
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const categories = await Category.findAndCountAll(
        {
          logging: (sql, queryObject) => {
            dataQuery = sql
          },
          where: {
            user: req.user.id,
          },
          attributes: ["id", "name"],
          limit: limit,
          offset: (page - 1) * limit,
          raw: true,
        }
      );

      if (categories.rows.length > 0) {
        const totalPages = Math.ceil(categories.count / limit);

        return res.status(200).json({
          message: "Success get all categories",
          data: categories.rows,
          totalPages,
          query: dataQuery,
        });
      } else {
        return res.status(200).json({
          message: "data is empty",
          data: [],
          query: dataQuery,
        });
      }
    } catch (err) {
      next(err);
      return res.status(404).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  },
  // getAllCategories: async (req, res, next) => {
  //   try {
  //     var dataQuery;
  //     const categories = await Category.findAll(
  //       {
  //         logging: (sql, queryObject) => {
  //           dataQuery = sql
  //           sendToElasticAndLogToConsole(sql, queryObject)
  //         },
  //         where: {
  //           user: req.user.id,
  //         },
  //         attributes: { exclude: ['createdAt', 'updatedAt'] },
  //         raw: true,
  //       }
  //     );
  //     function sendToElasticAndLogToConsole(sql, queryObject) {
  //       // save the `sql` query in Elasticsearch
  //       // console.log("sql : ", sql)

  //       // use the queryObject if needed (e.g. for debugging)
  //     }
  //     if (categories.length > 0) {
  //       res.status(200).json({
  //         message: "Success get all categories",
  //         data: categories,
  //         query: dataQuery
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "data is empty",
  //         data: null,
  //         query: dataQuery
  //       });
  //     }
  //   } catch (err) {
  //     res.status(404).json({
  //       message: "Internal server error",
  //       error: err.message,
  //     });
  //     next();
  //   }
  // },

  //get kateogri by query id
  getCategories: async (req, res, next) => {
    try {
      const id = req.query.id;

      const categories = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true,
      });

      if (categories) {
        res.status(200).json({
          message: "berhasil mendapatkan kategori by id ",
          data: categories,
        });
      };

      res.status(404).json({
        message: "kategori tidak ada",
      });

    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({
          message: "name is required",
        })
        return;
      }
      const checkNameCategories = await Category.findOne({
        where: {
          name: name,
        },
      })
      if (checkNameCategories) {
        return res.status(400).json({
          message: "nama kategori sudah terdaftar"
        })
      }
      const categories = await Category.create({
        name: name,
        user: req.user.id,
      })

      return res.status(201).json({
        message: "success create categories",
        data: categories,
      })
    } catch (err) {
      console.log(err);
      next(eer);
    }
  },

  //update with params
  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        res.status(400).json({
          message: "name is required",
        })
        return;
      }

      const checkCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
        attributes: ["id", "name"],
      });

      if (checkCategory) {
        const categories = await checkCategory.update({
          name: name,
        });

        return res.status(200).json({
          message: "berhasil update categories",
          data: categories,
        })
      }

      return res.status(404).json({
        message: "gagal update kategori",
      });

    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  //update with query exp: ?id=
  updateCategoriesQuery: async (req, res, next) => {
    try {
      const id = req.query.id;
      const { name } = req.body;

      console.log("id query : ", id);

      if (!name) {
        res.status(400).json({
          message: "name is required",
        })
        return;
      }

      const checkCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
        attributes: ["id", "name"],
      });

      if (checkCategory) {
        const categories = await checkCategory.update({
          name: name,
        });

        return res.status(200).json({
          message: "berhasil update categories",
          data: categories,
        })
      }

      return res.status(404).json({
        message: "gagal update kategori",
      });

    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  deleteCategories: async (req, res, next) => {
    try {
      const id = req.query.id;

      const checkCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
      });

      if (checkCategory) {
        const categories = await checkCategory.destroy();
        return res.status(200).json({
          message: "berhasil delete kategori",
          data: checkCategory,
        });
      }
      return res.status(404).json({
        message: "gagal hapus kategori"
      });
    } catch (err) {
      next(err);
      return res.status(505).json({
        message: "gagal hapus kategori"
      });
    }
  }
}