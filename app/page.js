import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[44vh] gap-4">
        <div className="text-5xl font-bold flex items-center gap-2">Buy me a Chai <span><img src="tea.gif" width={90} alt="tea" /></span></div>

        <p>A crowd funding project for creators. Get funded by your fans and followers</p>
        <div>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>

        </div>
      </div>

      <div className="bg-white opacity-10 h-1"></div>

      <div className="px-2 py-8">
        <h2 className="text-2xl font-bold text-center my-8 mb-16">Your fans can buy you a chai</h2>

        <div>
          <div className="flex justify-evenly">

            <div className="space-y-3 flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2" src="man.gif" width={80} alt="" />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center">Your fans are available for you to help you</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2" src="coin.gif" width={80} alt="" />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center">Your fans are available for you to help you</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2" src="group.gif" width={80} alt="" />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center">Your fans are available for you to help you</p>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1"></div>

      <div className="px-2 py-8 pb-16">
        <h2 className="text-2xl font-bold text-center my-8 mb-14">Learn more about us</h2>

        <div className="flex justify-center items-center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/bL7n6Ib9TCc?si=UI6k3kcO_ETgZMMK" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

    </>
  );
}
