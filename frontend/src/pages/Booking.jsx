import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Booking = () => {

  const location = useLocation()
  const {name, slot, time, veh_no} = location.state ||{}
  const formattedSlot = Array.isArray(slot) ? slot.join(', ') : slot;
  const qrValue = `Name: ${name}\nSlot(s): ${formattedSlot}\nTime: ${time}\nVehicle No: ${veh_no}`;

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <h1 className="text-2xl font-bold mb-4">Booking Details</h1>

    <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">QR Code</h2>
        <QRCodeCanvas value={qrValue} size={256} />
        </div>
    </div>
    </div>
    </>
  );
};

export default Booking;
