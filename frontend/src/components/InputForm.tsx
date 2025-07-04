import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Brain, Send, StopCircle, Zap, Cpu } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Updated InputFormProps
interface InputFormProps {
  onSubmit: (inputValue: string, effort: string, model: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  hasHistory: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  onCancel,
  isLoading,
  hasHistory,
}) => {
  const [internalInputValue, setInternalInputValue] = useState("");
  const [effort, setEffort] = useState("medium");
  const [model, setModel] = useState("gemini-2.5-flash-preview-04-17");

  const handleInternalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!internalInputValue.trim()) return;
    onSubmit(internalInputValue, effort, model);
    setInternalInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit with Ctrl+Enter (Windows/Linux) or Cmd+Enter (Mac)
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleInternalSubmit();
    }
  };

  const isSubmitDisabled = !internalInputValue.trim() || isLoading;

  return (
    <form
      onSubmit={handleInternalSubmit}
      className={`flex flex-col gap-2 p-3 pb-3`}
    >
      <div
        className={`flex flex-row items-center justify-between text-white rounded-xl ${
          hasHistory ? "rounded-br-md rounded-bl-md" : "rounded-2xl"
        } break-words min-h-7 bg-gradient-to-r from-neutral-800/90 to-neutral-700/90 px-3 pt-2 shadow-lg border border-neutral-600/20 hover:border-neutral-500/40 transition-all duration-200`}
      >
        <Textarea
          value={internalInputValue}
          onChange={(e) => setInternalInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about anything - from current events to technical topics..."
          className={`w-full text-neutral-100 placeholder-neutral-400 resize-none border-0 focus:outline-none focus:ring-0 outline-none focus-visible:ring-0 shadow-none
                        text-sm min-h-[44px] max-h-[160px]`}
          rows={1}
        />
        <div className="-mt-2">
          {isLoading ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 cursor-pointer rounded-full transition-all duration-200"
              onClick={onCancel}
            >
              <StopCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="ghost"
              className={`${
                isSubmitDisabled
                  ? "text-neutral-500"
                  : "text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
              } p-1.5 cursor-pointer rounded-full transition-all duration-200 text-sm`}
              disabled={isSubmitDisabled}
            >
              Search
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-1.5 bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 border border-neutral-600/30 text-neutral-300 focus:ring-neutral-500 rounded-lg pl-2.5 shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex flex-row items-center text-xs font-medium">
              <Brain className="h-3 w-3 mr-1.5 text-blue-400" />
              Effort
            </div>
            <Select value={effort} onValueChange={setEffort}>
              <SelectTrigger className="w-[100px] bg-transparent border-none cursor-pointer text-xs">
                <SelectValue placeholder="Effort" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-300 cursor-pointer">
                <SelectItem
                  value="low"
                  className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer text-xs"
                >
                  Low
                </SelectItem>
                <SelectItem
                  value="medium"
                  className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer text-xs"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="high"
                  className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer text-xs"
                >
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-1.5 bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 border border-neutral-600/30 text-neutral-300 focus:ring-neutral-500 rounded-lg pl-2.5 shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex flex-row items-center text-xs font-medium">
              <Cpu className="h-3 w-3 mr-1.5 text-purple-400" />
              Model
            </div>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-[120px] bg-transparent border-none cursor-pointer text-xs">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-300 cursor-pointer">
                <SelectItem
                  value="gemini-2.0-flash"
                  className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer text-xs"
                >
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1.5 text-yellow-400" /> 2.0 Flash
                  </div>
                </SelectItem>
                <SelectItem
                  value="gemini-2.5-flash-preview-04-17"
                  className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer text-xs"
                >
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1.5 text-orange-400" /> 2.5 Flash
                  </div>
                </SelectItem>
                <SelectItem
                  value="gemini-2.5-pro-preview-05-06"
                  className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer text-xs"
                >
                  <div className="flex items-center">
                    <Cpu className="h-3 w-3 mr-1.5 text-purple-400" /> 2.5 Pro
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {hasHistory && (
          <Button
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border-emerald-500/50 text-white cursor-pointer rounded-lg px-3 py-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-xs"
            variant="default"
            onClick={() => window.location.reload()}
          >
            <SquarePen size={14} className="mr-1.5" />
            New Search
          </Button>
        )}
      </div>
    </form>
  );
};
