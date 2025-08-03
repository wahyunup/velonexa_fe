const UserDetailFeed = ({ image }: { image: string }) => {
  return (
    <>
      <img src={image} className="object-cover h-full w-full" alt="" />
    </>
  );
};

export default UserDetailFeed;
