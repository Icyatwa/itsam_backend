// importing the database to be used
import database from "../backend/database.js";

const DeleteFaq = async (req, res, next) => {
  try {
    const { faqid } = req.params;
    const data = await database`
    delete from faqs where id = ${faqid}
    `;

    res.status(204);
    res.end();
  } catch (err) {
    res.status(500);
    res.json({ "error": "failed to delete the product","message":err });
    res.end();
  }
};

export default DeleteFaq
