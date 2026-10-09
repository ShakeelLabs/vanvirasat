import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#f4f0e7", color: "#173d32" }}>
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <p style={{ letterSpacing: ".18em", textTransform: "uppercase", fontSize: 11 }}>VanVirasat · Dungarpur, Rajasthan</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 48 }}>This trail ends here.</h1>
        <p style={{ lineHeight: 1.8, color: "#69746a" }}>The page you are looking for could not be found. Return to the beginning and find another journey.</p>
        <Link href="/" style={{ display: "inline-block", background: "#173d32", color: "#fff", padding: "13px 20px", marginTop: 16 }}>Back to home</Link>
      </div>
    </main>
  );
}
