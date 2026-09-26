import React from 'react';

interface M2BLogoProps {
  variant?: 'full' | 'compact' | 'mark' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
}

export const M2BLogo: React.FC<M2BLogoProps> = ({
  variant = 'compact',
  size = 'md',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  // Dimension scaling
  const dimensions = {
    sm: { width: 36, height: 36, textScale: 'text-sm' },
    md: { width: 46, height: 46, textScale: 'text-base' },
    lg: { width: 80, height: 80, textScale: 'text-xl' },
    xl: { width: 140, height: 140, textScale: 'text-2xl' },
  }[size];

  // SVG Mark component
  const MarkSVG = (
    <svg
      viewBox="0 0 400 400"
      width={dimensions.width}
      height={dimensions.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-500 group-hover:scale-105"
    >
      <defs>
        {/* Navy Gradients */}
        <linearGradient id="m2bNavyGrad" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B2F6B" />
          <stop offset="50%" stopColor="#0A3A7A" />
          <stop offset="100%" stopColor="#071D42" />
        </linearGradient>

        <linearGradient id="m2bNavyLightGrad" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1955AC" />
          <stop offset="60%" stopColor="#0D3F87" />
          <stop offset="100%" stopColor="#082350" />
        </linearGradient>

        {/* Gold Gradients */}
        <linearGradient id="m2bGoldGrad" x1="120" y1="100" x2="280" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="35%" stopColor="#E5BE4A" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A88219" />
        </linearGradient>

        <linearGradient id="m2bGoldBevel" x1="100" y1="100" x2="250" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2B8" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6A0E" />
        </linearGradient>

        {/* Drop Shadow filter */}
        <filter id="m2bShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.28" />
        </filter>
        <filter id="m2bGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#D4AF37" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Orbit Circle 1: Upper Navy Curved Crescent */}
      <path
        d="M 98 126 C 122 72 192 48 274 82 C 248 64 175 48 116 88 C 84 110 74 146 98 126 Z"
        fill="url(#m2bNavyGrad)"
        filter="url(#m2bShadow)"
      />
      <path
        d="M 85 140 C 110 65 210 38 280 82"
        stroke={isDark ? "#4882DB" : "#0B2F6B"}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />

      {/* Orbit Circle 2: Lower Gold Curved Crescent */}
      <path
        d="M 106 212 C 114 275 186 312 268 280 C 298 268 322 240 332 215 C 310 248 264 276 210 274 C 152 272 118 240 106 212 Z"
        fill="url(#m2bGoldGrad)"
        filter="url(#m2bGoldGlow)"
      />

      {/* Letter 'M' in Royal Navy */}
      <g filter="url(#m2bShadow)">
        {/* Left vertical stem of M */}
        <path
          d="M 72 120 L 108 120 L 108 226 L 72 226 Z"
          fill="url(#m2bNavyGrad)"
        />
        {/* Diagonal apex left */}
        <path
          d="M 108 120 L 152 192 L 152 165 L 122 120 Z"
          fill="url(#m2bNavyLightGrad)"
        />
        {/* Diagonal apex right */}
        <path
          d="M 152 192 L 196 120 L 166 120 L 152 165 Z"
          fill="url(#m2bNavyGrad)"
        />
        {/* Outer full M geometry */}
        <path
          d="M 72 120 L 108 120 L 152 192 L 196 120 L 232 120 L 232 226 L 196 226 L 196 162 L 162 218 L 142 218 L 108 162 L 108 226 L 72 226 Z"
          fill="url(#m2bNavyGrad)"
        />
        {/* Facet bevel reflection */}
        <path
          d="M 108 120 L 152 192 L 142 218 L 108 162 Z"
          fill="white"
          fillOpacity="0.08"
        />
      </g>

      {/* Center '2' in Metallic Gold */}
      <g filter="url(#m2bGoldGlow)">
        {/* Sculpted gold 2 */}
        <path
          d="M 200 120 C 238 120 262 138 262 166 C 262 188 248 206 218 230 L 152 284 L 272 284 L 260 304 L 138 304 L 138 282 L 206 226 C 232 204 242 190 242 170 C 242 150 228 138 202 138 C 178 138 162 152 156 166 L 136 150 C 146 130 170 120 200 120 Z"
          fill="url(#m2bGoldGrad)"
        />
        {/* Top 3D bevel sheen on 2 */}
        <path
          d="M 200 120 C 238 120 262 138 262 166 C 262 174 258 183 252 192 C 246 178 236 158 214 142 C 196 128 172 126 156 138 L 136 150 C 146 130 170 120 200 120 Z"
          fill="url(#m2bGoldBevel)"
        />
      </g>

      {/* Letter 'B' in Royal Navy */}
      <g filter="url(#m2bShadow)">
        <path
          d="M 244 120 L 308 120 C 334 120 354 134 354 158 C 354 172 342 184 326 190 C 348 196 362 210 362 232 C 362 260 338 276 308 276 L 244 276 L 244 120 Z M 274 144 L 274 182 L 304 182 C 316 182 326 174 326 163 C 326 152 316 144 304 144 L 274 144 Z M 274 204 L 274 252 L 306 252 C 320 252 332 244 332 228 C 332 212 320 204 306 204 L 274 204 Z"
          fill="url(#m2bNavyGrad)"
        />
        {/* Subtle facet highlight */}
        <path
          d="M 244 120 L 308 120 C 334 120 354 134 354 158 C 354 162 352 166 348 170 L 274 170 L 274 144 L 304 144 C 316 144 326 152 326 163"
          fill="white"
          fillOpacity="0.06"
        />
      </g>

      {/* Pixel Cluster / Tech Constellation (top right) */}
      <g>
        {/* Navy square pixels */}
        <rect x="270" y="86" width="16" height="16" fill="#0B2F6B" />
        <rect x="294" y="70" width="16" height="16" fill="#0B2F6B" />
        <rect x="294" y="94" width="16" height="16" fill="#0B2F6B" />
        <rect x="318" y="64" width="12" height="12" fill="#0B2F6B" />
        <rect x="318" y="82" width="12" height="12" fill="#0B2F6B" />
        <rect x="338" y="74" width="9" height="9" fill="#0B2F6B" />

        {/* Metallic Gold square pixels */}
        <rect x="294" y="122" width="12" height="12" fill="#D4AF37" />
        <rect x="318" y="104" width="12" height="12" fill="#D4AF37" />
        <rect x="318" y="124" width="10" height="10" fill="#E5C158" />
        <rect x="338" y="90" width="10" height="10" fill="#D4AF37" />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {MarkSVG}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center p-2 rounded-2xl ${isDark ? 'bg-[#081E44]/80 border border-[#D4AF37]/30' : 'bg-white shadow-md border border-[#0B2F6B]/10'} ${className}`}>
        {MarkSVG}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
        {MarkSVG}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-black tracking-widest text-lg ${isDark ? 'text-white' : 'text-[#0B2F6B]'}`}>
              M<span className="text-[#D4AF37]">2</span>B
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          </div>
          <span className={`text-[9px] font-semibold tracking-[0.16em] uppercase ${isDark ? 'text-blue-200/60' : 'text-[#0B2F6B]/70'}`}>
            Technology · Innovation
          </span>
        </div>
      </div>
    );
  }

  // Full Brand Lockup (Hero / Footer / Studio)
  return (
    <div className={`flex flex-col items-center text-center group ${className}`}>
      <div className="relative mb-3">
        {MarkSVG}
      </div>

      {/* Primary Wordmark */}
      <h2 className={`font-display font-black tracking-[0.22em] ${dimensions.textScale} ${isDark ? 'text-white' : 'text-[#0B2F6B]'}`}>
        M <span className="text-[#D4AF37]">2</span> B
      </h2>

      {/* Pillars */}
      <div className={`flex items-center justify-center gap-2 mt-1 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase ${isDark ? 'text-blue-200/80' : 'text-[#0B2F6B]'}`}>
        <span>Technology</span>
        <span className="text-[#D4AF37]">|</span>
        <span>Innovation</span>
        <span className="text-[#D4AF37]">|</span>
        <span>Solutions</span>
      </div>

      {/* Gold Dot & Hairline Divider */}
      <div className="flex items-center justify-center w-36 gap-2 my-2.5 opacity-60">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>

      {/* Tagline */}
      <p className={`text-[10px] md:text-[11px] font-medium tracking-[0.24em] uppercase ${isDark ? 'text-slate-300/80' : 'text-[#0B2F6B]/80'}`}>
        Connecting Today, Building Tomorrow
      </p>
    </div>
  );
};
