// components/ProtectedLayout.js
import ProtectedRoute from "./ProtectedRoute";
import ColoredLayout from "./ColoredLayout";

const ProtectedLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <ColoredLayout>{children}</ColoredLayout>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
