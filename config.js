module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL : process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI:
      process.env.MONGODB_URI ||  "mongodb+srv://qweqwe123123:qweqwe123123@cluster0.j7ctr.mongodb.net/<dbname>?retryWrites=true&w=majority"
  };
  