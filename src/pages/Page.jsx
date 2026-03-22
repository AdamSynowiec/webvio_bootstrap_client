import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionRenderer from "../SectionRenderer";
import Seo from "../components/Seo";
import config from "../config";
import { useTranslation } from "react-i18next";
import localPageData from "../data/pageData.json";

export default function Page() {

    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const slug = location.pathname;


    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        if (config.useLocalData) {
            try {

                const page = localPageData.pages.find(p => p.slug === slug);

                if (!page) {
                    navigate("/404");
                    throw new Error("Strona nie istnieje");
                }

                setPageData(page);
                setError(null);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

            return;
        }

        fetch(`${config.apiUrl}/page/${slug}?api_key=${config.apiKey}`)
            .then((res) => {

                if (!res.ok) {
                    navigate("/404");
                    throw new Error("Strona nie istnieje");
                }

                return res.json();

            })
            .then((data) => {

                setPageData(data[0]);
                setError(null);

            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));

    }, [slug, navigate]);

    if (loading) return <div className="text-center mt-20">{t("loading")}</div>;
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

    return (
        <>
            <Seo seo={pageData.seo} />
            <SectionRenderer sections={pageData.sections} />
        </>
    );
}