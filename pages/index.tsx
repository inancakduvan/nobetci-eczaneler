import Skeletton from "@/elements/Skeletton/Skeletton";
import MainLayout from "@/layouts/MainLayout";
import { useGlobalContext } from "@/stores/globalStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home()  {
  const router = useRouter();

  const { cities, setCities, districts, setDistricts, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict } = useGlobalContext();

  // useEffect(() => {
  //   if(!selectedDistrict) {
  //     router.push("/city");
  //   }
  // }, [])

  // if(!selectedDistrict) {
  //   return "";
  // }

  return (
    <>
      <div className="text-primary-700">
        Home
      </div>
    </>
  );
}

Home.Layout = MainLayout;