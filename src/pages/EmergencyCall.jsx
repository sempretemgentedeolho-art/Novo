import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Plus, X } from "lucide-react";

export default function EmergencyCall() {
  const navigate = useNavigate();
  const [emergencyContacts] = useState([
    { name: "SAMU", number: "192", initial: "S", color: "bg-teal-400" }
  ]);

  const dialNumber = (number) => {
    alert(`Ligando para ${number}...`);
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Emergência</h1>

        {/* Emergency Contacts */}
        <div className="flex gap-4 mb-12">
          {emergencyContacts.map((contact, index) => (
            <button
              key={index}
              onClick={() => dialNumber(contact.number)}
              className="flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-full ${contact.color} flex items-center justify-center text-white text-2xl font-bold mb-2`}>
                {contact.initial}
              </div>
              <span className="text-xs text-gray-700">{contact.name}</span>
            </button>
          ))}
          <button 
            onClick={() => navigate(createPageUrl("Contatos"))}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mb-2">
              <Plus className="w-8 h-8" />
            </div>
            <span className="text-xs text-gray-600">Toque + p/ adic. contatos emerg.</span>
          </button>
        </div>

        {/* Dialpad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 max-w-sm mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => dialNumber(num)}
              className="text-center py-4"
            >
              <div className="text-3xl font-light text-gray-900">{num}</div>
              <div className="text-xs text-gray-500">
                {num === 2 && 'ABC'}
                {num === 3 && 'DEF'}
                {num === 4 && 'GHI'}
                {num === 5 && 'JKL'}
                {num === 6 && 'MNO'}
                {num === 7 && 'PQRS'}
                {num === 8 && 'TUV'}
                {num === 9 && 'WXYZ'}
              </div>
            </button>
          ))}
          <button onClick={() => dialNumber('*')} className="text-center py-4">
            <div className="text-3xl font-light text-gray-900">*</div>
          </button>
          <button onClick={() => dialNumber(0)} className="text-center py-4">
            <div className="text-3xl font-light text-gray-900">0</div>
            <div className="text-xs text-gray-500">+</div>
          </button>
          <button onClick={() => dialNumber('#')} className="text-center py-4">
            <div className="text-3xl font-light text-gray-900">#</div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around items-center mt-12">
          <button 
            onClick={() => navigate(createPageUrl("InfoMedicas"))}
            className="text-center"
          >
            <span className="text-orange-600 text-sm">Info médicas</span>
          </button>
          
          <button className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
            <Phone className="w-7 h-7 text-white" />
          </button>

          <button onClick={() => navigate(createPageUrl("UnlockScreen"))}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}