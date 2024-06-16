import { Select, Input, Button } from "antd";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { TfiReload } from "react-icons/tfi";
import { useEffect, useState, useRef } from "react";
import { ChangeFormat } from "@src/Features/ChangeTempMeasure/ChangeFormat";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

export function Header() {
  const { toggleFormat } = useGlobalProvider();
  const [rotateIcon, setRotateIcon] = useState(false);

  const handleRotateIcon = () => {
    toggleFormat();
    setRotateIcon(!rotateIcon);
  };

  return (
    <div className="p-2 px-12 bg-blue-300 flex items-center gap-12">
      <img className="size-12" src="/ApiLogo/Api-logo.png" alt="" />
      <Select placeholder="City" className="min-w-28">
        <Select.Option value="Tbilisi">Tbilisi</Select.Option>
        <Select.Option value="Batumi">Batumi</Select.Option>
        <Select.Option value="Kutaisi">Kutaisi</Select.Option>
        <Select.Option value="Rustavi">Rustavi</Select.Option>
        <Select.Option value="Zugdidi">Zugdidi</Select.Option>
        <Select.Option value="Poti">Poti</Select.Option>
        <Select.Option value="Gori">Gori</Select.Option>
        <Select.Option value="Samtredia">Samtredia</Select.Option>
        <Select.Option value="Khashuri">Khashuri</Select.Option>
        <Select.Option value="Senaki">Senaki</Select.Option>
      </Select>
      <div className="w-full relative">
        <Input placeholder="Search the City" />
        <button className="p-[5px] h-[30px] absolute right-[1px] top-[1px] top-[2%] rounded-r-[5px] border-none">
          <IoSearchOutline className="w-12 h-5 cursor-pointer " />
        </button>
      </div>
      <Button className="flex items-center gap-2" onClick={handleRotateIcon}>
        Change Format
        <FaArrowsRotate
          className="text-blue-400"
          style={{
            height: 20,
            width: 30,
            transition: "transform 1s ease",
            transform: rotateIcon ? "rotate(360deg)" : "rotate(0deg)",
          }}
        />
      </Button>
    </div>
  );
}
