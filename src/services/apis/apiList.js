import projectSettings from "../../constants/projectSettings";
const { baseUrl } = projectSettings;
const apiList = {
  registerUser: `${baseUrl}/api/v1/authentication/register`,
  loginUserApi: `${baseUrl}/api/v1/authentication/login`,
  getAllUsersApi: `${baseUrl}/api/v1/users`,
  updateUserDetailsApi: `${baseUrl}/api/v1/users/update`,
  getUserDetailsApi: `${baseUrl}/api/v1/users/`,
  deleteUserApi:`${baseUrl}/api/v1/users/`,
  synergyGetAllApi:`${baseUrl}/api/v1/synergistic/getall`,
  synergyCreateApi: `${baseUrl}/api/v1/synergistic/create`,
  synergyCommonApi: `${baseUrl}/api/v1/synergistic/`,
  synergyUpdateApi: `${baseUrl}/api/v1/synergistic/update/`,
  journalGetAllApi:`${baseUrl}/api/v1/journal/getall/`,
  journalCreateApi: `${baseUrl}/api/v1/journal/create`,
  journalCommonApi: `${baseUrl}/api/v1/journal/`,
  journalFeedGetAllApi: `${baseUrl}/api/v1/journal/feed/getall`,
  favoritesGetAllApi: `${baseUrl}/api/v1/favorites/getall`,
  getAboutUs:`${baseUrl}/api/v1/aboutus/getall`,
  updateAboutUs: `${baseUrl}/api/v1/aboutus/update/`,
  getHowItWorks:`${baseUrl}/api/v1/howitworks/getall`,
  updateHowItWorks: `${baseUrl}/api/v1/howitworks/update/`,
  workoutGetAll:`${baseUrl}/api/v1/workout/getall/`,
  updateWorkOut:`${baseUrl}/api/v1/workout/update/`,
  commonWorkOut: `${baseUrl}/api/v1/workout/`,
  changeWorkout: `${baseUrl}/api/v1/workout/change/`,
  createWorkout: `${baseUrl}/api/v1/workout/create`,
  paypalBuyBook: `${baseUrl}/api/v1/paypal/success`,
  shipGetAll:`${baseUrl}/api/v1/ship/getall`,


};
export default apiList;
