import ButtonPost from "../ui/ButtonPost";
import Notification from "./Notification";
import RecomFoll from "./RecomFoll";

const Interaction = ({
  username,
  profileImage,
}: {
  username: string;
  profileImage: string;
}) => {



  return (
    <div className="sticky top-0 right-0 flex flex-col gap-6">
      <Notification/>
      <h1 className="text-[24px] font-medium">Created</h1>
      <ButtonPost profileImage={profileImage} username={username} />
      <RecomFoll />
        
    </div>
  );
};

export default Interaction;
