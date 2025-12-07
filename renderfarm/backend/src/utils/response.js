// backend/src/utils/response.js
module.exports = {
  success(res, data = {}, message = "OK") {
    return res.status(200).json({
      status: "success",
      message,
      data,
    });
  },

  error(res, message = "Something went wrong", code = 400) {
    return res.status(code).json({
      status: "error",
      message,
    });
  }
};
