const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../models/toursModel');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');




dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connecion 👍'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8'));

const deleteData=async ()=>{
    try{
        // await Review.deleteMany()
        await Tour.deleteMany()
        // await User.deleteMany()
        console.log('Data successfully deleted!')
    }catch(err){
        console.log(err)
    }
}

const importData = async () => {
  try {
    // await Review.create(reviews);
    // await User.create(users);
    await Tour.create(tours);
    console.log('Data successfully loaded')
  } catch (err) {
    console.log(err);
  }
};

// deleteData()
importData()

// console.log(tours);
