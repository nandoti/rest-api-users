class UserController {
  index(req, res) {
    console.log(req.body);
  }
  show(req, res) {
    let users = [
      "Fernando",
      "Patrick",
      "Carlos",
      "Rafa",
      "Yuri",
      "Gui",
      "Livinho",
    ];
    return res.status(200).json({
      error: false,
      users,
    });
  }
}

module.exports = new UserController();
