import { v2 as cloudinary } from 'cloudinary'

// Configure your cloud name, API key and API secret:

const { CLOUDINARY_NAME, CLOUDINARY_API, CLOUDINARY_SECRET } = process.env

const myconfig =
  CLOUDINARY_NAME && CLOUDINARY_API && CLOUDINARY_SECRET
    ? cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API,
      api_secret: CLOUDINARY_SECRET,
      secure: true
    })
    : {}

export default myconfig
