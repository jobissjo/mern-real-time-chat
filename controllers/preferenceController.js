import { fetchUserPreference, updateUserProfilePreference } from "../services/preferenceService.js";

const getUserPreference = async (req, res)=> {
    try {
        // Fetch user preference data from database
        // or any other data source
        const preferenceData = await fetchUserPreference(req.body.userId);
        res.status(200).send({ message: "User preference fetched successfully", data: preferenceData });
    }
    catch (error) {
        // Handle error
        res.status(400).send({ message: error.message });
    }
}

const updatedUserPreference = async (req, res)=> {
    try {
        // Update user preference data in the database
        // or any other data source
        await updateUserProfilePreference(req.body);
        res.status(200).send({ message: "User preference updated successfully" });
    }
    catch (error) {
        // Handle error
        res.status(400).send({ message: error.message });
    }

}

export {getUserPreference, updatedUserPreference};