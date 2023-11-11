import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center relative from-gray-900 to-gray-700 bg-gradient-to-b min-h-screen ">
      <Image
        src="/drone.png"
        className="absolute top-0 z-0"
        alt="drone"
        width={700}
        height={700}
        priority={true}
      />
      <div className="flex flex-col items-center z-10">
        <div className="font-semibold text-6xl pt-16 pb-8 font-bold text-gray-200">
          Drone Simulator
        </div>
        <div className="flex gap-x-4">
          <Link
            href="/training-selection"
            className="text-white bg-gradient-to-br from-green-700 via-green-600 to-green-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
          >
            Run a Training
          </Link>
          <Link
            href="/training-history"
            className="text-white bg-gradient-to-br from-green-700 via-green-600 to-green-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
          >
            Training History
          </Link>
        </div>
      </div>
    </div>
  );
}
