import { UserProfile } from "@clerk/nextjs";

export default async function ProfilePage() {
  return (
    <div className="p-4 sm:p-6">
      <UserProfile />
    </div>
  );
}