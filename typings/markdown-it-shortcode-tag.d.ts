import type MarkdownIt from "markdown-it";

declare module "markdown-it-shortcode-tag" {
    export default function shortcode_plugin(md: MarkdownIt, shortcodes: Record<string, Shortcode>, options: ShortcodePluginOptions);
}

interface Shortcode {
    render: (attrs: Record<string, any>, env: Record<string, string>) => string;
    inline?: boolean;
}

interface ShortcodePluginOptions {
    interpolator?: (expr: string, env: Record<string, string>) => string
}
