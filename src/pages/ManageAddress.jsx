import React, { useState, useEffect, useCallback } from "react";
import {
  AccountSideBar,
  NavigationBar,
  AddressCard,
  UpdateAddress,
  LoadingScreen,
} from "../components";
import { useSelector } from "react-redux";
import myBackend from "../backend/config";
import useDocumentTitle from "../CustomHook/useDocumentTitle";
function ManageAddress() {
  // States
  useDocumentTitle("Address");
  const [address, setAddress] = useState([]);
  const [updatingAddress, setUpdatingAddress] = useState(false);
  const user = useSelector((auth) => auth.auth);
  const [loading,setLoading] = useState(true);

  // methods
  const fetchAddress = useCallback(async () => {
    setLoading(true);
    let addresses = await myBackend.addressbook(user?.user_token);
    setAddress(await addresses);
    setLoading(false);
  }, []);

  // Hooks
  useEffect(() => {
    if (updatingAddress == false) fetchAddress();
  }, [updatingAddress]);

  return (
    <>
    {loading && <LoadingScreen />}
      <NavigationBar value={"Manage Address"} />
      <div className="container flex-grow mx-auto min-h-96 max-w-[1200px] py-5 md:flex md:flex-row md:py-10 relative">
        {address.length < 3 && (
          <div className=" fixed bottom-[8%] right-[10%] flex justify-center items-center">
            <button
              className="px-3 py-1 bg-yellow-400 h-9 text-purple-900 outline-none active:shadow-inner shadow-md hover:bg-amber-400 transition duration-200"
              onClick={() => setUpdatingAddress("new")}
            >
              + Add New Address
            </button>
          </div>
        )}
        <AccountSideBar selected={2} />
        {!updatingAddress ? (
          (address.length || loading) ? (
            <section className="grid w-full max-w-[1200px] grid-cols-1 grid-rows-2 gap-3 px-5 pb-10 md:grid-cols-2 lg:grid-cols-3">
              {address.map((v) => (
                <AddressCard
                  data={v}
                  key={v?.id}
                  setUpdatingAddress={setUpdatingAddress}
                />
              ))}
            </section>
          ) : (
            <div className="w-full justify-center items-center flex">
              <h1 className="">Address Book Empty!</h1>
            </div>
          )
        ) : (
          <UpdateAddress
            setUpdatingAddress={setUpdatingAddress}
            addressValue={updatingAddress}
            data={
              UpdateAddress != "new"
                ? address.filter((e) => e.id == updatingAddress)?.[0]
                : null
            }
          />
        )}
      </div>
    </>
  );
}

export default ManageAddress;
