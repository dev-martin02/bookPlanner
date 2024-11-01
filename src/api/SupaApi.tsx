import { supabase } from "../database/Supabase";
import { Account, Book, Chapter } from "../interface";

interface Profile {
  id: string;
  name: string;
  email: string;
}

// Get User
async function getUserProfile(id: string) {
  const { data, error } = await supabase.from("profile").select();
  if (error) return error;

  const getUser = data.find((user) => user.id === id);
  if (!getUser) throw "User Not found";
  return getUser;
}

export async function loginApi(userObj: Account) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userObj.email,
    password: userObj.password,
  });
  if (error) return error;
  const user = await getUserProfile(data.user.id);
  return user;
}

// New User
async function createProfile(profileData: {
  id: string;
  name: string;
  email: string;
}) {
  const { error } = await supabase.from("profile").insert([profileData]);

  return { error };
}
async function deleteAuthUser() {
  const { error } = await supabase.auth.admin.deleteUser(
    (await supabase.auth.getUser()).data.user?.id || ""
  );
  if (error) {
    console.error("Failed to delete auth user:", error);
    // We log but don't throw here to avoid masking the original error
  }
}

export async function createNewUser(userObj: Account) {
  let authUserCreated = false;

  try {
    // 1. Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: userObj.email,
        password: userObj.password,
      }
    );

    if (signUpError) {
      throw new Error(`Signup failed: ${signUpError.message}`);
    }

    if (!signUpData.user) {
      throw new Error("User creation failed: No user data returned");
    }

    authUserCreated = true;

    // 2. Create the profile
    const profileData: Profile = {
      id: signUpData.user.id,
      name: userObj.name,
      email: userObj.email,
    };

    const { error: profileError } = await createProfile(profileData);

    if (profileError) {
      throw new Error(`Profile creation failed: ${profileError.message}`);
    }

    return { user: signUpData.user };
  } catch (error) {
    // If profile creation failed but auth user was created,
    // attempt to clean up the auth user
    if (authUserCreated) {
      await deleteAuthUser();
    }
    throw error;
  }
}

// Book interaction
export async function addBookToDB(book: Book) {
  const { error } = await supabase.from("books").insert(book);
  if (error) throw error;
  return "Book was succefully added it!";
}

export async function getUserBook(id: string) {
  const { data, error } = await supabase.from("books").select();
  if (error) return error;

  const userData = data.filter((response) => response.userId === id);
  if (!userData) throw "There is not book";
  return userData;
}

// CRUD chapters
export async function addChapterToDB(chapter: Chapter) {
  const { error } = await supabase.from("chapters").insert(chapter);

  if (error) throw error;
  return "New Chapter was added it!";
}

export async function getChapters(id: number) {
  const { data, error } = await supabase.from("chapters").select();
  if (error) throw error;

  const bookChapter = data.filter((response) => response.bookId === id);
  if (!bookChapter) return { message: "There are no chapters for this book" };
  return bookChapter;
}
