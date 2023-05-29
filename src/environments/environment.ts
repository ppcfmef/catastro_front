// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const host = 'https://catastro-fiscal.codtree.com/';

export const environment = {
    production: false,
    url: host,
    apiUrl: host + 'api/v1',
    portalUrl: 'https://ws.mineco.gob.pe/portaldf',
    customViewerUrl: 'https://danielgis.github.io/visorfiscal',
    mediaUrl: host + 'media',
    exportUrl: host + 'export',
    captcha: '6LcBOVAhAAAAAO9zd3JZ6EnXUI2YJW8xfxuSF5Sv',
    defaultUbigeo: '150101'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
