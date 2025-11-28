import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function TextArea() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <div className="pb-2">
        <Label htmlFor={id} className="text-[#fed330] text-2xl italic">
          Paste Your Learning Material{" "}
        </Label>
      </div>

      <Textarea
        id={id}
        className="min-h-150 text-[#fed330] md:text-[1rem] border-[#fed330] border-2 placeholder:text-[#fed330]"
        placeholder="Enter text Material for AI Review"
      />
      <div className="flex justify-end">
        <Button
          className="text-[#fed330] bg-[#0652DD] hover:bg-[#226efc] cursor-pointer border-none"
          variant="outline"
        >
          GENERATE QUIZZ
        </Button>
      </div>
    </div>
  );
}
export default TextArea;
