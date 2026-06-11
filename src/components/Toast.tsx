type Props = {
  message: string;
};

export default function Toast({
  message,
}: Props) {
  return (
    <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  );
}