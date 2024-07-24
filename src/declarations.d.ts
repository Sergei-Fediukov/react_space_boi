// Enable css modules
declare module '*.module.scss' {
  const styles: { [className: string]: string }
  export default styles
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  import React from 'react'

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare const PLATFORM: 'desktop' | 'mobile'
declare const PUBLIC_ROUTES: Record<string, string>
declare const MODE: string
