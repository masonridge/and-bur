enum PostState {
  Draft,
  Scheduled,
  Published,
}
enum PostStateStr {
  Draft = 'DRAFT',
  Scheduled = 'SCHEDULED',
  Published = 'PUBLISHED',
}
const PostStateObj = {
  Draft: 'DRAFT',
  Scheduled: 'SCHEDULED',
  Published: 'PUBLISHED',
} as const;

enum FilePerm {
  None,
  Read,
  Write,
  Execute,
}

type PostStateType1 = typeof PostStateObj;
type PostStateType2 = keyof typeof PostStateObj;
type PostStateType = typeof PostStateObj[keyof typeof PostStateObj];

export const func07 = () => {
  const x: PostState = PostState.Draft;
  console.log(x);
  const t = canAccessFile(FilePerm.None, FilePerm.Read);
  console.log(t);
  const m = getFilePermission(5);
  console.log(m);
  const x1: PostStateStr = PostStateStr.Draft;
  console.log(x1);
  // const x2: PostStateStr = 'DRAFT';
  // console.log(x2);
  const m1 = PostStateObj.Draft;
};

const canAccessFile = (userPerm: FilePerm, requiredPerm: FilePerm) => {
  return userPerm >= requiredPerm;
};
const getFilePermission = (p: FilePerm): string => {
  return 'yes';
};
