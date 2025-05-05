import React, { useState, useEffect } from "react";
import { FiCopy } from "react-icons/fi";
import axios from "axios";

const URLShortenerForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/url", {
        url: originalUrl,
      });
      const shortId = res.data.id;
      setShortUrl(`http://localhost:8001/${shortId}`);
      setShowForm(false);
    } catch (error) {
      console.error("Ошибка при сокращении:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
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
    <div className="flex flex-col gap-16 w-full items-center mt-48 px-2">
      <h1 className="font-bold text-4xl select-none">URL SHORTENER</h1>
      {showForm ? (
        <form className="flex flex-col items-center md:flex-row gap-12 w-full max-w-5xl justify-center">
          <input
            className="border-2 border-cyan-800 bg-white w-full h-14 rounded-none px-2 text-slate-950"
            placeholder="Введите ссылку для сокращения"
            type="text"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            onClick={handleShorten}
            className="bg-cyan-900 px-6 py-4 font-bold cursor-pointer duration-300 hover:bg-cyan-800"
          >
            Сократить
          </button>
        </form>
      ) : (
        <form className="flex flex-col items-center md:flex-row gap-12 w-full max-w-5xl justify-center">
          <input
            className="border-2 border-cyan-800 bg-white w-full h-14 rounded-none ps-4 text-slate-950"
            value={shortUrl}
            disabled
            readOnly
          />
          <button
            className="md:block hidden cursor-pointer -ms-24"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard();
            }}
          >
            <FiCopy color="#000000" size={20} />
          </button>

          {copied && (
            <div className="absolute cursor-default top-8 right-8 bg-cyan-800 text-white text-sm font-medium px-4 py-2 opacity-100 transition-opacity duration-500">
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
              setOriginalUrl("");
              setShortUrl("");
              setShowForm(true);
              setCopied(false);
            }}
            className="bg-cyan-900 px-6 py-4 font-bold h-14 cursor-pointer duration-300 hover:bg-cyan-800"
          >
            Главная
          </button>
        </form>
      )}
    </div>
  );
};

export default URLShortenerForm;
