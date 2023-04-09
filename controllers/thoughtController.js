const User = require('../models/user');
const Thought = require('../models/thought');
const reactionSchema = require('../models/reaction');

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

   // get a thought user by id
   getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new:true }
    )
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) => res.json({ message: 'Thought deleted'}))
      .catch((err) => res.status(400).json(err));
  },

  // add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new:true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(400).json(err));
  },

  // delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new:true }
    )
      .then((reaction) => res.json({ message: 'Reaction deleted'}))
      .catch((err) => res.status(400).json(err));
  }
}