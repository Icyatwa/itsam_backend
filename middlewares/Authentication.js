import database from "../backend/database.js";

const Authenticate = async (req, res, next) => {
  // getting the api key
  let API_KEY;
  if (req.headers.apikey != undefined || req.headers.apikey != null) {
    API_KEY = req.headers.apikey;

    // selecting the key providen from the database
    try {
      const apiKeys = await database`
            select * from apiKeys where key = ${API_KEY}
            `;

      // checking if the key exists in the database and it didnt return an empty array
      if (apiKeys.length !== 0) {
        next();
      } else {
        throw new Error("The providen key was not found in the database");
      }
    } catch (err) {
      console.log(err)
      res.status(401);
      res.json({ error: "not authenticated", message: err });
    }
  } else {
    res.status(400);
    res
      .json({
        error: "not authenticated",
        message: "you did not provide the authentication or api key",
      })
      .end();
  }
};

export default Authenticate;
