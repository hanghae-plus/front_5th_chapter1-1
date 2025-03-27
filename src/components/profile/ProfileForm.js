import { AuthAPI } from "../../interfaces/auth.interface";
import SubmitBtn from "../common/SubmitBtn";
import { PROFILE_FORM_FIELDS } from "../../consts/form";
import ProfileFormField from "./ProfileFormField";

const ProfileForm = () => {
  const user = AuthAPI.getUser();

  return `
    <form id="profile-form">
      ${PROFILE_FORM_FIELDS.map((config) => ProfileFormField(config, user[config.id])).join("")}
      ${SubmitBtn({ text: "프로필 업데이트" })}
    </form>
  `;
};

export default ProfileForm;
