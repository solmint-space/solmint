export default function GenerateStatusCard({
  generatedUrl,
}: {
  generatedUrl: string;
}) {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 24,
        borderRadius: 24,
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          color: "#14F195",
          fontWeight: 900,
          marginBottom: 12,
        }}
      >
        WEBSITE GENERATED
      </div>

      <div
        style={{
          color: "white",
          wordBreak: "break-all",
          marginBottom: 18,
        }}
      >
        {generatedUrl}
      </div>

      <button
        onClick={() => window.open(generatedUrl, "_blank")}
        style={{
          height: 54,
          padding: "0 24px",
          borderRadius: 18,
          border: "none",
          background:
            "linear-gradient(90deg,#14F195,#9945FF)",
          color: "white",
          fontWeight: 900,
          cursor: "pointer",
        }}
      >
        Open website
      </button>
    </div>
  );
}