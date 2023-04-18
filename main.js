/* eslint-disable no-prototype-builtins, new-cap */

const CryptoJS = require('crypto-js');

const gotomApiUrls = [
    'gotom.io/app-api/',
    'gotom.localhost:8080/app-api/',
];

function prepareRequestForGotomCall(req){
    const provider = 'gotom_app_api';

    const contentType = req.getHeader('content-type') ?? req.getHeader('accept') ?? 'application/json'
    req.setHeader('Content-Type', contentType);

    const now = (new Date()).toISOString();
    req.setHeader('Date', now);
    let url = new URL(req.getUrl());
    const re1 = new RegExp(".*" + url.hostname + ':' +  url.port, 'i');
    const re2 = new RegExp(".*" + url.hostname, 'i');

    let urlPath = req.getUrl()
        .replace(re1, '')
        .replace(re2, '')
    ;

    const isGraphApi = urlPath.includes('app-api/custom-report-export')
    || urlPath.includes('app-api/graph-export');
    let user = req.getEnvironmentVariable('gotom_api_user');
    let secret = req.getEnvironmentVariable('gotom_api_secret');

    if(isGraphApi && req.getEnvironmentVariable('graph_export_gotom_api_user')){ // we have some special demo users for graph api calls in demo
        user = req.getEnvironmentVariable('graph_export_gotom_api_user');
        secret = req.getEnvironmentVariable('graph_export_gotom_api_secret');
    }
    const digestParts = [
        req.getMethod(),
        CryptoJS.MD5(req.getBodyText()).toString(),
        contentType,
        now,
        '', // for custom headers?
        urlPath,

    ];

    const signature = provider + ' ' + user + ':' + CryptoJS.HmacSHA1(digestParts.join('\n'), secret).toString(CryptoJS.enc.Base64)

    req.setHeader('Authorization', signature);

}


// A request hook will be run before sending the request to API, but after everything else is finalized
module.exports.requestHooks = [
    (context) => {
        if (context === null || context === undefined) {
            console.log('Gotom: Invalid context');
            return;
        }

        if (
            !context.hasOwnProperty('request') ||
            context['request'] === null ||
            context['request'] === undefined ||
            context['request'].constructor.name != 'Object'
        ) {
            console.log('Gotom: Invalid request');
            return;
        }
        const req = context.request;
        window.gotomReq = context.request; //for debugging what type this is
        // Validate URL
        if (
            !req.hasOwnProperty('getUrl') ||
            req['getUrl'] == null ||
            req['getUrl'].constructor.name != 'Function' ||
            !gotomApiUrls.some((gotomUrls) => req.getUrl().includes(gotomUrls))
        ) {
            console.debug('Not a GoTom API URL');
            return;
        }

        const key = req.getEnvironmentVariable('gotom_api_secret');
        if (key == null) {
            console.log(
                'Could not find environment variable "gotom_api_secret". Cannot sign message'
            );
            throw new Error(
                "Message should be signed, but cannot find 'gotom_api_secret' environment variable."
            );
        }

        if (req.hasParameter('signature')) {
            throw new Error(
                'This message should be signed, but signature parameter is already filled in!'
            );
        }

        console.debug(
            'Looks like a signed Gotom request.'
        );


        prepareRequestForGotomCall(req);

        console.debug('Done signing');
    }
];