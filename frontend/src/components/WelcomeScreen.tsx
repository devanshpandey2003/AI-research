import { InputForm } from "./InputForm";

interface WelcomeScreenProps {
  handleSubmit: (
    submittedInputValue: string,
    effort: string,
    model: string
  ) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  handleSubmit,
  onCancel,
  isLoading,
}) => (
  <div className="h-full flex flex-col items-center justify-center text-center px-3 pt-3 flex-1 w-full max-w-4xl mx-auto gap-6">
    <div className="animate-fadeInUp">
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-3">
        AI Research Assistant
      </h1>
      <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
        Ask me anything and I'll research the web to provide comprehensive,
        up-to-date answers.
      </p>
    </div>

    <div className="w-full mt-4 animate-fadeInUp animation-delay-200">
      <InputForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={onCancel}
        hasHistory={false}
      />
    </div>

    <div className="animate-fadeInUp animation-delay-400">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {[
          "Latest AI trends",
          "Renewable energy comparison",
          "Programming best practices",
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() =>
              handleSubmit(
                suggestion,
                "medium",
                "gemini-2.5-flash-preview-04-17"
              )
            }
            className="px-3 py-1.5 bg-neutral-700/40 hover:bg-neutral-600/40 text-neutral-300 rounded-lg text-xs transition-all duration-200 hover:scale-105 border border-neutral-600/20"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <p className="text-xs text-neutral-500 flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        Powered by Google Gemini and LangChain
      </p>
    </div>
  </div>
);
