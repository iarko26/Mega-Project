
import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
function Settings() {
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-900">
         Edit Profile
      </h1>
      <ChangeProfilePicture />
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount  />  
    </div>
  )
}

export default Settings
