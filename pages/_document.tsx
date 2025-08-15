import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const currentLocale = this.props.locale ?? "fr";
    return (
      <Html lang={currentLocale}>
        <Head>
          <script defer src="/_vercel/insights/script.js"></script>
        </Head>
        <body>
          <Script
            strategy="beforeInteractive"
            src="/scripts/darkModeScript.js"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
