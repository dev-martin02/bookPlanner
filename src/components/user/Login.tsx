import { FormEvent } from "react";
import { Account } from "../../interface";
import { loginApi } from "../../api/SupaApi";
import { Link } from "react-router-dom";
import { useBookStore } from "../../store/book.store";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const { setCurrentUser } = useBookStore();
  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formObj: Account = {
      name: "",
      email: "",
      password: "",
    };

    for (const [key, value] of formData.entries()) {
      formObj[key as keyof Account] = value as string;
    }

    const response = await loginApi(formObj);
    console.log(response);
    setCurrentUser(response);
  };

  return (
    <div className="flex justify-center h-screen items-center bg-gray-100">
      <div className="border-2 border-black p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLoginForm} className="space-y-4">
          <label className="flex flex-col space-y-1">
            <span className="font-medium">Email</span>
            <div className="flex items-center border border-gray-400 rounded-md p-2">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="email"
                className="outline-none w-full"
                placeholder="Enter your email"
              />
            </div>
          </label>

          <label className="flex flex-col space-y-1">
            <span className="font-medium">Password</span>
            <div className="flex items-center border border-gray-400 rounded-md p-2">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                className="outline-none w-full"
                placeholder="Enter your password"
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account yet?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
