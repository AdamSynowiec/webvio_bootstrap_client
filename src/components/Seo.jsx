import { Helmet } from "react-helmet-async";

export default function Seo({ seo = {} }) {

    const {
        title,
        description,
        keywords,
        canonical,
        robots,
        author,

        ogTitle,
        ogDescription,
        ogImage,
        ogType,
        ogUrl,
        ogSiteName,
        ogLocale,
        ogImageWidth,
        ogImageHeight,

        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage,
        twitterSite,
        twitterCreator,

        themeColor,
        language,

        structuredData
    } = seo;

    const safeStructuredData = structuredData
        ? JSON.stringify(structuredData)
        : null;

    return (
        <Helmet htmlAttributes={{ lang: language || "en" }}>

            {/* Basic SEO */}
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}
            {robots && <meta name="robots" content={robots} />}

            {/* Canonical */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Theme color */}
            {themeColor && <meta name="theme-color" content={themeColor} />}

            {/* Open Graph */}
            {ogTitle && <meta property="og:title" content={ogTitle} />}
            {ogDescription && <meta property="og:description" content={ogDescription} />}
            {ogImage && <meta property="og:image" content={ogImage} />}
            {ogType && <meta property="og:type" content={ogType} />}
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
            {ogLocale && <meta property="og:locale" content={ogLocale} />}
            {ogImageWidth && <meta property="og:image:width" content={ogImageWidth} />}
            {ogImageHeight && <meta property="og:image:height" content={ogImageHeight} />}

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
            {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
            {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
            {twitterImage && <meta name="twitter:image" content={twitterImage} />}
            {twitterSite && <meta name="twitter:site" content={twitterSite} />}
            {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* Performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

            {/* Structured data */}
            {safeStructuredData && (
                <script type="application/ld+json">
                    {safeStructuredData}
                </script>
            )}

        </Helmet>
    );
}