import projectSettings from "../../constants/projectSettings";
const {
    baseUrl
} = projectSettings
const apiList = {
    registerUser                  : `${baseUrl}/api/v1/authentication/register`,
    loginUserApi                     : `${baseUrl}/api/v1/authentication/login`,
}
export default apiList