import { GoZap } from "react-icons/go";

export default function RateLimit() {
  return (
    <main className="flex justify-center mt-4">
      <div className="rounded-md bg-green-800 flex gap-10 items-center px-5 py-2 w-1/2">
        <div className="rounded-full bg-green-700 p-3">
          <GoZap size={35} className="text-green-500" />
        </div>
        <div className="leading-5 text-white">
          <h3 className="text-xl">Rate Limit Reached</h3>
          <p>
            You've made too many requests in a short period. Please wait 5
            minutes.
          </p>
          <span className="block text-sm opacity-75">
            Try again in a few seconds for the best experience.
          </span>
        </div>
      </div>
    </main>
  );
}
