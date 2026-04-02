const TransferCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <p className="text-gray-500">Transferencias</p>

      <button className="px-4 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500  text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold border border-white/30">
        Nueva transferencia
      </button>

    </div>
  );
};

export default TransferCard;