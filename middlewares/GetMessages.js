// importing the database connection
import database from "../backend/database.js";

const GetMessages = async (req, res, next) => {
  // getting the list of available products
  try {
    const messages = await database`
    select * from messages
    `;
    res.status(200);
    res.json({'data': messages }).end();
  } catch (err) {
    res.status(500);
    res
      .json({
        error: "failed to get messages",
        message: "failed to get messages due to some error",
      })
      .end();
  }
};

export default GetMessages;
