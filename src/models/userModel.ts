import user from "../Schemas/user";
import IUser from "../interfaces/user";

const getUserByUsername = async (username: string): Promise<IUser | null> => {
  const data = await user.findOne(
    {
      username,
    },
    { _id: 0 }
  );
  return data;
};

const createNewUser = async (data: { username: string; password: string }) => {
  const userData = await user.create(data);

  return userData;
};
export { getUserByUsername, createNewUser };
