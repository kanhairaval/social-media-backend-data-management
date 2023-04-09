const User = require('../models/user');
const Thought = require('../models/thought');

module.exports = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },

  // get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v'})
      .populate({
        path: 'friends',
        select: '-__v'})
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // create a user
  createUser(req, res) {
    User.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new:true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => res.json({ message: 'User deleted'}))
      .catch((err) => res.status(400).json(err));
  },

  // add a freind
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new:true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new:true }
    )
      .then((user) => res.json({ message: 'Friend deleted'}))
      .catch((err) => res.status(400).json(err));
  }
}