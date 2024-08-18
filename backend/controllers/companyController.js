import { Company } from "../models/companySchema.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addCompany = async (req, res) => {
  try {
    const { name, email, phone, address, website, description, admin } =
      req.body;

      const companyData = {
        name,
        email,
        phone,
        address,
        website,
        description,
        admin
      };

      if (req.files && req.files?.logo) {
        const { logo } = req.files;
        if (logo) {
          try {
            const cloudinaryResponse = await cloudinary.uploader.upload(
              logo.tempFilePath,
              { folder: "Company_Logo" }
            );
            if (!cloudinaryResponse || cloudinaryResponse.error) {
              return next(
                new ErrorHandler("Failed to upload company logo to cloud.", 500)
              );
            }
            companyData.logo = {
              public_id: cloudinaryResponse.public_id, // we are storing the logo in the companyData list.
              url: cloudinaryResponse.secure_url,
            };
          } catch (error) {
            return next(new ErrorHandler("Failed to upload resume", 500));
          }
        }
      }
      const company = await Company.create(companyData);
      await User.findByIdAndUpdate(admin, { company: company._id });
      const updatedUser = await User.findById(admin,{
        password : 0
      });
      res.status(201).json({ success: true, user : updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
