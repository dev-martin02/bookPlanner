import { FormEvent } from "react";
import { Account } from "../../interface";
import { createNewUser } from "../../api/SupaApi";
import { Mail, Lock, User } from "lucide-react";

export default function SignUp() {
  const handleSignUpForm = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const userAccount: Account = {
      name: "",
      email: "",
      password: "",
    };

    for (const values of formData.entries()) {
      //@ts-ignore
      userAccount[values[0]] = values[1];
    }

    const x = await createNewUser(userAccount);
    console.log(x);
  };

  return (
    <div className="flex justify-center h-screen items-center bg-gray-100">
      <div className="border-2 border-black p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignUpForm} className="space-y-4">
          <label className="flex flex-col space-y-1">
            <span className="font-medium">Name</span>
            <div className="flex items-center border border-gray-400 rounded-md p-2">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                className="outline-none w-full"
                placeholder="Enter your name"
                required
              />
            </div>
          </label>

          <label className="flex flex-col space-y-1">
            <span className="font-medium">Email</span>
            <div className="flex items-center border border-gray-400 rounded-md p-2">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                className="outline-none w-full"
                placeholder="Enter your email"
                required
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
                required
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
      </div>
    </div>
  );
}
