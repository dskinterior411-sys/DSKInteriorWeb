"use client";

import { CheckCircle } from "lucide-react";

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
      <CheckCircle className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}






