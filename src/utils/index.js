import axios from "axios";

async function getProfile() {
    try {
        let result = await axios.get('/api/profile');
        if (result) {
            return JSON.parse(result.data);
        }
        
        throw new Error("No profile")
    } catch (err) {
        console.error("Getting the profile failed", err);
    }
}

async function getSkill() {
    try {
        let result = await axios.get("/api/skill");
        if (result) {
            return JSON.parse(result.data);
        }
    } catch (err) {
        console.error("Getting the skill failed", err);
    }
}

async function getEducation() {
    try {
        let result = await axios.get("api/education");
        if (result) {
            return JSON.parse(result.data);
        }
    } catch (err) {
        console.error("Getting the education failed", error);
    }
}

async function getCareer() {
    try {
        let result = await axios.get("api/career");
        if (result) {
            return JSON.parse(result.data);
        }
    } catch (err) {
        console.error("Geeting the career failed", err);
    }
}

export {
    getProfile,
    getSkill,
    getEducation,
    getCareer
}