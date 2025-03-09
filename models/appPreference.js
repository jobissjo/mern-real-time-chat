import mongoose from 'mongoose';

const AppPreferenceSchema = mongoose.Schema({
    themeDarkColor: {
        type: String,
        required: false
    },
    themeLightColor: {
        type: String,
        required: false
    },
    appLogo: {
        type: String,
        required: false
    },
    appName: {
        type: String,
        required: false
    },
    successBtnColor: {
        type: String,
        required: false
    },
    dangerBtnColor: {
        type: String,
        required: false
    }

})

export default mongoose.model('AppPreference', AppPreferenceSchema)