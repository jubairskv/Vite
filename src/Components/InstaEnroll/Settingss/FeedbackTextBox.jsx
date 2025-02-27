const FeedbackInput = ({ value, onChange }) => {
    return (
      <div className="mb-4">
        <label htmlFor="feedback" className="block mb-2 text-left font-medium">
          Please provide feedback for deauthorization:
        </label>
        <textarea
          id="feedback"
          value={value}
          onChange={onChange}
          className="w-full h-24 p-2 border rounded-md shadow-md outline-none"
          placeholder="Enter your feedback here"
        ></textarea>
      </div>
    );
  };
  
  export default FeedbackInput;
  