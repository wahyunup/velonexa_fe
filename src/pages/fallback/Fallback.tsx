import AppLayout from "../layout/AppLayout";

const Fallback = () => {
  return (
    <AppLayout classname="flex justify-between">
    <div className="flex flex-col gap-5 justify-center items-center h-svh">
      <p className="text-3xl">Oops! Kamu nyasar 🤔</p>
      <p className="text-[17px]">Halaman yang kamu cari nggak ada di sini / dalam pengembangan.</p>
    </div>
    <div></div>
    </AppLayout>
  );
};

export default Fallback;
