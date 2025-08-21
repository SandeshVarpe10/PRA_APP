let usermodel = require("../model/userModel.js");
let categoryModel = require("../model/productModel.js");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "#4545#";


exports.SaveUserData = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const photo = req.file?.filename || "default.jpg";
    const created_at = new Date().toISOString().slice(0, 10);
    const type = "user";

    const existingUser = await usermodel.verifyUserData(email);
    if (existingUser && existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usermodel.SaveUserData(
      name,
      email,
      hashedPassword,
      age,
      photo,
      type,
      created_at
    );

    const token = jwt.sign({ email, type }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            sameSite: "lax",
            secure:false
        });
        res.cookie("type", type, {
            httpOnly: false,
            maxAge: 3600000,
            sameSite: "lax",
            secure: false
        });

        const savedUser = await usermodel.verifyUserData(email); // create this function in your model
res.cookie("userid", savedUser[0].id, {
    httpOnly: false,
    maxAge: 3600000,
    sameSite: "lax",
    secure: false
});
console.log(type, savedUser[0].id);
        return res.status(201).json({ success: true, message: "User registered successfully", email, type });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Login
exports.LoginUserData = async (req, res) => {
  try {
    const { email, password, type } = req.body;

    const user = await usermodel.verifyUserData(email);
    if (!user || user.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    let isMatch;
    if (type === "admin") {
      isMatch = password === user[0].password;
    } else {
      isMatch = await bcrypt.compare(password, user[0].password);
    }

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

        // JWT तयार करताना userid पण add करा
        const token = jwt.sign(
            { 
                id: user[0].id || user[0]._id,   // DB वर अवलंबून
                email: user[0].email, 
                type: user[0].type 
            }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        // cookies मध्ये token, type, userid set करा
        res.cookie("token", token, {
            httpOnly: false,
            maxAge: 3600000, // 1 hour
            sameSite: "lax",
            secure: false
        });

        res.cookie("type", user[0].type, {
            httpOnly: false,
            maxAge: 3600000,
            sameSite: "lax",
            secure: false
        });

        res.cookie("userid", user[0].id, {
            httpOnly: false,   // frontend वर वापरायचे असल्यास false ठेवा
            maxAge: 3600000,
            sameSite: "lax",
            secure: false
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            email: user[0].email,
            type: user[0].type,
            userid: user[0].id
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
};

exports.logoutUser = (req, res) => {
  // clear all cookies related to auth
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // production madhe true kara
    sameSite: "lax",
  });

  res.clearCookie("type", {
    httpOnly: false,  // ha tu UI madhe access kartos mhanun httpOnly=false rahil
    secure: false,
    sameSite: "lax",
  });

  res.clearCookie("userid", {
    httpOnly: false,  // ha tu UI madhe access kartos mhanun httpOnly=false rahil
    secure: false,
    sameSite: "lax",
  });


  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};



// controllers/userController.js
exports.getAdminProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const email = req.user.email;
    console.log(req.user.email);
    const user = await usermodel.verifyUserData(email);
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // send user info
    console.log("User data for profile:", user[0]);
    return res.status(200).json({
      success: true,
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      age: user[0].age,
      photo: user[0].photo,
      type: user[0].type,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAdminData = async (req, res) => {
  try {
    const uid = req.params.uid;
    const Admin = await usermodel.getAdminData(uid); // fetch admin by UID

    if (!Admin || Admin.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found" });
    }

    // Send the admin data as response
    return res.status(200).json(Admin);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update admin profile
exports.saveUpdatedAdmin = async (req, res) => {
  try {
    const uid = req.params.uid;

    // multer file + body data
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      type: req.body.type,
      photo: req.file ? req.file.filename : req.body.oldPhoto // जर नवीन photo असेल तर file use कर, नाहीतर जुनी ठेव
    };

    const result = await usermodel.updateAdminData(uid, updatedData);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found or not updated" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Admin profile updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllUsers=async (req,res)=>{
    try{
        let promise=usermodel.getUsers();
        promise.then((result) => {
        if (result && result.length > 0) {
            res.status(200).json({result});
        } 
    }).catch((err) => {
        res.status(404).json(err);
    });
    }catch(err){
        console.error("Error fetching users:", err);
        return res.status(500)
    }}

exports.deleteUser = async (req, res) => {
  try {
    let userId = req.params.uid;
    await usermodel.deleteUserById(userId);

    let promise = usermodel.getUsers();
    promise
      .then((result) => {
        if (result && result.length > 0) {
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } catch (err) {
    console.error("Error deleting users:", err);
    return res.status(500);
  }
};