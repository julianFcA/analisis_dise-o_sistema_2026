"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Search from "@/components/icons/search";

/**
 * Búsqueda del Navbar de la app interna.
 *
 * Mantiene su valor en el cliente (el Navbar persiste entre navegaciones) y al
 * enviarse lleva a `/services?q=<término>`, donde el catálogo filtra los
 * servicios por título, proveedor, categoría, ubicación y etiquetas.
 */
export default function AppSearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const term = value.trim();
    router.push(term ? `/services?q=${encodeURIComponent(term)}` : "/services");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="min-w-0 max-w-[420px] flex-1"
    >
      <SearchBar
        field
        icon={Search}
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar servicios o proveedores"
        aria-label="Buscar servicios o proveedores"
        className="w-full"
      />
    </form>
  );
}
