import { useAuthStore } from "../store/authStore";
const MyHeader = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 border-b-4 border-gray-700 rounded-b-2xl py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-gray-100 text-2xl font-bold">PokeTrackr</h1>
      <div className="flex gap-4 justify-center items-center">
        <span className="text-gray-300 text-lg font-medium hidden md:block">
          {user.username}
        </span>
        <button
          className="hover:cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default MyHeader;
