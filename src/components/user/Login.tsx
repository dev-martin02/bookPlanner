import { FormEvent } from "react";
import { Account } from "../../interface";
import { loginApi } from "../../api/SupaApi";
import { Link } from "react-router-dom";
import { useBookStore } from "../../store/book.store";

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
    <>
      <h2>This is Login Form</h2>
      <form onSubmit={handleLoginForm}>
        <label>
          Email
          <input type="text" name="email" />
        </label>

        <label>
          Password
          <input type="password" name="password" />
        </label>

        <button type="submit">Submit</button>
      </form>

      <p>Font have an Account yet?</p>
      <Link to={"/signup"}>Sign Up here</Link>
    </>
  );
}
