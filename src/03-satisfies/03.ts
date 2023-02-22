type Connection = {};

declare function createConn(
  host: string,
  port: string,
  reconnect: boolean,
  poolSize: number
): Connection;

type Config = {
  host: string;
  port: string | number;
  tryConnect: boolean | (() => boolean);
  poolSize?: number;
};

const cfg = {
  host: 't',
  port: '33',
  tryConnect: () => true,
} as const satisfies Config;

function start() {
  let { host, port, tryConnect } = cfg;
  createConn(host, port, tryConnect(), 10);
}

export const func03 = () => {};
