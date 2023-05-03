import { faker } from "@faker-js/faker";
import { mainAxios, delay } from "../utils";
import { User } from "../types";

main();

async function main() {
 let users = await getUsers();
 let updateUsers = await updateUsersPassword(users);
 saveUsers(updateUsers);
}

async function getUsers() {
 return (await mainAxios.get("users")).data;
}

function updateUsersPassword(users: Array<User>) {
 for (let user of users) {
  user.password = faker.internet.password();
  user.permission = faker.helpers.arrayElement(["admin", "user"]);
 }
 return users;
}

async function saveUsers(users: Array<User>) {
 for (let user of users) {
  await mainAxios.patch(`users/${user.id}`, {
   password: user.password,
   permission: user.permission,
  });
  await delay(100);
 }
}
