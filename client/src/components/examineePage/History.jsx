import Historytable from "../Historytable";
import { Label } from "@/components/ui/label";
import { useId } from "react";
function History() {
  const id = useId();
  return (
    <div className="md:w-full p-2  md:p-20">
      <div className="pb-5">
        <Label htmlFor={id} className="text-[#fed330] text-2xl italic">
          Qiuzzes History
        </Label>
      </div>

      <Historytable />
    </div>
  );
}

export default History;
