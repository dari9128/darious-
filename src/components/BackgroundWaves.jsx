export default function BackgroundWaves() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#e5e7eb] pointer-events-none">
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-200 opacity-80"></div>
      
      {/* Huge curved shape 1 */}
      <div className="absolute top-[-30%] left-[-10%] w-[80vw] h-[80vw] min-w-[800px] min-h-[800px] bg-white rounded-[45%] shadow-[20px_20px_80px_rgba(0,0,0,0.06)] animate-wave-slow origin-center"></div>
      
      {/* Huge curved shape 2 */}
      <div className="absolute bottom-[-40%] right-[-20%] w-[90vw] h-[90vw] min-w-[900px] min-h-[900px] bg-gradient-to-tl from-gray-100 to-white rounded-[48%] shadow-[-20px_-20px_80px_rgba(0,0,0,0.05)] animate-wave-medium origin-center"></div>

      {/* Huge curved shape 3 */}
      <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] bg-white rounded-[40%_60%_70%_30%] shadow-[0_20px_80px_rgba(0,0,0,0.04)] animate-blob mix-blend-multiply opacity-50"></div>
      
      {/* Huge curved shape 4 */}
      <div className="absolute bottom-[20%] left-[-30%] w-[70vw] h-[70vw] min-w-[700px] min-h-[700px] bg-gradient-to-br from-white to-gray-100 rounded-[60%_40%_30%_70%] shadow-[20px_-20px_80px_rgba(0,0,0,0.05)] animate-blob animation-delay-4000"></div>
    </div>
  );
}
