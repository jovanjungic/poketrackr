import { useAuthStore } from "../store/authStore";
const MyHeader = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-[#F4E1C1] border-b-4 border-[#8B4A2D] rounded-b-2xl py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-[#8B4A2D] text-2xl font-bold">PokeTrackr</h1>
      <div className="flex gap-4 justify-center items-center">
        <span className="text-[#6B3A1E] text-lg font-medium hidden md:block">
          {user.username}
        </span>
        <button
          className="hover:cursor-pointer bg-[#8B4A2D] text-white px-4 py-2 rounded-lg hover:bg-[#A15D3B]"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default MyHeader;
