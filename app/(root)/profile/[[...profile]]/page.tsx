import { UserProfile } from "@clerk/nextjs";

export default async function ProfilePage() {
  return (
    <div className="p-6">
      <UserProfile />
    </div>
  );
}