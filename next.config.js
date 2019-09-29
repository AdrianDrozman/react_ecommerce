// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      'mongodb+srv://adyy123:VTq4rvHatS0tYvEQ@cluster0-3evgu.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: 'dfdsfsfdsfdsvbcewq',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dme737cmn/image/upload',
    STRIPE_SECRET_KEY: '<insert-stripe-secret-key>'
  }
};
