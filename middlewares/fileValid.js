import path from "path"

const supportedExts = ['.jpg', '.png', '.jpeg', '.webp'];

export const validFile = (req, res, next) => {

  //file check
  const imageFile = req.files?.image;

  if (!imageFile) return res.status(400).json({ message: "Please Provide image file" });

  const extType = path.extname(imageFile.name)

  //file extension check
  if (supportedExts.includes(extType)) {

    //image move function
    imageFile.mv(`./uploads/${imageFile.name}`, (err) => {
      if (err) return res.status(400).json({ message: err })
      req.imagePath = `/uploads/${imageFile.name}`
      next();
    });
  } else {
    return res.status(400).json({ message: "Please Provide Valid Image" })
  }

}

export const updateFile = (req, res, next) => {

  //file check
  const imageFile = req.files?.image;

  if (!imageFile) return next();

  const extType = path.extname(imageFile.name)

  //file extension check
  if (supportedExts.includes(extType)) {

    //image move function
    imageFile.mv(`./uploads/${imageFile.name}`, (err) => {
      if (err) return res.status(400).json({
        message: err
      })

      req.imagePath = `/uploads/${imageFile.name}`
      next();
    });

  } else {
    return res.status(400).json({
      message: "Please Provide Valid Image"
    })
  }
}