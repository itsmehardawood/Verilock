'use client';
import React from 'react';
import { X } from 'lucide-react';

export default function ExternalLinkModal({ isOpen, url, onClose }) {
  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-[90%] h-[90%] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Iframe showing external page */}
        <iframe
          src={url}
          title="External Profile"
          className="w-full h-full border-0 rounded-2xl"
        />
      </div>
    </div>
  );
}
