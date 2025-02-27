const ToggleButton = ({ isOn, onToggle, label, height = '1.5rem', width = '3rem' }) => {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggle}
          className={`flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isOn ? 'bg-green-500' : 'bg-gray-300'
          }`}
          style={{ width, height }}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
              isOn ? 'translate-x-6' : 'translate-x-0'
            }`}
            style={{ width: `calc(${height} - 0.5rem)`, height: `calc(${height} - 0.5rem)` }}
          ></div>
        </button>
        {label && <span className="text-gray-700 font-medium">{label}</span>}
      </div>
    );
  };
  
  export default ToggleButton;
  