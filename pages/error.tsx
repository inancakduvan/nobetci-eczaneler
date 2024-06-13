import ErrorPage from "@/components/ErrorPage";
import { Button } from "@/elements/Button";
import MainLayout from "@/layouts/MainLayout";
import { IconArrowLeft } from "@tabler/icons-react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export default function Error () {
    const { t } = useTranslation('common');

    const router = useRouter();

    return (
        <ErrorPage />
    );
};

Error.Layout = MainLayout;