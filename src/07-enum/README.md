# Narrow the type

1. // typeof works only for prim types
   // for non prim it returns object
2. identify based on in property

```js
function login(user: StandardUser | AdminUser) {
  // if( user.isAdmin) // js
  if ('isAdmin' in user) {
    user;
    return;
  }
  user;
}
```

3. force (to bubble up)

```js
const stdusers1 = users.filter((user): user is StandardUser => {
  const x = !('isAdmin' in user); // or return !('isAdmin' in user)
  if (x) {
    user; //hover and this will be a std user, but will bubble up to StandardUser
  }
  return x;

  // javascript way of doing
  // return !(user as AdminUser).isAdmin
});


```

4. exhaustive switch

```js
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
      break;
  }
}
```
