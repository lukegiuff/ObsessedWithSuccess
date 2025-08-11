import Script from 'next/script'

export default function AdminPage() {
  return (
    <>
      <div id="nc-root"></div>
      <Script 
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  )
}
