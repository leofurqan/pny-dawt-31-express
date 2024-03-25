const mongoose = require("mongoose")

mongoose.connect(process.env.DB).then(() => {
    console.log("DB Connected Successfully...")
}).catch((error) => {
    console.log(error)
})