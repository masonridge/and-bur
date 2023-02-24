export const func06 = () => {
  const stdUsers = users.filter((user) => !('isAdmin' in user));
  console.log(stdUsers);
};

// typeof works only for prim types
// for non prim it returns object
function toNumber(val: number | string): number {
  if (typeof val === 'string') return parseInt(val, 10);
  return val;
}

// to narrow the type of objects we have to use some of the js or ts tools
// LIKE in object

declare function getStdToken(name: string, ttl: number): string;
declare function getAdminToken(name: string, accessLevel: string): string;

type StandardUser = {
  name: string;
  sessionTTL: number;
};
type AdminUser = StandardUser & {
  isAdmin: true;
  access: 'read-admin' | 'write-admin';
};

//1.  USING in
function login(user: StandardUser | AdminUser) {
  // if( user.isAdmin) // js
  if ('isAdmin' in user) {
    user;
    return;
  }
  user;
}

//2. USING type predicates
type User = StandardUser | AdminUser;
const users: User[] = [
  { name: 'ONE', sessionTTL: 3 },
  { name: 'TWO', sessionTTL: Infinity, isAdmin: true, access: 'read-admin' },
  { name: 'HEN', sessionTTL: Infinity, isAdmin: true, access: 'write-admin' },
  { name: 'OWL', sessionTTL: 43 },
];
// using in keyword negate admin users to get std users
// const stdUsers = users.filter((user) => !('isAdmin' in user));
//                                         ^ PREDICATE

// convert this to a function
const stdusers = users.filter((user) => {
  const x = !('isAdmin' in user);
  if (x) {
    user; //hover and this will be a std user, but will NOT bubble up to stdusers (it is still of type Users)
  }
  user;
});

// we can force it
const stdusers1 = users.filter((user): user is StandardUser => {
  const x = !('isAdmin' in user); // or return !('isAdmin' in user)
  if (x) {
    user; //hover and this will be a std user, but will bubble up to StandardUser
  }
  return x;

  // javascript way of doing
  // return !(user as AdminUser).isAdmin
});

// discriminated unions
type StandardUser2 = {
  type: 'standard';
  name: string;
  sessionTTL: number;
};
type AdminUser2 = {
  type: 'admin';
  name: string;
  access: 'read-admin' | 'write-admin';
};
type ProspectUser = {
  type: 'prospect';
  name: string;
  access: 'read-admin' | 'write-admin';
};

type User2 = StandardUser2 | AdminUser2 | ProspectUser;
// pattern called exhaustive switch
function login2(u: User2) {
  switch (u.type) {
    case 'standard':
      return getStdToken(u.name, u.sessionTTL);
    case 'admin':
      return getAdminToken(u.name, u.access);
    case 'prospect':
      return getAdminToken(u.name, u.access);

    default:
      const notPossible: never = u;
      throw new Error('Unexpected user type');
  }
}
