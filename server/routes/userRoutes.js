const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/register",
  controller.Register
);
router.post(
  "/login",
  controller.Login
);
router.post(
  "/send-reset-email",
  controller.SendResetEmail
);
router.put(
  "/reset-password/:uniqueId",
  controller.ResetUserPassword
);
router.get(
  "/get-user-info",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  controller.GetUserInfo
);
router.put(
  "/update-user-info",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  controller.UpdateUser
);

module.exports = router;
