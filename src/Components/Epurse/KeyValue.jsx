const KeyValueDisplayEpurse = ({ data }) => {
    const capitalizeWords = (string) => {
      return string
        ?.split(/[\s_]/)
        ?.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };
  
    const renderValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        // If the value is an object or array, recursively render it
        return <KeyValueDisplayEpurse data={value} />;
      }
      return value || "N/A"; 
    };
  
    // If `data` is an empty object, display "No Data"
    if (Object.keys(data).length === 0) {
      return <div>No Data</div>;
    }
    
  
    return (
      <div>
        {Object.entries(data)?.map(([key, value]) => (
          <div key={key} className="flex justify-between p-1">
            <strong className="w-1/3 text-left">
              {capitalizeWords(key.replace(/_/g, " "))}:
            </strong>
            <span className="w-2/3 text-right">{renderValue(value)}</span>
          </div>
        ))}
      </div>
    );
  };
  
  
  export default KeyValueDisplayEpurse;
  