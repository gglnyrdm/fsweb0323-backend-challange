const userModel = require('../api/Users/users-model');
const db = require('../data/db-config');
const seed = require('../data/seeds/001-users'); 

const newUser = {
  first_name: "Workintech",
  last_name: "Backend",
  password: "1234",
  username: "egitim",
  email: "workin@tech.com"
}

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await seed.seed(db);
});

test('Sanity check', () => {
  expect(process.env.NODE_ENV).toBe('testing');
})

describe('Success Testleri', () => {
  test('create user', async () => {
      const user = await userModel.create(newUser);
      expect(user).toHaveProperty('user_id');
      expect(user.user_id).toBe(4)
  });
});

describe('tests for spesific user', ()=> { 
  let user;
  beforeAll(async ()=>{
      user = await userModel.getById(3);
  })

  test('gets user by id', async ()=> {
      const expectedUser = {user_id: 3, first_name: 'Cem', last_name: "Yılmaz", email: "cem@yilmaz.com", username: "cmylmz", password: "1234", role_id: 2, role_name:"unverified", following_id:null, follower_id:null}
      expect(user).not.toBe(expectedUser);
      expect(user).toMatchObject({user_id: 3, first_name: 'Cem', last_name: "Yılmaz"});
  })

  test('checks property values for spesific user', async ()=> {
      expect(user.first_name).toMatch(/Ce/);  //case sensitive
      expect(user.first_name).not.toMatch(/cE/); //!case sensitive
      expect(user.first_name).toMatch(/cE/i); // /i ignores case sensitivity
  })

})
