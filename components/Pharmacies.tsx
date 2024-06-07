import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { IconInfoCircle, IconArrowLeft, IconPhone, IconPhoneCall, IconArrowRight, IconAdjustmentsHorizontal } from "@tabler/icons-react";

import { fetchPharmacies } from "@/utils/fetch";
import { TPharmacies, useGlobalContext } from "@/stores/globalStore";
import { Button } from "@/elements/Button";
import Skeletton from "@/elements/Skeletton/Skeletton";


type TPharmaciesComponent = React.FC<{
    city: string;
    district: string;
}>;

export type TPharmaciesResponse = {
  success: boolean;
  result: TPharmacies[];
}

const Pharmacies: TPharmaciesComponent = ({city, district}) => {
    const router = useRouter();

    const { t } = useTranslation('common');

    const { pharmacies, setPharmacies } = useGlobalContext();

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if(city && district) {
        fetchPharmacies(city, district, 
            (data: TPharmaciesResponse) => {
                setPharmacies(data.result);
            },
            () => {
                setHasError(true);
            }
        );
        } else {
            setHasError(true);
        }
    }, [])

    const redirectToMap = (coordinates: string) => {
        const splittedCoordinates = coordinates.split(", ");
        const lat = splittedCoordinates[0].replace(",", ".");
        const lng = splittedCoordinates[1].replace(",", ".");

        const url = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng;
        
        window.open(url, "_blank");
    }

    if(!(city && district)) {
        return "";
    }

    return (
        <>
            <div className="bg-gradient-greenToWhite225deg min-h-fit-screen">
                <div className="p-medium">
                    <div className="p-medium bg-semantic-light shadow-ultra-soft border border-solid border-muted-700 rounded-lg">
                        <div className="text-heading-medium text-onText-primary">16 Nisan 2023, Cumartesi</div>
                        <div className="text-subheading-xsmall text-primary-700 mt-xsmall">İzmir / Konak</div>
                    </div>

                    <div className="mt-medium">
                        <div className="flex gap-xsmall">
                            <div className="text-semantic-warning">
                                <IconInfoCircle size={20} />
                            </div>

                            <div className="text-body-small text-onText-secondary">
                                Bu sayfada 16 Nisan 2024 Salı günü gün boyu ve Çarşamba sabahına kadar açık olan nöbetçi eczaneler listelenmektedir. 
                            </div>
                        </div>
                    </div>

                    <div className="mt-xlarge">
                        <div className="text-heading-large text-onText-subdark">{t("pharmaciesOnDuty")}</div>

                        <>
                        {
                            (pharmacies && pharmacies.length > 0) ? 
                            <div className="mt-medium pb-[104px]">
                                {
                                pharmacies.map((pharmacy) => <div key={"pharmacy-" + pharmacy.name + pharmacy.loc} className="shadow-ultra-soft border border-muted-700 border-solid bg-semantic-light mb-medium rounded-lg">
                                    <div className="p-medium border-b border-solid border-muted-600 text-heading-medium text-onText-primary">
                                        {pharmacy.name}
                                    </div>

                                    <div className="px-medium pt-small pb-medium">
                                        <div className="text-body-small text-onText-subdark">{pharmacy.address}</div>
                                        
                                        <div className="flex items-center gap-xsmall mt-medium"> 
                                            <div className="inline-flex text-primary-400 -translate-y-[1px]">
                                                <IconPhone size={18} />
                                            </div>

                                            <div className="text-subheading-medium text-onText-subdark">{pharmacy.phone}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-medium p-medium">
                                        <Button type="secondary" text={"Haritada Gör"} Icon={IconArrowRight} iconPosition="right" onClick={() => redirectToMap(pharmacy.loc)} />
                                        
                                        <a href={"tel:" + pharmacy.phone}>
                                            <Button type="primary-light" className="md:hidden" Icon={IconPhoneCall} />
                                        </a>
                                    </div>
                                </div>)
                                }
                            </div>
                            :
                            <>
                            {
                            hasError ?
                            <div className="z-40 fixed top-0 left-0 w-full h-fit-screen flex items-center justify-center bg-muted-700">
                                <div className="inline-flex flex-col px-large py-medium bg-white shadow-ultra-soft rounded-lg">
                                <div className="text-body-medium text-center mb-medium">
                                    {t("errorMessage")}
                                </div>

                                <Button type="primary" Icon={IconArrowLeft} text={t("goBack")} onClick={() => router.push("/city")} />
                                </div>
                            </div>
                            :
                            <Skeletton />
                            }
                            </>
                        }
                        </>
                    </div>
                </div>
            </div>

            <div className="fixed left-0 bottom-0 flex items-center justify-center gap-medium w-full px-medium py-xxlarge bg-gradient-whiteToBlack">
                <Button type="primary" text={district} Icon={IconAdjustmentsHorizontal} className="capitalize" onClick={() => router.push("/district/" + city)} />
            </div>
        </>
    )
}

export default Pharmacies;