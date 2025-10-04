// importing the database to use to connect
import database from "../backend/database.js";

const Getkey = async (req, res) => {
  // checking the user credentials of the user trying to get api key
  if ((req.headers.username || req.headers.password) !== undefined) {
    // getting the header datas
    const username = req.headers.username;
    const password = req.headers.password;

    try {
      // getting the password from the database for authentication purposes
      const databasePassword = await database`
          select password from apiKeys where username = ${username}
          `;

      // checking the passwords to see if they match
      if (password == databasePassword[0].password) {
        const apiKey = await database`
              select key from apiKeys where username = ${username}
              `;

        // sending the response
        res.status(200);
        res.json({ 'data': apiKey[0].key }).end();
      } else {
        throw new Error("passwords dont match");
      }
    } catch (err) {
      res.status(401);
      res
        .json({
          error: "auntentication failed",
          message: "authentication has failed due to some erroes",
        })
        .end();
    }
  } else {
    res.status(401);
    res
      .json({
        error: "no credentials",
        message: "username or password are not provided",
      })
      .end();
  }
};

export default Getkey;
