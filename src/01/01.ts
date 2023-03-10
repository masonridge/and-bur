export const func01 = () => {};
function test(date: Date) {}
// 1.  when any
let val: any = 1;

// can do all operations
val++;
val.toUpperCase();
val.map(val);
val.foobar = 2;
test(val);

// 2. when unknown
let uVal: unknown = 1;

// narrow down to the type
if (typeof uVal === 'number') {
  uVal++;
}
if (typeof uVal === 'string') {
  uVal.toUpperCase();
}
if (Array.isArray(uVal)) {
  uVal.map(val);
}
let uVal1: { foobar: number } = {
  foobar: 1,
};
if (
  uVal1 &&
  typeof uVal1 === 'object' &&
  'foobar' in uVal1 &&
  typeof uVal1.foobar === 'number'
) {
  uVal1.foobar = 2;
}
test(uVal);

type A = number & string;
type B = boolean & null;

type User = 'std' | 'admin';

function login(u: User) {
  switch (u) {
    case 'std':
      return true;
    case 'admin':
      return true;
    default:
      const __unreachable: never = u;
      throw 'wrong user type';
  }
}
