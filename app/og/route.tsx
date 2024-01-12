import { config } from "@/config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");

  if (postTitle) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 10,
            backgroundColor: "#000000",
          }}
        >
          <div
            style={{
              marginLeft: 190,
              marginRight: 190,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              letterSpacing: "-0.05em",
              fontStyle: "normal",
              color: "#ffffff",
              whiteSpace: "pre-wrap",
              marginTop: -100,
            }}
          >
            <p style={{ fontSize: 60 }}>{config.faviconEmoji}</p>
            <p style={{ fontSize: 60 }}>{config.name}</p>
          </div>
          <div
            style={{
              marginLeft: 190,
              marginRight: 190,
              marginTop: 30,
              display: "flex",
              fontSize: 100,
              letterSpacing: "-0.05em",
              fontStyle: "normal",
              color: "white",
              lineHeight: "90px",
              whiteSpace: "pre-wrap",
            }}
          >
            {postTitle}
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            marginTop: -100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "90px",
            whiteSpace: "pre-wrap",
          }}
        >
          <p
            style={{
              textAlign: "center",
              padding: 0,
              margin: 0,
              fontSize: 130,
              lineHeight: "90px",
            }}
          >
            {config.faviconEmoji}
          </p>
          <p
            style={{
              textAlign: "center",
              padding: 0,
              margin: 0,
              marginTop: 60,
              fontSize: 100,
              lineHeight: "90px",
            }}
          >
            {config.name}
          </p>
          <p
            style={{
              textAlign: "center",
              padding: 0,
              margin: 0,
              marginTop: 40,
              fontSize: 60,
              lineHeight: "50px",
              color: "#ffffff80",
            }}
          >
            {config.description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
