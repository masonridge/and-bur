class Automobile {
  constructor(private readonly hp: number) {}
  get horsepower(): string {
    return `${this.hp}HP`;
  }

  @logTime
  async run() {
    // throw new Error('Ring out');
    console.log('moving');
    await delay(2000);
    console.log('moved');
    // console.log('vroom');
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logTime(target: any, key: any, desc: PropertyDescriptor) {
  const method = desc.value;
  desc.value = async function () {
    const start = Date.now();
    await method();
    console.log(`Time: ${Date.now() - start}`);
  };
}
function logThis(target: any, key: string, desc: PropertyDescriptor) {
  console.log(`Target: ${JSON.stringify(target)}`);
  console.log(`Key: ${key}`);
  console.log(`Desc: ${JSON.stringify(desc)}`);

  const method = desc.value;
  desc.value = function () {
    try {
      method();
    } catch (e) {
      if (e instanceof Error) {
        console.log(`Error thrown123: ${e.message}`);
      } else {
        console.log(`${e}`);
      }
    }
  };
}

// var __decorate = function (decorators, target, key, desc) {
//   var desc = Object.getOwnPropertyDescriptor(target, key);

//   for (const decorator of decorators) {
//     decorator(target, key, desc);
//   }
// };
export const func04 = async () => {
  // logThis(Automobile.prototype, 'run');
  const l = new Automobile(10);
  await l.run();
  await l.run();
  await l.run();
};
