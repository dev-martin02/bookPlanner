import { supabase } from "../database/Supabase";
import { Account, Book, Chapter } from "../interface";

// Get User
async function getUserProfile(id: string) {
  const { data, error } = await supabase.from("profile").select();
  if (error) return error;

  const getUser = data.find((user) => user.id === id);
  if (!getUser) return "User Not found";
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
      id: signUpData.user.id,
      name: userObj.name,
      email: userObj.email,
    };

    const { error: profileDataErr } = await createProfile(profileData);
    if (profileDataErr) return profileDataErr;
    return { user: signUpData.user };
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
  console.log(bookChapter);
  return bookChapter;
}
