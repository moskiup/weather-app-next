export function Error() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center absolute opacity-80">
      <div className="w-2/5 max-w-[500px] text-black bg-slate-100 h-2/5 rounded-2xl">
        <h1 className="text-center  text-3xl ">ERROR</h1>
        <p className="p-4">The city doesnt exist</p>
      </div>
    </div>
  );
}
