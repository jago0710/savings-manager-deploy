import { Dropdown } from "primereact/dropdown";

export default function Header({dropdown = false, dropdownData, title, dropValue, change}){

    

    return(
    <div className="hidden md:flex w-full py-3 px-7 text-xl bg-white md:border-b md:border-b-gray-200  flex-row justify-between items-center">
        <h1 className="font-bold font-sans">{title}</h1>
        <div hidden={!dropdown} className="w-[23rem]">
            <Dropdown loading={dropdownData.length <= 0 ? true : false} filter 
                value={dropValue} onChange={(e) => change(e.target.value)} options={dropdownData} optionLabel="label" 
                placeholder="Selecciona una cuenta" className="w-full md:w-14rem" />
        </div>
    </div>
    )
}