import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconArrowRight, IconBrandFigma, IconBrandGithub, IconBrandX, IconWorldWww, IconX } from "@tabler/icons-react";

import setLanguage from 'next-translate/setLanguage'
import useTranslation from "next-translate/useTranslation";
import Trans from 'next-translate/Trans'

import { useGlobalContext } from "@/stores/globalStore";
import { Button } from "@/elements/Button";

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
                        className="w-[84%] lg:w-[30%] h-full bg-semantic-light shadow-soft p-medium overflow-auto"
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

                        <div className="mt-xlarge bg-muted-400 border-solid border border-muted-700 rounded-lg p-medium">
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

                        <div className="mt-medium bg-helper-yellow-400 text-semantic-warning border-solid border border-muted-700 rounded-lg p-medium">
                            <div className="text-body-small mb-small">{t("dataSourceDesc")}:</div>

                            <a className="text-subheading-small underline" href="https://www.nosyapi.com/api/nobetci-eczane" target="_blank" rel="noreferrer">https://www.nosyapi.com/api/nobetci-eczane</a>
                        </div>

                        <div className="mt-medium bg-sky-100 text-sky-900 border-solid border border-sky-300 rounded-lg p-medium">
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

                        <div className="mt-medium bg-violet-100 text-violet-900 border-solid border border-violet-300 rounded-lg p-medium">
                            <div className="flex items-start gap-medium">
                                <div className="translate-y-[3px] flex items-center justify-center w-[30px] h-[30px] bg-violet-200 rounded border border-violet-300"><IconBrandFigma size={20} /></div> 
                                <div className="flex-1">
                                    <Trans
                                        i18nKey="common:figmaDesc"
                                        key="figmaDescTrans"
                                        components={[<div key="figmaDescWrapper" />, <a key="figmaDescHref" href="https://www.figma.com/design/XniOaRVyYj8WhuCUWxqkKy/N%C3%B6bet%C3%A7i-Eczaneler?node-id=1-3&t=VAmkcOldi3Edy92U-1" target="_blank" rel="noreferrer" className="text-subheading-medium underline" />]}
                                    />
                                </div>
                            </div>

                            <div className="mt-large overflow-hidden">
                                <div className="text-subheading-medium">Design:</div>
                                <div className="mt-small text-body-small italic text-violet-600"><a className="whitespace-nowrap" href="https://www.figma.com/design/XniOaRVyYj8WhuCUWxqkKy/N%C3%B6bet%C3%A7i-Eczaneler?node-id=1-3" target="_blank" rel="noreferrer">https://www.figma.com/design/XniOaRVyYj8WhuCUWxqkKy/N%C3%B6bet%C3%A7i-Eczaneler?node-id=1-3</a></div>
                            </div>

                            <div className="mt-medium overflow-hidden">
                                <div className="text-subheading-medium">Prototype:</div>
                                <div className="mt-small text-body-small italic text-violet-600"><a className="whitespace-nowrap" href="https://www.figma.com/proto/XniOaRVyYj8WhuCUWxqkKy/N%C3%B6bet%C3%A7i-Eczaneler?page-id=1%3A3&node-id=17-617&viewport=151%2C330%2C0.34&t=sdYoTy4QdmoFM8Y4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=17%3A617" target="_blank" rel="noreferrer">https://www.figma.com/proto/XniOaRVyYj8WhuCUWxqkKy/N%C3%B6bet%C3%A7i-Eczaneler?page-id=1%3A3&node-id=17-617&viewport=151%2C330%2C0.34&t=sdYoTy4QdmoFM8Y4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=17%3A617</a></div>
                            </div>
                        </div>
                        
                        <Button type="secondary" text={t("close")} className="w-full mt-large" onClick={() => setIsOpen(false)} />

                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default SettingsModal;