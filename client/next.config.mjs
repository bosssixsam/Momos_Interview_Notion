/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        })

        return config
    },
    reactStrictMode: false

    // async rewrites() {
    //     return [
    //         {
    //             source: '/gioi-thieu',
    //             destination: '/about-us'
    //         },
    //         {
    //             source: '/gio-hang',
    //             destination: '/cart'
    //         },
    //         {
    //             source: '/san-pham',
    //             destination: '/preview-product'
    //         },
    //         {
    //             source: '/kiem-tra-don-hang',
    //             destination: '/check-order'
    //         },
    //         {
    //             source: '/chi-tiet/:slug',
    //             destination: '/product-detail/:slug'
    //         }
    //     ]
    // }
}

export default nextConfig
