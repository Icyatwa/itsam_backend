// importing the database to be used
import database from "../backend/database.js";

const DeleteMessage = async (req, res, next) => {
  try {
    const { messageid } = req.params;
    const data = await database`
    delete from messages where id = ${messageid}
    `;

    res.status(204);
    res.end();
  } catch (err) {
    res.status(500);
    res.json({ "error": "failed to delete the message","message":err });
    res.end();
  }
};

export default DeleteMessage
