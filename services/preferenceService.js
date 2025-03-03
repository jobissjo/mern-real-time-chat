import Preference from "../models/preference.js"

export const fetchUserPreference = async (userId) => {
    let preference = await Preference.findOne({user: userId});

    if(!preference){
        preference = await Preference.create({user:userId})
    }
    return preference;

}

export const updateUserProfilePreference = async (data) => {
    let preference = await fetchUserPreference(data.userId);
    Object.assign(preference, data)
    await preference.save();
    return preference;
}

