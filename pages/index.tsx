import MainLayout from "@/layouts/MainLayout";
import { useGlobalContext } from "@/stores/globalStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home()  {
  const router = useRouter();

  const { cities, setCities, districts, setDistricts, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict } = useGlobalContext();

  useEffect(() => {
    if(!selectedDistrict || !selectedCity) {
      router.push("/city");
    }
  }, [])

  if(!selectedDistrict || !selectedCity) {
    return "";
  }

  return (
    <>
      Homepage <br/><br/>
      {selectedDistrict}
    </>
  );
}

Home.Layout = MainLayout;