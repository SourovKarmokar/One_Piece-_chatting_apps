import registration from "./assets/registration.png"

function App() {
  return (
    <div className="flex">
      <div className="w-[60%] pt-[225px] pl-[90px]">
        <h2 className="font-secondary font-bold text-secondary text-[34px]">Get started with easily register</h2>
        <p className="font-secondary text-[20px] text-black/50 mt-[13px]">Free register and you can enjoy it</p>

        <div>

          <div class="relative my-[34px]">
            <input type="text" id="floating_outlined2" className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />

            <label for="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[4px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Email Address</label>
          </div>


          <div class="relative my-[34px]">
            <input type="text" id="floating_outlined2" className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />

            <label for="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[4px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Ful name</label>
          </div>


          <div class="relative my-[34px]">
            <input type="text" id="floating_outlined2" className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />

            <label for="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[4px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Password</label>
          </div>
        </div>

      </div>
      <div className="w-[40%]">
        <img className="w-full h-screen object-cover" src={registration} alt="#registration" />
      </div>
    </div>
  )
}

export default App
