const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config({
  path:'./config.env'
})
const app=require('./app')


const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
// mongoose.connect(process.env.DATABASE_LOCAL,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(()=>console.log("DB connection succesrull!"))





const port = process.env.PORT||8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


