"use client";

export default function KangarooLoader() {


  return (
    <div className="flex items-center justify-center h-screen bg-white overflow-hidden">
      <div className="relative w-28 h-28">
        {/* Kangaroo bouncing */}
        <div className="w-full h-full animate-bounce-kangaroo origin-bottom relative">
          <img
            src="/images/kangaroo.png"
            alt="Kangaroo Loader"
            className="w-full h-full object-contain animate-tail-wag"
          />

          {/* Realistic layered shadow */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <div className="relative w-24 h-8 animate-shadow">
              {/* Core shadow */}
              <div className="absolute inset-0 rounded-full bg-black/40 blur-[6px]" />
              {/* Soft glow edge */}
              <div className="absolute inset-0 rounded-full bg-black/20 blur-[16px]" />
            </div>
          </div>



        </div>
      </div>

      <style jsx>{`
        /* Kangaroo bounce */
        @keyframes bounce-kangaroo {
          0%, 100% {
            transform: translateY(0) scaleY(0.95) scaleX(1.05);
          }
          50% {
            transform: translateY(-50px) scaleY(1.05) scaleX(0.95);
          }
        }
        .animate-bounce-kangaroo {
          animation: bounce-kangaroo 1s infinite cubic-bezier(0.28, 0.84, 0.42, 1);
        }
 
        /* Tail wag */
        @keyframes tail-wag {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        .animate-tail-wag {
          animation: tail-wag 1.5s infinite ease-in-out;
        }
 
        /* Shadow squash with realism */
        @keyframes shadow {
          0%, 100% { transform: scaleX(1) scaleY(0.3); opacity: 0.4; }
          50% { transform: scaleX(1.8) scaleY(0.3); opacity: 0.2; }
        }
        .animate-shadow {
          animation: shadow 1s infinite ease-in-out;
        }
 
        
      `}</style>
    </div>
  );
}