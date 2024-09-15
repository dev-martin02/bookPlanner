import { FormEvent } from "react";
import { Account } from "../../interface";
import { createNewUser } from "../../api/SupaApi";
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
    <>
      <h1>This is Sign Up Form</h1>
      <form onSubmit={handleSignUpForm}>
        <label>Name</label>
        <input type="text" name="name" required />
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />

        <button>Submit</button>
      </form>
    </>
  );
}
