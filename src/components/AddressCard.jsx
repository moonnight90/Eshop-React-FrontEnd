import React from "react";

function AddressCard({ data, setUpdatingAddress }) {
  return (
    <div
      className={`border-2 rounded-lg py-5 shadow-md bg-white ${
        data.default_address ? "shadow-inner " : "border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 pb-4 border-b">
        <p className="font-semibold text-gray-800">Shipping Address</p>
        <button
          className="text-sm text-violet-700 hover:underline"
          onClick={() => setUpdatingAddress(data?.id)}
        >
          Edit
        </button>
      </div>

      {/* Address Content */}
      <div className="px-4 pt-4 space-y-1 text-gray-700">
        {data?.fullName && <p className="font-bold">{data.fullName}</p>}
        {data?.address && (<p>{data.address}</p>)}
        {data?.city && <p>{data.city}</p>}
        {data?.zipcode && <p>{data.zipcode}</p>}
        {data?.phone && <p className="font-medium">{data.phone}</p>}
      </div>
    </div>
  );
}

export default AddressCard;
