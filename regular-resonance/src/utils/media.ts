export const buildMediaUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }
    const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL || "https://cmsblog.vritico.com";
    return `${strapiUrl}${url}`;
};