import type { NextConfig } from "next";
import { adminUrl, loginUrl } from './lib/utils';
const nextConfig: NextConfig = {
  /* config options here */

    async rewrites() {
  
     return {
      beforeFiles: [
        {
          source: '/admin/:path*',
          destination: '/not-found',
        },
        {
          source: '/login/:path*',
          destination: '/not-found',
        },
      ],
      
      afterFiles: [
        {
          source: `/${adminUrl}/:path*`,
          destination: '/admin/:path*',
        },
        {
          source: `/${loginUrl}`,
          destination: '/login',
        },
      ],

      fallback: [
       
      ],
    }
  },

};

export default nextConfig;
