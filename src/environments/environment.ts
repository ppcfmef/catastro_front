// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const host = 'https://813a-161-132-234-232.ngrok.io/';

export const environment = {
    production: false,
    url: host,
    apiUrl: host + 'api/v1',
    captcha: '6LeHBK0bAAAAAOQVTvBOWhfb08cQfUpFoSE3FsmP'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
