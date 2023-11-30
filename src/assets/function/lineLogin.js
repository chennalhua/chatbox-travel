import React, { useEffect, useState } from 'react';

// import randomBytes from "randombytes"
import axios from 'axios';
import url from 'url';
import jwtDecode from "jwt-decode";

export default function Login() {
    const state = "123";
    const nonce = "ss";

    const lineLogin = () => {
        let link = 'https://access.line.me/oauth2/v2.1/authorize?';
        link += 'response_type=code';
        link += `&client_id=${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`;
        link += `&redirect_uri=${process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL}`;
        link += `&state=${state}`;
        link += `&nonce=${nonce}`;
        link += '&scope=openid%20profile';
        link += '&bot_prompt=normal';
        window.location.href = link;
    };
    const isLogin = () => {
        var urlParts = url.parse(window.location.href, true);
        var query = urlParts.query;
        if (Object.keys(query).length === 0) {
            lineLogin();
        }
    }

    useEffect(() => {
        // isLogin()
    });

    function encodeSearchParams(obj) {
        const params = []
        Object.keys(obj).forEach((key) => {
            let value = obj[key]
            if (typeof value === 'undefined') {
                value = ''
            }
            params.push([key, encodeURIComponent(value)].join('='))
        })

        return params.join('&')
    }

    const getAccessToken = (callbackURL) => {
        var urlParts = url.parse(callbackURL, true);
        var query = urlParts.query;
        var hasCodeProperty = Object.prototype.hasOwnProperty.call(query, 'code');
        if (hasCodeProperty) {
            const reqBody = {
                grant_type: 'authorization_code',
                code: query.code,
                redirect_uri: `${process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL}`,
                client_id: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`,
                client_secret: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET}`
            };
            const reqConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            axios
                .post(
                    'https://api.line.me/oauth2/v2.1/token',
                    encodeSearchParams(reqBody),
                    reqConfig
                )
                .then((res) => {
                    try {
                        // console.log(res)
                        // console.log(jwtDecode(res.data.access_token))
                        // console.log(jwtDecode(res.data.id_token))
                        const decodedIdToken = jwtDecode(res.data.id_token, `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET}`, {
                            algorithms: ['HS256'],
                            audience: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`.toString(),
                            issuer: 'https://access.line.me',
                            // nonce: `${newId}`
                        });
                        console.log(decodedIdToken)
                    } catch (err) {
                        // If token is invalid.
                        console.log(err);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (query.error) {
            console.log('登入失敗')
        }
    };
    useEffect(() => {
        getAccessToken(window.location.href)
    }, []);

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={(e) => { isLogin() }}>
                line 登入
            </button>
        </div>
    );
};