import { memo, ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoLocationOutline } from "react-icons/io5";
import { PiShoppingCartLight } from "react-icons/pi";
import SearchBar from "../components/searchbar";
import hero from "../asset/images/home-hero.jpg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import { FaBook } from "react-icons/fa";
import CreateBook from "../pages/auth/createBook";

interface NavItem {
  icon?: ReactNode;
  title: string;
  top: boolean;
}

const data: NavItem[] = [
  { icon: <IoLocationOutline />, title: "Store & Events", top: true },
  { title: "Membership", top: true },
  { title: "Read Blog", top: true },
  { title: "Podcast", top: true },
  { title: "Sweepstakes", top: true },
  { title: "Gift Cards", top: true },
  { title: "Books", top: false },
  { title: "Fiction", top: false },
  { title: "Nonfiction", top: false },
  { title: "eBooks", top: false },
  { title: "Audiobooks", top: false },
  { title: "Teens & YA", top: false },
  { title: "Kids", top: false },
  { title: "Toys & Games", top: false },
  { title: "Stationery & Gifts", top: false },
  { title: "Music & Movies", top: false },
];

// Button Component
interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-[5px] mx-[10px] px-5 py-0.5 text-[12px] font-medium leading-normal tracking-[0.25px] text-[#484848] uppercase whitespace-nowrap border-r border-gray-300 last:border-r-0 hover:underline ${className}`}
  >
    {children}
  </button>
);

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  let navigate = useNavigate();
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const location = useLocation();
  const letHome = location.pathname === "/";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const user = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const [userId, setUserId] = useState(null);

  const checkSessionStorage = () => {
    const userData = sessionStorage.getItem("userData");
    setUserId(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    checkSessionStorage();

    const handleStorageChange = () => {
      checkSessionStorage();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  return (
    <div className="h-[100vh] pt-5">
      <Toaster position="bottom-left" />
      <div>
        <div className="max-w-[1440px] m-auto">
          {/* Top navigation */}
          <div className="flex justify-between font-[sans-serif]">
            <ul className="hidden md:flex item-center justify-between">
              {data
                .filter((d) => d.top)
                .map((d, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center gap-[5px] mx-[10px] py-0.5  text-[12px] font-medium leading-normal tracking-[0.25px] text-[#484848] uppercase whitespace-nowrap hover:underline"
                  >
                    {d.icon} {d.title}
                  </li>
                ))}
            </ul>

            {!userId ? (
              <div className="w-full flex justify-end">
                <Button className="md:px-[0]" onClick={openModal}>
                  Sign up
                </Button>
                <Button className="md:px-[0]" onClick={openLoginModal}>
                  Sign in
                </Button>
              </div>
            ) : (
              <div className="w-full flex justify-end">
                <Button
                  className="md:px-[0]"
                  onClick={() => navigate(`/profile/${user.token.user._id}`)}
                >
                  My Account
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar Section */}
          <div className="flex items-center justify-between py-[15px] px-[30px] md:px-[10px]">
            <Link
              to="/"
              className="font-bold text-[#535353] tracking-wider text-[35px] no-underline hidden md:flex nounderline "
            >
              TK Book Store
            </Link>
            <SearchBar
              placeholder="Search Book and Author"
              onSearch={handleSearch}
            />
            <button onClick={openCreateModal}>
              <FaBook className="h-[90%] w-[40px] bg-[] text-[#3e5962]" />
            </button>
          </div>
          <ul className="hidden md:flex-[0rem] sm:px[0rem] sm-[0rem] flex justify-between px-4 genre-cat">
            {data
              .filter((d) => !d.top)
              .map((d, index) => (
                <li
                  key={index}
                  className="inline-flex items-center gap-[5px] mx-[10px] py-0.5 font-[Poynter] text-[12px] font-bold leading-normal tracking-[0.25px] text-[#000] uppercase whitespace-nowrap last:border-r-0 hover:underline"
                >
                  {d.icon} {d.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {letHome ? (
        <div className="w-full h-auto my-[20px]">
          <figure className="h-[100%] w-[100%]">
            <img className="h-[100%] w-[100%]" src={hero} alt="" />
          </figure>
        </div>
      ) : (
        <figure className="h-auto w-[100%] py-[20px]">
          <img
            className="h-[100%] w-[100%]"
            src="https://dispatch.barnesandnoble.com/content/dam/ccr/global/global-nav-banner/2024/10/31009_GlobalNav_BookOfTheYear_10_25_24.jpg"
            alt=""
          />
        </figure>
      )}

      {children}

      <RegisterPage isModalOpen={isModalOpen} closeModal={closeModal} />
      <LoginPage isModalOpen={isLoginModalOpen} closeModal={closeLoginModal} />
      <CreateBook
        isCreateModalOpen={isCreateModalOpen}
        closeCreateModal={closeCreateModal}
      />
    </div>
  );
}

export default memo(Layout);
