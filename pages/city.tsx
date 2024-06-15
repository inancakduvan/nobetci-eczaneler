import SelectState from "@/components/SelectState";
import MainLayout from "@/layouts/MainLayout";

export default function City()  {
  return <SelectState stateType="city" />;
}

City.Layout = MainLayout;