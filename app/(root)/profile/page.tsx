import ProfileForm from "./profile-form"
import { getProfile } from "./action";
import { toast } from "sonner";

export default async function ProfilePage() {
  const { success, profile, error } = await getProfile();

  if(!success && error) {
    toast.error(error)
  }

  return (
    <div className="p-6">
      <ProfileForm profile={profile} />
    </div>
  );
}