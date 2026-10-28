import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

describe("V8.1 / v8.2 design tokens", () => {
  it("drops in the seven-colour denim palette and semantic page/panel", () => {
    expect(css).toContain("--g8-raw:    #18324E");
    expect(css).toContain("--g8-denim:  #315C80");
    expect(css).toContain("--g8-wash:   #8AAABD");
    expect(css).toContain("--g8-tag:    #B52A36");
    expect(css).toContain("--g8-cotton: #F5F1E8");
    expect(css).toContain("--g8-ink:    #14202B");
    expect(css).toContain("--g8-mist:   #DFE8EE");
    expect(css).toContain("--page:      var(--g8-mist)");
    expect(css).toContain("--panel:     var(--g8-cotton)");
    expect(css).toContain("--action:    var(--g8-tag)");
    expect(css).toContain('"Manrope"');
  });

  it("does not ship retired stitch colours", () => {
    expect(css).not.toMatch(/--g8-thread|#C89A62|#A5763F|#c46a2b/i);
  });
});
