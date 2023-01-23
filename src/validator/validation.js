const mongoose = require("mongoose");

//Name Validation

const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
};

//Email Validation

const isValidEmail = function (email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

//Password Validation

const isValidPassword = function (password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  return passwordRegex.test(password);
};

// Phone Validation
const isValidPhone = function (phone) {
  const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
  return phoneRegex.test(phone);
};

//Value Validation

const isEmpty = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length == 0) return false;
  return true;
};

// const isValidObjectId = (objectId) => {
//   return mongoose.Types.ObjectId.isValid(objectId);
// };

module.exports = {
  isEmpty,
  isValidName,
  isValidEmail,
//   isValidObjectId,
  isValidPhone,
  isValidPassword,
};