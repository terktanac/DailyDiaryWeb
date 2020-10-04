const mongoose = require('mongoose')
const Schema = mongoose.Schema
const diarySchema = new Schema({
  name: String,
  date: Date,
  text: String,
  color: String
})
const DiaryModel = mongoose.model('Diary', diarySchema)
module.exports = DiaryModel