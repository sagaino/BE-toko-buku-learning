const { Transaction, DetailTransaction } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      const { invoice = "" } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      let condition = {
        user: req.user.id,
      };

      if (invoice !== "") {
        condition = { ...condition, invoice: { [Op.like]: `%${invoice}%` } };
      }

      const transaction = await Transaction.findAndCountAll({
        where: condition,
        limit: limit,
        offset: (page - 1) * limit,
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      if (transaction.rows.length > 0) {
        const totalPages = Math.ceil(transaction.count / limit);
        return res.status(200).json({
          message: "success get all transaction",
          totalPages,
          data: transaction.rows,
        });
      }
      return res.status(200).json({
        message: "tidak ada transaksi",
        data: transaction.rows,
      });
    } catch (err) {
      next(err);
    }
  },

  getDetailTransaction: async (req, res, next) => {
    try {
      const id = req.query.id;
      const invoice = req.query.invoice;
      const user = req.user.id;

      let condition = {
        user
      };

      if (!id && !invoice) {
        return res.status(404).json({
          message: "id atau invoice wajib di isi",
        });
      }

      if (id) {
        condition = {
          ...condition,
          id: id,
        };
      }
      if (invoice) {
        condition = {
          ...condition,
          invoice: invoice,
        };
      }

      const getDetailTransaction = await Transaction.findOne({
        where: condition,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
      })
      if (!getDetailTransaction) {
        return res.status(200).json({
          message: "tidak ada transaksi",
          data: getDetailTransaction,
        });
      }
      return res.status(200).json({
        message: "berhasil mendapatkan detail transaksi",
        data: getDetailTransaction,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};