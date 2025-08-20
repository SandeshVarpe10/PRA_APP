let usermodel = require("../model/userModel.js");
let categoryModel = require("../model/productModel.js");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "#4545#";

/*exports.homePage = async (req, res) => {
    try {
        let user = null;

        if (req.user && req.user.email) {
            const data = await usermodel.verifyUserData(req.user.email);
            if (data && data.length > 0) {
                user = data[0];
            }
        }
        const categories = await categoryModel.getAllCategories(); 
        const subcat=await categoryModel.getAllSubCategories();
        res.render("Home.ejs", {
            user: user,
            categories: categories,
            subcategories: subcat
        });
    } catch (err) {
        res.render("Home.ejs", {
            user: null,
            categories: [],
            subcategories: [],
            msg: "Something went wrong while loading home page."
        });
    }
};*/

/*exports.LoginPage = (req, res) => {
    res.render("login.ejs", { msg: null });
};*/

/*exports.RegisterPage = (req, res) => {
    res.render("Register.ejs", { msg: null });
};*/

exports.SaveUserData = async (req, res) => {
    try {
        const { name, email, password, age } = req.body; 
        const photo = req.file?.filename || "default.jpg";
        const created_at = new Date().toISOString().slice(0, 10);
        const type = "user";

        const existingUser = await usermodel.verifyUserData(email);
        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usermodel.SaveUserData(name, email, hashedPassword, age, photo, type, created_at); 

        const token = jwt.sign({ email, type }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            sameSite: "lax",
            secure:false
        });

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
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        let isMatch;
        if (type === "admin") {
            isMatch = password === user[0].password;
        } else {
            isMatch = await bcrypt.compare(password, user[0].password);
        }

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ email: user[0].email, type: user[0].type }, SECRET_KEY, { expiresIn: "1h" });
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: "lax",
            secure:false
        });
        console.log("hi " + JSON.stringify(req.cookies));
        return res.status(200).json({
            success: true,
            message: "Login successful",
            email: user[0].email,
            type: user[0].type,
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
};



exports.logoutUser = (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,    // cookie browser scripts पासून safe राहील
    secure: false,     // production मध्ये true करा (HTTPS साठी)
    sameSite: "lax",   // optional
  });
  
  // user ला redirect किंवा response देऊ शकतो
  res.status(200).json({ success: true, message: "Logged out successfully" });
};


// controllers/userController.js
exports.getAdminProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const email = req.user.email;
        console.log(req.user.email);
        const user = await usermodel.verifyUserData(email);
        if (!user || user.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // send user info
        console.log("User data for profile:", user[0]);
        return res.status(200).json({
            success: true,
            id:user[0].id,
            name: user[0].name,
            email: user[0].email,
            age: user[0].age,
            photo: user[0].photo,
            type: user[0].type
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
      return res.status(404).json({ success: false, message: "Admin Not Found" });
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
    const uid = req.params.uid;       // get admin ID from URL
    const updatedData = req.body;     // get updated data from frontend

    // Call usermodel function to update admin in DB
    const result = await usermodel.updateAdminData(uid, updatedData);

    if (!result) {
      return res.status(404).json({ success: false, message: "Admin not found or not updated" });
    }

    return res.status(200).json({ success: true, message: "Admin profile updated successfully" });
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