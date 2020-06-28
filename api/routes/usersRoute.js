const express = require('express');
const authenticateUser = require('../common/authenticate');
const userController = require('../controllers/userController');
const processRequest = require('../util/processRequest');

const router = express.Router();
router.post('/signup', async (req, res) => {
  try {
    const { data } = processRequest(req);
    const { email, password } = data;
    const newUser = await userController.createUser({
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:userId', authenticateUser, async (req, res) => {
  try {
    const { pathParams } = processRequest(req);
    const { userId } = pathParams;

    const deletedUser = await userController.deleteUser({ userId });
    if (deletedUser.deletedCount === 1) res.json({ message: ' user deleted successfully' });
    else res.status(404).json({ message: ' cannot find the user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', authenticateUser, async (req, res) => {
  try {
    const { pathParams } = processRequest(req);
    const { userId } = pathParams;
    const user = await userController.getUser({ userId });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', authenticateUser, async (req, res) => {
  try {
    const users = await userController.listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { data } = processRequest(req);
    const { email, password } = data;
    const user = await userController.loginUser({
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
