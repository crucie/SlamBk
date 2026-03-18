import { useNavigate } from 'react-router-dom';
import dashboardImg from "../../public/media/f.png"
import createSlam from "../../public/media/e.png"
import questionsImg from "../../public/media/c.png"


function Home() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300 flex flex-col items-center pt-16 pb-24 px-4 md:px-8 relative overflow-x-hidden'>
      {/* Background Grid Pattern */}
      <div 
        className='fixed inset-0 z-0 opacity-20 pointer-events-none' 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />

      <div className='relative z-10 w-full max-w-6xl flex flex-col items-center text-center'>
        
        {/* ================= HERO SECTION ================= */}
        <div className='w-full max-w-4xl flex flex-col items-center'>
          <div className='mb-12 border-4 border-yellow-400 bg-gray-900 p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(250,204,21,1)] duration-300'>
            <h1 
              className='text-5xl md:text-7xl font-black text-yellow-400 tracking-widest mb-6' 
              style={{ fontFamily: '"Press Start 2P", monospace', lineHeight: '1.2' }}
            >
              SLAMBK
            </h1>
            
            <div className='border-b-4 border-dashed border-gray-600 mb-6 w-3/4 mx-auto'></div>

            <p className='text-cyan-300 text-xl md:text-2xl font-bold tracking-wide mb-6 uppercase'>
              [ Your Retro Digital Memory Gallery ]
            </p>

            <p className='text-gray-300 max-w-2xl mx-auto text-base md:text-lg font-mono leading-relaxed'>
              Capture memories, share laughs, and save inside jokes. Relive the nostalgic days of passing around a physical slam book with your friends, now fully digitized in this glorious 16-bit arcade edition.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-lg mb-12'>
            <button 
              onClick={() => navigate('/auth')}
              className='group w-full px-6 py-4 bg-cyan-900 border-4 border-cyan-400 text-cyan-200 font-bold hover:bg-cyan-800 transition-all active:bg-cyan-700 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,1)] text-lg flex items-center justify-center gap-3'
            >
              <span></span> [ GET STARTED ]
            </button>
            
            <button 
              onClick={() => navigate('/auth')}
              className='group w-full px-6 py-4 bg-pink-900 border-4 border-pink-400 text-pink-200 font-bold hover:bg-pink-800 transition-all active:bg-pink-700 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(244,114,182,1)] text-lg flex items-center justify-center gap-3'
            >
              <span></span> [ LOGIN ]
            </button>
          </div>
        </div>


        {/* ================= BENTO COLLAGE SECTION ================= */}
        <div className='w-full mt-16 max-w-6xl'>
          
          <h2 className='text-3xl md:text-4xl text-center font-black text-pink-400 tracking-widest mb-12 animate-pulse' style={{ fontFamily: '"Press Start 2P", monospace' }}>
            [ SNEAK PEEK ]
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-min'>
            
            {/* Box 1: Main Dashboard Image Spot spanning heavily */}
            <div className='md:col-span-8 md:row-span-2 bg-gray-900 border-4 border-cyan-400 p-2 shadow-[8px_8px_0px_0px_rgba(34,211,238,1)] flex flex-col hover:-translate-y-1 transition-transform group'>
              <div className='bg-cyan-950 border-b-4 border-cyan-400 p-2 flex gap-2 items-center mb-2'>
                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                <span className='ml-2 text-cyan-300 font-bold text-xs uppercase tracking-widest font-mono'>dashboard.exe</span>
              </div>
              <div className='relative w-full h-full overflow-hidden border-2 border-cyan-900 bg-gray-950 flex flex-col items-center justify-center min-h-[300px]'>
                <img 
                  src={dashboardImg} 
                  alt="Dashboard Placeholder" 
                  className='w-full h-full object-contain'
                />
              </div>
            </div>

            {/* Box 2: Quote Block (Pink) */}
            <div className='md:col-span-4 bg-pink-600 border-4 border-pink-400 p-8 shadow-[8px_8px_0px_0px_rgba(244,114,182,1)] flex flex-col items-center justify-center text-center hover:bg-pink-500 transition-colors'>
              <span className='text-6xl mb-6 drop-shadow-lg'></span>
              <h3 className='text-white font-black text-xl md:text-2xl uppercase tracking-widest leading-loose' style={{ fontFamily: '"Press Start 2P", monospace' }}>
                "BECAUSE FORGETTING YOUR BESTIE'S CRUSH IS A CRIME!"
              </h3>
            </div>

            {/* Box 3: Data / Stat Block (Yellow) */}
            <div className='md:col-span-4 bg-yellow-400 border-4 border-yellow-600 p-8 shadow-[8px_8px_0px_0px_rgba(217,119,6,1)] flex flex-col items-center text-center hover:bg-yellow-300 transition-colors text-gray-900 justify-center min-h-[250px]'>
               <span className='text-5xl mb-4'></span>
              <p className='font-bold text-lg font-mono uppercase tracking-widest leading-relaxed'>
                
              </p>
              <div className='text-4xl text-black mt-4 mb-2 font-black' style={{ fontFamily: '"Press Start 2P", monospace' }}>
                Was She Hot?
              </div>
              <p className='font-bold text-sm font-mono uppercase tracking-widest opacity-80'>
                bet she was!
              </p>
            </div>

            {/* Box 4: Secondary Image Spot */}
            <div className='md:col-span-6 bg-gray-900 border-4 border-green-400 p-2 shadow-[8px_8px_0px_0px_rgba(74,222,128,1)] flex flex-col hover:-translate-y-1 transition-transform group'>
              <div className='bg-green-950 border-b-4 border-green-400 p-2 flex gap-2 items-center mb-2'>
                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                <span className='ml-2 text-green-300 font-bold text-xs uppercase tracking-widest font-mono'>AskYourCrush.png</span>
              </div>
              <div className='relative w-full h-full overflow-hidden border-2 border-green-900 bg-gray-950 flex flex-col items-center justify-center min-h-[200px]'>
                <img 
                  src={createSlam} 
                  alt="Memories Placeholder" 
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Box 5: Tertiary Image Spot (Purple) */}
            <div className='md:col-span-6 bg-gray-900 border-4 border-purple-400 p-2 shadow-[8px_8px_0px_0px_rgba(192,132,252,1)] flex flex-col hover:-translate-y-1 transition-transform group'>
              <div className='bg-purple-950 border-b-4 border-purple-400 p-2 flex gap-2 items-center mb-2'>
                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                <span className='ml-2 text-purple-300 font-bold text-xs uppercase tracking-widest font-mono'>questions.gif</span>
              </div>
              <div className='relative w-full h-full overflow-hidden border-2 border-purple-900 bg-gray-950 flex flex-col items-center justify-center min-h-[200px]'>
                <img 
                  src={questionsImg} 
                  alt="Profiles Placeholder" 
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer Icons */}
        <div className='flex gap-10 text-5xl opacity-80 animate-bounce mt-24 mb-12'>
          <span className='hover:scale-125 transition-transform cursor-pointer'>🎮</span>
          <span className='hover:scale-125 transition-transform cursor-pointer'>👾</span>
          <span className='hover:scale-125 transition-transform cursor-pointer'>🕹️</span>
        </div>

      </div>
    </div>
  );
}

export default Home;
