
const express = require("express");
const router = express.Router();

router.post("/calculate", (req, res) => {
  const { firstNumber, secondNumber, operation } = req.body;

  if (
    typeof firstNumber !== "number" ||
    typeof secondNumber !== "number" ||
    !Number.isFinite(firstNumber) ||
    !Number.isFinite(secondNumber)
  ) {
    return res.status(400).json({
      error: "Please provide two valid numbers."
    });
  }

  let result;

  switch (operation) {
    case "add":
      result = firstNumber + secondNumber;
      break;

    case "subtract":
      result = firstNumber - secondNumber;
      break;

    case "multiply":
      result = firstNumber * secondNumber;
      break;

    case "divide":
      if (secondNumber === 0) {
        return res.status(400).json({
          error: "Cannot divide by zero."
        });
      }

      result = firstNumber / secondNumber;
      break;

    default:
      return res.status(400).json({
        error: "Unsupported operation."
      });
  }

  if (!Number.isFinite(result)) {
    return res.status(400).json({
      error: "The result is outside the supported range."
    });
  }

  res.json({
    result: Number(result.toPrecision(12))
  });
});

module.exports = router;
