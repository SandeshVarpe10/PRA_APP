const recommendationModel = require("../model/recommendations.js");
let db=require("../../db.js")

exports.getUserHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    const history = await new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          c.cart_id,
          c.user_id,
          c.product_id,
          c.quantity,
          c.created_at AS cart_created_at,
          c.updated_at AS cart_updated_at,

          p.product_name,
          p.product_image,
          p.brand,
          p.description,
          p.stock_unit,
          p.stock,
          p.price,
          p.discount,
          p.organic,
          p.created_at AS product_created_at,
          p.updated_at AS product_updated_at,

          sc.subcategory_id,
          sc.subcategory_name,
          cat.id AS category_id,
          cat.category_name
        FROM cart c
        JOIN products p ON c.product_id = p.product_id
        JOIN subcategory sc ON p.subcategory_id = sc.subcategory_id
        JOIN categories cat ON sc.category_id = cat.id
        WHERE c.user_id = ?;
      `;

      db.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.status(200).json({ products: history });
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err });
  }
};


exports.getRecommendations = async (req, res) => {
    const userId = req.params.userId;
    try {
        const recommended = await recommendationModel.getRecommendedProducts(userId);
        res.status(200).json(recommended);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recommendations", error: err });
    }
};
