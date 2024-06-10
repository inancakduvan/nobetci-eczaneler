import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconArrowRight, IconBrandGithub, IconBrandX, IconWorldWww, IconX } from "@tabler/icons-react";

import setLanguage from 'next-translate/setLanguage'
import useTranslation from "next-translate/useTranslation";
import { useGlobalContext } from "@/stores/globalStore";

type TSettingsModal = React.FC<{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}>;

const SettingsModal:TSettingsModal = ({isOpen, setIsOpen}) => {
    const { t } = useTranslation('common');

    const { siteLanguage, setSiteLanguage } = useGlobalContext();

    useEffect(() => {
        if(window) {
            const href = window.location.href;
            const currentLanguage = href.includes("en") ? "en" : "tr";

            setLanguage(currentLanguage);
        }
    }, [])

    const updateLanguage = async () => {
        const language = siteLanguage === "en" ? "tr" : "en";
        await setLanguage(language);

        setSiteLanguage(language);
    }

    if(!isOpen) {
        return null;
    }

    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="z-50 fixed left-0 top-0 flex justify-end w-full h-fit-screen bg-overlay-30">
                    <motion.div 
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="w-[84%] h-full bg-semantic-light shadow-soft p-medium overflow-auto"
                    >
                        <div className="flex items-center justify-end cursor-pointer mb-large" onClick={() => setIsOpen(false)}>
                            <IconX />
                        </div>
                    
                        <div className="flex items-center justify-between bg-muted-400 border-solid border border-muted-700 rounded-lg cursor-pointer p-medium" onClick={updateLanguage}>
                            <div className="text-onText-primary text-subheading-medium">{t("changeLanguage")}</div>

                            <div className="text-primary-400">
                                <IconArrowRight />
                            </div>
                        </div>

                        <div className="mt-large bg-muted-400 border-solid border border-muted-700 rounded-lg cursor-pointer p-medium">
                            <div className="text-onText-primary text-subheading-medium">{t("developedAndDesignedBy")}</div>

                            <div className="text-primary-400">İnanç Akduvan</div>

                            <div className="mt-medium">
                                <div className="flex items-center gap-small">
                                    <div className="flex items-center justify-center text-onText-primary bg-primary-300 w-[24px] h-[24px] rounded">
                                        <IconBrandGithub size={16} />
                                    </div>

                                    <div className="text-onText-subdark text-body-medium">
                                        <a href="https://github.com/inancakduvan" target="_blank" rel="noreferrer">github.com/inancakduvan</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-small mt-small">
                                    <div className="flex items-center justify-center text-onText-primary bg-primary-300 w-[24px] h-[24px] rounded">
                                        <IconBrandX size={16} />
                                    </div>

                                    <div className="text-onText-subdark text-body-medium">
                                        <a href="https://x.com/inancAkduvan/" target="_blank" rel="noreferrer">x.com/inancAkduvan</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-small mt-small">
                                    <div className="flex items-center justify-center text-onText-primary bg-primary-300 w-[24px] h-[24px] rounded">
                                        <div className="text-subheading-xxsmall">DEV</div>
                                    </div>

                                    <div className="text-onText-subdark text-body-medium">
                                        <a href="https://dev.to/inancakduvan" target="_blank" rel="noreferrer">dev.to/inancakduvan</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-small mt-large">
                                    <div className="flex items-center justify-center text-onText-primary bg-primary-300 w-[24px] h-[24px] rounded">
                                        <IconWorldWww size={16} />
                                    </div>

                                    <div className="text-onText-subdark text-body-medium">
                                        <a href="https://inancakduvan.vercel.app/" target="_blank" rel="noreferrer">inancakduvan.vercel.app</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-medium bg-helper-yellow-400 text-semantic-warning border-solid border border-muted-700 rounded-lg cursor-pointer p-medium">
                            <div className="text-body-small mb-small">{t("dataSourceDesc")}:</div>

                            <a className="text-subheading-small underline" href="https://collectapi.com/tr/api/health/nobetci-eczane-api" target="_blank" rel="noreferrer">collectapi.com/tr/api/health/nobetci-eczane-api</a>
                        </div>

                        <div className="mt-medium bg-sky-100 text-sky-900 border-solid border border-sky-300 rounded-lg cursor-pointer p-medium">
                            <div className="text-body-small mb-medium">{t("openSourceDesc")}</div>

                            <div className="flex gap-small flex-wrap mb-large">
                                <div className="inline-block bg-sky-200 text-sky-950 border border-solid border-sky-400 text-body-xsmall py-xsmall px-small rounded">
                                    #TypeScript
                                </div>

                                <div className="inline-block bg-sky-200 text-sky-950 border border-solid border-sky-400 text-body-xsmall py-xsmall px-small rounded">
                                    #Tailwind
                                </div>

                                <div className="inline-block bg-sky-200 text-sky-950 border border-solid border-sky-400 text-body-xsmall py-xsmall px-small rounded">
                                    #OpenSource
                                </div>

                                <div className="inline-block bg-sky-200 text-sky-950 border border-solid border-sky-400 text-body-xsmall py-xsmall px-small rounded">
                                    #NextJS
                                </div>

                                <div className="inline-block bg-sky-200 text-sky-950 border border-solid border-sky-400 text-body-xsmall py-xsmall px-small rounded">
                                    #Figma
                                </div>
                            </div>

                            <a className="text-subheading-small underline" href="https://github.com/inancakduvan/nobetci-eczaneler" target="_blank" rel="noreferrer">github.com/inancakduvan/nobetci-eczaneler</a>
                        </div>

                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default SettingsModal;