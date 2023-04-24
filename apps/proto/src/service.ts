const PGMAP: { [key: string]: { dev: string; prod: string } } = {
  "mwp.m1": {
    dev: "127.0.0.1:3002",
    prod: "mwp-rpc-ghri5ivvvq-df.a.run.app:443",
  },
  "mwp.m2": {
    dev: "127.0.0.1:3003",
    prod: "mwp-grpc-2-ghri5ivvvq-df.a.run.app:443",
  },
};

type IEvn = "dev" | "prod";

export const getServiceByPGname = async (
  packageName: string
): Promise<string | undefined> => {
  if (PGMAP[packageName] === undefined) {
    return undefined;
  }
  const env = (process.env.NODE_ENV as IEvn) || "dev";

  return PGMAP[packageName][env] || undefined;
};
