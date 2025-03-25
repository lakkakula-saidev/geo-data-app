export const Legend: React.FC = () => {
  return (
    <div className="legend">
      <strong>EEMI Grades</strong>
      <div>
        <span className="inline-block w-5 h-5 bg-blue-500"></span> 1 - 1.49
      </div>
      <div>
        <span className="inline-block w-5 h-5 bg-green-300"></span> 1.5 - 2.49
      </div>
      <div>
        <span className="inline-block w-5 h-5 bg-green-800"></span> 2.5 - 3.49
      </div>
      <div>
        <span className="inline-block w-5 h-5 bg-yellow-300"></span> 3.5 - 4.49
      </div>
      <div>
        <span className="inline-block w-5 h-5 bg-red-500"></span> 4.5 - 5.00
      </div>
    </div>
  );
};
