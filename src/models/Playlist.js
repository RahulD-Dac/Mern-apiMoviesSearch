const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
         name: {
                  type: String,
                  required: true,
         },
         isPublic: {
                  type: Boolean,
                  required: true,
                  default: false,
         },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
