/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const defaultRoles = [
  {role_id:1, role_name:"verified"},
  {role_id:2, role_name:"unverified"}
];

const defaultUsers = [
  {user_id:1, username:"glnyrdm", email:"gln@gln.com", first_name:"Gülin", last_name:"Yardımoğlu",role_id:1, password:"1234"},
  {user_id:2, username:"segdi", email:"segdi@segdi.com", first_name:"Segah", last_name:"Durak",role_id:1, password:"1234"},
  {user_id:3, username:"cmylmz", email:"cem@yilmaz.com", first_name:"Cem", last_name:"Yılmaz",role_id:2, password:"1234"}
];

const defaultTweetType = [
  {type_id:1, type_name: "tweet"},
  {type_id:2, type_name: "reteweet"}
];

const defaultTweets = [
  {tweet_id:1, content:"o zaman dans, renk...", user_id:2, type_id:1},
  {tweet_id:2, content:"bu twitter çok bozdu", user_id:2, type_id:1},
  {tweet_id:3, content:"o zaman dans, renk...", user_id:1, type_id:2},
  {tweet_id:4, content:"Uzaylılar tarafından kaçırıldım...Evet tarafından!!!", user_id:3, type_id:1}
];

const defaultFollows = [
  {follow_id:1, following_id:1, follower_id:2},
  {follow_id:2, following_id:2, follower_id:1},
  {follow_id:3, following_id:1, follower_id:3}
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Follows').truncate();
  await knex('Tweets').truncate();
  await knex('Tweet_type').truncate();
  await knex('Users').truncate();
  await knex('Roles').truncate();

  await knex('Roles').insert(defaultRoles);
  await knex('Users').insert(defaultUsers);
  await knex('Tweet_type').insert(defaultTweetType);
  await knex('Tweets').insert(defaultTweets);
  await knex('Follows').insert(defaultFollows);
};
