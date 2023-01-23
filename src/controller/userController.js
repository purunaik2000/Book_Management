const userModel = require("../model/UserModel.js");
const validation = require("../validator/validation");
let { isEmpty, isValidName, isValidPhone, isValidEmail, isValidPassword} = validation;

const createUser = async function (req, res) {
  try {
    let data = req.body;

    let { title, body, name, phone, email, password, address } = data;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide key in request body" });
    }

    if (!isEmpty(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide title" });
    }

    if (!isEmpty(body)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide body of blog" });
    }

    if (!isEmpty(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide name" });
    }
    if (!isEmpty(phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide phone no." });
    }
    if (!isEmpty(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide email" });
    }
    if (!isEmpty(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide password" });
    }
    if (!isEmpty(address)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide address" });
    }
    if (!isValidName(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "title should be alphabets only" });
    }

    if (!isValidName(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "name should be alphabets only" });
    }

    if (!isValidPhone(phone))
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid phone no." });

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Provide a valid email" });
    }

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid password" });
    }
    if (!isValidName(address)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide address" });
    }
    let create = await UserModel.create(data);

    res.status(201).send({ status: true, data: create });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports.createUser = createUser