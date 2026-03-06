/* eslint-disable @next/next/no-img-element */
export function IdeaBusinessPlan() {
  return (
    <div className="flex flex-col gap-4 mt-1">
      <h3 className="text-lg font-bold text-dark">Business Plan:</h3>
      <div className="w-full rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden p-2 sm:p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png"
          alt="Business Plan Canvas"
          className="w-full max-w-3xl object-contain mix-blend-multiply opacity-90"
        />
      </div>
    </div>
  );
}
