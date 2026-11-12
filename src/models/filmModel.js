import mongoose from "mongoose";

//  Schema ---> esquema que valida los datos de cada propiedad
const filmSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: {type: Number, required: true,},
    genre: {type: String, default: "generica"},
}, {
    versionKey: false
})

//  Model ---> me permite utilizar los metodos de MongoDbs
const Film = mongoose.model("FIlm", filmSchema)

export { Film }