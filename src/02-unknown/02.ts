type Member = {
  id: number;
  name: string;
};

type Team = {
  name: string;
  members: Array<Member>;
  currentMember: Member;
};

function mustFind<T>(arr: Array<T>, predicate: (t: T) => boolean): T {
  const item = arr.find(predicate);
  if (!item) throw new Error('Item not found');
  return item;
}
function getTeamByMemberId(id: number) {
  const members: Array<Member> = [];
  const member = mustFind(members, (m) => m.id == id);
  // const member = members.find((item) => item.id === id);
  return {
    name: 'my-team',
    members,
    // currentMember: member,
    get currentMember() {
      const m = members.find((item) => item.id === id);
      if (m) return m;
      throw new Error();
    },
  };
}

export const func02 = () => {};
