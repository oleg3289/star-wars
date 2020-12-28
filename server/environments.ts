import { IServerEnvironments, IServerEnvironment } from "./interfaces/environment";

module.exports = <IServerEnvironments> {
    production: <IServerEnvironment> {
        name: 'production',
        api: `https://oleg3289.github.io`,
        targerOrigin: `https://oleg3289.github.io`,
        checkSubdomain: true,
        serverUrls: [
            `oleg3289.github.io`
        ]
    },
    dev: <IServerEnvironment> {
        name: 'dev',
        api: `http://localhost:4000`,
        targerOrigin: `http://localhost:4200`,
        serverUrls: [
            `http://localhost:4000`
        ]
    }
};
