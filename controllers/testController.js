const testUserController = (req, res) => {
  try {
    res.status(200).send( "<h1>Test user api"
    );
  } catch (error) {
    console.log("error in test API", error);
  }
};

module.exports = { testUserController };
