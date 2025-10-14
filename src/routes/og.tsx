import { createFileRoute } from "@tanstack/react-router";
import ImageResponse from "@takumi-rs/image-response";

function Logo() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.107 99C35.5549 99 27.418 96.9025 20.6961 92.7076C13.9743 88.4235 8.84451 82.6667 5.3067 75.4372C1.7689 68.2076 0 60.1749 0 51.3388C0 45.2696 0.928673 39.245 2.78602 33.265C4.73181 27.2851 7.60628 21.8852 11.4094 17.0656C15.2126 12.1566 19.9886 8.27413 25.7375 5.41803C31.5749 2.47268 38.3409 1 46.0357 1C48.4237 1 51.1213 1.26776 54.1284 1.80328C57.1355 2.24954 60.1427 2.96357 63.1498 3.94536C66.2454 4.92714 68.9872 6.13206 71.3752 7.5601L70.8445 1.93715H81.0599V33.1311H72.4365C71.6405 28.133 70.0927 23.9827 67.7932 20.6803C65.4936 17.378 62.6191 14.8789 59.1698 13.1831C55.7204 11.4872 51.9173 10.6393 47.7603 10.6393C43.1612 10.6393 39.1369 11.7104 35.6876 13.8525C32.3267 15.9945 29.5407 18.8506 27.3295 22.4208C25.1184 25.9909 23.4379 30.0519 22.2882 34.6038C21.2268 39.1557 20.6961 43.8415 20.6961 48.6612C20.6961 56.337 21.7575 63.1648 23.8802 69.1448C26.0029 75.1248 29.0984 79.8552 33.1669 83.3361C37.3238 86.7277 42.4094 88.4235 48.4237 88.4235C50.1041 88.4235 52.0942 88.2896 54.3937 88.0219C56.6933 87.7541 58.9929 87.3525 61.2924 86.8169C63.592 86.2814 65.5378 85.612 67.1298 84.8087V72.3579C67.1298 69.9481 67.174 67.6275 67.2625 65.3962C67.4394 63.1648 67.572 61.469 67.6605 60.3087C66.2454 60.398 64.4765 60.4872 62.3538 60.5765C60.2311 60.5765 58.6833 60.6211 57.7104 60.7104V50.4016H93V59.2377C91.4964 59.327 90.1698 59.5055 89.02 59.7732C87.9586 60.041 87.03 60.5765 86.234 61.3798C85.5264 62.0938 84.9957 63.2095 84.6419 64.7268C84.2882 66.2441 84.1113 68.2969 84.1113 70.8852V92.306H80.9272C78.3623 92.306 75.7974 92.663 73.2325 93.377C70.6676 94.0911 67.9258 94.8943 65.0071 95.7869C62.2653 96.5902 59.2582 97.3042 55.9857 97.929C52.7133 98.643 49.087 99 45.107 99Z"
        fill="black"
      />
    </svg>
  );
}

function OgImage({ title }: { title: string | React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
        padding: "5% 10% 3% 10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <Logo />
      <h1
        style={{
          fontSize: "60px",
          fontWeight: "normal",
          marginTop: "7%",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: "auto",
          fontSize: "36px",
          fontWeight: "normal",
          textAlign: "right",
          width: "100%",
        }}
      >
        Guido Vizoso
      </p>
    </div>
  );
}

export const Route = createFileRoute("/og")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const titleParam = url.searchParams.get("title");
        const title = titleParam ?? (
          <>
            Building systems
            <br />
            that make products shine.
          </>
        );

        const image = new ImageResponse(<OgImage title={title} />, {
          width: 1200,
          height: 630,
        });

        return image;
      },
    },
  },
});
