import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Opt out of SWC minification to avoid AppLocker native module execution errors
  swcMinify: false,
};

export default withNextIntl(nextConfig);