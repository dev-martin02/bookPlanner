import { supabase } from "../database/Supabase";
import { Account } from "../interface";

export async function loginApi(userObj: Account) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userObj.email,
    password: userObj.password,
  });
  if (error) return error;

  return data.user;
}

export async function createNewUser(userObj: Account) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: userObj.email,
    password: userObj.password,
  });
  if (signUpError) {
    return signUpError;
  }

  if (signUpData.user) {
    const profileData = {
      user_id: signUpData.user.id,
      name: userObj.name,
      email: userObj.email,
    };

    const { error: profileDataErr } = await createProfile(profileData);
    if (profileDataErr) return profileDataErr;
    return { user: signUpData.user };
  }
}

async function createProfile(profileData: {
  user_id: string;
  name: string;
  email: string;
}) {
  const { error } = await supabase.from("profiles").insert([profileData]);

  return { error };
}
