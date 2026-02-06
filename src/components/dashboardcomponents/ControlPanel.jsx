function ControlPanel() {
  return (
    <div className="w-full p-2 rounded-xl hover:cursor-pointer hover:bg-gray-300">
      <div className="flex">
        <div>
          <img src="/helpdesk.svg" alt="help desk logo" className="h-12 w-12" />
        </div>
        <div className="pl-2 ">
          <h1 className="block text-md text-black font-bold">Helpdesk</h1>
          <p className="block text-sm text-black font-light">Administrator</p>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
