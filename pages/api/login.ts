import { SafeAny } from '@/models/common';
import Cookies from 'cookies';
import type { ProxyResCallback } from 'http-proxy';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

const proxyServer = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SafeAny>,
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Not found!' });
  }

  req.headers.cookie = '';

  proxyServer.web(req, res, {
    target: process.env.NEXT_PUBLIC_API_ENDPOINT,
    changeOrigin: true,
    selfHandleResponse: true,
  });

  return new Promise((resolve) => {
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      const body: Uint8Array[] = [];

      proxyRes.on('data', (chunk) => {
        body.push(chunk);
      });

      proxyRes.on('end', () => {
        try {
          const {
            accessToken = '18971ae0-abdb-5310-b6b1-586a0805ad9e',
            expiredAt = new Date(2022, 1, 31).getTime(),
          } = {};

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          });

          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          });

          (res as NextApiResponse)
            .status(200)
            .json({ message: 'You have login successfully!' });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: 'Something went wrong.' });
        }
      });

      resolve(true);
    };

    proxyServer.once('proxyRes', handleLoginResponse);
  });
}
