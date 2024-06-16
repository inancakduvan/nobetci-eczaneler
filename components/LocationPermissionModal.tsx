import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

import { useGlobalContext } from "@/stores/globalStore";

interface ILocationPermissionModalProps {
    setIsOpen: (value: boolean) => void
};

const LocationPermissionModal = ({ setIsOpen }: ILocationPermissionModalProps) => {
    const { t } = useTranslation('common');

    const { setCurrentLocation, currentLocationStatus, setCurrentLocationStatus } = useGlobalContext();

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentLocationStatus("granted");
            setCurrentLocation(position.coords);

            setIsOpen(false);
        }, function(error) {
            setCurrentLocationStatus("denied");
        });
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="z-20 fixed top-0 left-0 flex items-center justify-center w-full h-fit-screen p-medium bg-overlay-30">
                <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                >
                    <div className="bg-semantic-light rounded-lg overflow-hidden">
                        <div className="px-medium pt-medium">
                            <div className="text-heading-medium text-onText-primary mb-small uppercase">{t("allowLocationTitle")}</div>
                            <div className="text-body-small text-onText-secondary mb-xlarge">
                                {currentLocationStatus === "denied" ? t("allowLocationDeniedDesc") : t("allowLocationDesc")}
                            </div>
                        </div>

                        <div className="flex h-[50px]">
                            {
                                currentLocationStatus === "denied" ?
                                <>
                                    <div className="flex-1 flex items-center justify-center bg-muted-400 text-subheading-small text-onText-primary border-t border-solid border-muted-700 cursor-pointer" onClick={() => setIsOpen(false)}>
                                        {t("okay")}
                                    </div>
                                </>
                                :
                                <>
                                    <div className="flex-1 flex items-center justify-center bg-muted-400 text-subheading-small text-onText-primary border-t border-r border-solid border-muted-700 cursor-pointer" onClick={() => setIsOpen(false)}>
                                        {t("cancel")}
                                    </div>

                                    <div className="flex-1 flex items-center justify-center bg-muted-400 text-subheading-small text-onText-primary border-t border-solid border-muted-700 cursor-pointer" onClick={getCurrentLocation}>
                                        {t("allowLocationTitle")}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default LocationPermissionModal;