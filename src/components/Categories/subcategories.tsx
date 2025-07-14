"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCards({subcategories,category}) {


  return (
    <div className=" mx-auto px-10 py-20 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {subcategories?.map((cat, idx) => (
          <Link
          href={`/${category}/${cat.subcategory_name}`}
            key={idx}
            className="relative rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={cat.subcategory_img_thumbnail}
              alt={cat.name}
              width={400}
              height={300}
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            <h3 className="absolute bottom-2 left-2 top-1/2 right-2 text-white text-center font-bold text-lg">
              {cat.subcategory_name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
