import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AvatarGroup() {
  return (
    <div className="flex -space-x-3 *:ring *:ring-black">
      <Avatar>
        <AvatarImage src="user1.png" />
      </Avatar>
      <Avatar>
        <AvatarImage src="user2.png" />
      </Avatar>
      <Avatar>
        <AvatarImage src="user3.png" />
      </Avatar>
    </div>
  );
}
