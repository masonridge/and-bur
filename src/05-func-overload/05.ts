export const func05 = () => {
  const w1 = updateWidget('name', {
    name: 'my',
    env: 'dev',
    createdAt: new Date(),
  });
};

function len(x: any[]): number;
function len(x: string): number;
function len(x: string | any[]): number {
  return x.length;
}

function maybe<T>(fnOrP: () => T): T | undefined;
function maybe<T>(fnOrP: Promise<T>): Promise<T | undefined>;
function maybe<T>(
  fnOrP: (() => T) | Promise<T>
): T | undefined | Promise<T | undefined> {
  if (typeof fnOrP === 'function') {
    try {
      return fnOrP();
    } catch (error) {
      return undefined;
    }
  }
  return fnOrP.catch(() => undefined);
}

const x = maybe(() => 'hello');

(async function () {
  const y = await maybe(Promise.resolve('types'));
});
(async function () {
  const x = await maybe(() => 'hello');
});

type Widget = {
  name: string;
  env: 'dev' | 'prod';
  createdAt: Date;
};

const isString = (input: any): input is string => typeof input === 'string';
const isDate = (input: any): input is Date =>
  Object.prototype.toString.call(input) === '[object Date]';
const isWidget = (w: any): w is Widget => w satisfies Widget;

// OR
const isWidget1 = (w: any): w is Widget =>
  typeof w.name === 'string' &&
  ['dev', 'prod'].includes(w.env) &&
  isDate(w.createdAt);

function updateWidget<K extends keyof Widget>(
  updateOrKey: Partial<Widget> | K,
  widgetOrValue: Widget | Widget[K],
  widget?: Widget
): Widget {
  if (isString(updateOrKey)) {
    if (!isWidget(widgetOrValue)) {
      if (isWidget(widget)) {
        return {
          ...widget,
          [updateOrKey]: widgetOrValue,
        };
      }
      throw 'Wrong args';
    }
    throw 'Wrong args';
  }

  if (isString(widgetOrValue) || isDate(widgetOrValue)) {
    throw 'Wrong args';
  }
  return {
    ...widgetOrValue,
    ...updateOrKey,
  };
}
