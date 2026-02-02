"use client";

import Image from "next/image";
import { useState } from "react";
import { useBranding } from "@/lib/branding/context";

const DEFAULT_LOGO = "/images/logo/Logo.webp";

const Logo = () => {
  const [hasError, setHasError] = useState(false);
  const { logoLightUrl } = useBranding();
  const src = hasError || !logoLightUrl ? DEFAULT_LOGO : logoLightUrl;

  return (
    <div className="flex items-center">
      <Image
        src={src}
        alt="Netproxy Logo"
        // kích thước gốc để Next.js tính tỉ lệ
        width={360}
        height={92} // 174x44 ~ 4:1, nên 360x90/92
        // responsive: mobile ~320px, màn to ~360px
        sizes="(min-width: 1280px) 360px, 320px"
        className="w-[320px] h-auto 4xl:w-[360px]"
        unoptimized={!hasError && !!logoLightUrl}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Logo;
