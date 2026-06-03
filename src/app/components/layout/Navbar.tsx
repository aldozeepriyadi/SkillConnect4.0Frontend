import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, Bell, User, LogOut, ChevronDown, Building2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Logo } from "../Logo";

export function Navbar() {
  const { state, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isCompany = state.loginType === "company";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = state.isLoggedIn
    ? isCompany
      ? [
          { label: "Dashboard", path: "/company/dashboard" },
        ]
      : [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Profil Saya", path: "/profile" },
          { label: "Rekomendasi Kerja", path: "/jobs" },
          { label: "Skill Gap", path: "/skillgap" },
          { label: "Pelatihan", path: "/training" },
        ]
    : [
        { label: "Beranda", path: "/" },
        { label: "Fitur", path: "/#features" },
        { label: "Cara Kerja", path: "/#how-it-works" },
      ];

  const displayName = isCompany ? state.company?.companyName : state.user?.name;
  const displayInitial = isCompany ? (state.company?.logo || "P") : (state.user?.name?.charAt(0) || "U");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size="md" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              SkillConnect4.0
            </span>
            {isCompany && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium border border-blue-200">
                Perusahaan
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? isCompany ? "bg-blue-50 text-blue-700 font-medium" : "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {state.isLoggedIn ? (
              <>
                <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      isCompany ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-indigo-500 to-purple-500"
                    }`}>
                      {displayInitial}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{displayName}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-2.5 border-b border-gray-50">
                        <p className="text-xs text-gray-400">{isCompany ? "Portal Perusahaan" : "Pencari Kerja"}</p>
                        <p className="text-sm font-medium text-gray-800">{displayName}</p>
                      </div>
                      {isCompany ? (
                        <Link
                          to="/company/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Building2 className="w-4 h-4" />
                          Dashboard Perusahaan
                        </Link>
                      ) : (
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Profil Saya
                        </Link>
                      )}
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2.5 rounded-lg text-sm ${
                isActive(link.path)
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {state.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link
                to="/login"
                className="flex-1 text-center px-4 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-4 py-2.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}