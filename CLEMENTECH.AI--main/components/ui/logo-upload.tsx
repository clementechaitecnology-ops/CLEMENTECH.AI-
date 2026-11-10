"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "clementech-logo";

export default function LogoUpload() {
  const [logo, setLogo] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      if (guardado) setLogo(guardado);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  function manejarArchivo(event: React.ChangeEvent<HTMLInputElement>) {
    const archivo = event.target.files?.[0];
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setLogo(base64);
      localStorage.setItem(STORAGE_KEY, base64);
    };
    reader.readAsDataURL(archivo);
    event.target.value = "";
  }

  function eliminarLogo() {
    setLogo(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div
      className="relative flex items-center gap-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href="/" className="flex items-center gap-2">
        {logo ? (
          <Image
            src={logo}
            alt="Logo Clementech"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            unoptimized
          />
        ) : (
          <span className="font-medium text-black dark:text-white">
            Clementech<span className="text-cyan-500 dark:text-cyan-400">.ai</span>
          </span>
        )}
      </Link>

      {/* Controles que aparecen al hacer hover */}
      {hover && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => inputRef.current?.click()}
            title="Subir logo"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-neutral-500 transition hover:bg-cyan-100 hover:text-cyan-600 dark:bg-neutral-800 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-400"
          >
            {logo ? <ImageIcon size={12} /> : <Upload size={12} />}
          </button>
          {logo && (
            <button
              onClick={eliminarLogo}
              title="Quitar logo"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-neutral-500 transition hover:bg-red-100 hover:text-red-500 dark:bg-neutral-800 dark:hover:bg-red-400/10 dark:hover:text-red-400"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={manejarArchivo}
        className="sr-only"
        aria-label="Subir logo"
      />
    </div>
  );
}
