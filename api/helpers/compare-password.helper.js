import * as bcrypt from "bcrypt";

export async function ComparePassword(password, savedPassword) {
  return await bcrypt.compare(password, savedPassword);
}
