import Head from "next/head"

const Header = () => {
    return <Head>
        <title>{meta_title}</title>
        <meta property="title" content={meta_title} />
        <meta property="og:title" content={meta_title} />
        <meta name="description" content={meta_descripcion} />
        <meta property="og:description" content={meta_descripcion} />
        <meta property="og:image" content={meta_image} />
        <meta name="url" content={meta_url} />
        <meta name="og:url" content={meta_url} />
        <meta name="og:site_name" content="Pik-Play" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
        <meta name="theme-color" content="#4d9afa" />
        <meta name="google-site-verification" content="4IqXj9YLrm5eo3s_c3cTKcAqBwUhCf8qgJgL2sLtJko" />
        <meta name="twitter:description" content={meta_descripcion} />
        <meta name="keywords" value="" />
        <meta name="country" content="COL" />
        <meta name="author" content="pik-play.com" />
        <meta name="copyright" content="pik-play.com" />
        <meta name="language" content="es-CO"></meta>
        <meta http-equiv="ScreenOrientation" content="autoRotate:disabled" />
        {/* Global site tag (gtag.js) - Google Ads: 941382150 */}
        <link rel="alternate" href={meta_url} hrefLang="es-CO" />
        <link rel="canonical" href={meta_url} />
        <link rel="icon" type="image/png" href="/images/logos/logo48x48.png" />
        <link rel="manifest" href={`/manifest.json`} />
        {() => {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'AW-941382150');
            gtag('event', 'conversion', { 'send_to': 'AW-941382150/e71oCMvon-0BEIa08cAD' });
        }}()
    </Head>
}

export default Header