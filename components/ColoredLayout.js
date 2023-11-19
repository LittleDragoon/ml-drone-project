const ColoredLayout = ({ children }) => {
  return (
    <div className="from-gray-900 to-gray-700 bg-gradient-to-b min-h-screen">
      {children}
    </div>
  );
};

export default ColoredLayout;
