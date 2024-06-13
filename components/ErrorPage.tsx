import { Button } from "@/elements/Button"
import { IconArrowLeft } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router"

const ErrorPage = () => {
    const router = useRouter();

    const { t } = useTranslation('common');

    return (
        <div className="z-40 fixed top-0 left-0 w-full h-fit-screen flex items-center justify-center bg-muted-700">
            <div className="inline-flex flex-col px-large py-medium bg-white shadow-ultra-soft rounded-lg">
            <div className="text-body-medium text-center mb-medium">
                {t("errorMessage")}
            </div>

            <Button type="primary" Icon={IconArrowLeft} text={t("goBack")} onClick={() => router.push("/city")} />
            </div>
        </div>
    )
}

export default ErrorPage;