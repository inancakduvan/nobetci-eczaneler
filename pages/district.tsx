import SelectState from "@/components/SelectState";
import MainLayout from "@/layouts/MainLayout";

export default function District()  {
  return (
    <>
      <SelectState stateType="district" />
    </>
  );
}

District.Layout = MainLayout;