export interface IServerEnvironment {
	name: string;
	api: string;
	targerOrigin: string;
	serverUrls: string[];
};

export interface IServerEnvironments {
	production: IServerEnvironment;
	dev: IServerEnvironment;
};
