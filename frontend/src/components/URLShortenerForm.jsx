import React, { useState, useEffect } from "react";
import { FiCopy } from "react-icons/fi";

const URLShortenerForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState("Сокращенная ссылка");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputValue);
    setCopied(true);
    setTimeLeft(2000);

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 100 : 0));
    }, 100);

    setTimeout(() => {
      setCopied(false);
      clearInterval(interval);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-16 w-full items-center mt-24">
      <h1 className="font-bold text-4xl select-none">URL SHORTENER</h1>
      {showForm ? (
        <form className="flex flex-row gap-12 w-2/3 justify-center">
          <input
            className="border-2 border-cyan-800 bg-white w-2/3 rounded-none ps-4 text-slate-950"
            placeholder="Введите ссылку для сокращения"
            type="text"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
            className="bg-cyan-900 px-6 py-4 font-bold cursor-pointer duration-300 hover:bg-cyan-800"
          >
            Сократить
          </button>
        </form>
      ) : (
        <form className="flex flex-row gap-12 w-2/3 justify-center">
          <input
            className="border-2 border-cyan-800 bg-white w-2/3 rounded-none ps-4 text-slate-950"
            placeholder="Введите ссылку для сокращения"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled
            readOnly
          />
          <button
            className="cursor-pointer -ms-24"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard();
            }}
          >
            <FiCopy color="#000000" size={20} />
          </button>

          {copied && (
            <div
              className="absolute cursor-default top-8 right-8 bg-cyan-800 text-white text-sm font-medium px-4 py-2 opacity-100 transition-opacity duration-500"
            >
              Скопировано!
              <div className="absolute -ms-4 w-full h-0.5 mt-1.5 bg-white">
                <div
                  className="h-full bg-cyan-700 transition-all duration-100"
                  style={{ width: `${(timeLeft / 2000) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setInputValue("");
              setShowForm(true);
              setCopied(false);
            }}
            className="bg-cyan-900 px-6 py-4 font-bold cursor-pointer duration-300 hover:bg-cyan-800"
          >
            На главную
          </button>
        </form>
      )}
    </div>
  );
};

export default URLShortenerForm;
