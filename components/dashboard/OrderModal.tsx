import { HiArrowLongLeft } from "react-icons/hi2";
import ReactPortal from "../reactPortal";


interface InvoiceModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function OrderModal({
  children,
  isOpen,
  handleClose,
}: InvoiceModalProps) {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="invoice-modal">
      <div className="fixed inset-0 h-screen bg-white w-full z-30 flex items-center justify-center">
        <HiArrowLongLeft
          className="absolute inset-4 w-12 h-10 z-20 cursor-pointer"
          onClick={handleClose}
        />
        <div className="relative z-10 w-full h-screen rounded-lg p-5">{children}</div>
      </div>
    </ReactPortal>
  );
}
