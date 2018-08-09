import fs from 'fs';
import Promise from 'bluebird';

import {
  userIds,
} from './loadAssets';

import {
  generateUsername,
  randomProfilePic,
} from './seedHelpers';

const createUser = (userId) => {
  const user = {};
  user.id = userId;
  while (!user.username) {
    user.username = generateUsername();
  }
  user.img = randomProfilePic();
  return `INSERT INTO users (id, username, img) VALUES(${user.id}, "${user.username}", "${user.img}");\n`;
};

const addUsers = () => new Promise((resolve) => {
  resolve(userIds.reduce((acc, user) => acc + createUser(user), 'USE reviews;\n'));
});

export { addUsers };
