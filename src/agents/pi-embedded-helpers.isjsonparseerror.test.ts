import { describe, expect, it } from "vitest";
import { isJsonParseStreamError } from "./pi-embedded-helpers.js";

describe("isJsonParseStreamError", () => {
  it("detects 'Bad control character in string literal' errors", () => {
    expect(
      isJsonParseStreamError(
        "Bad control character in string literal in JSON at position 122 (line 1 column 123)",
      ),
    ).toBe(true);
  });

  it("detects 'Bad control character' at various positions", () => {
    expect(
      isJsonParseStreamError("Bad control character in string literal in JSON at position 131"),
    ).toBe(true);
    expect(
      isJsonParseStreamError(
        "Bad control character in string literal in JSON at position 156 (line 1 column 157)",
      ),
    ).toBe(true);
  });

  it("detects 'Unexpected token' JSON parse errors", () => {
    expect(isJsonParseStreamError("Unexpected token in JSON at position 42")).toBe(true);
  });

  it("detects 'Unexpected end of JSON' errors", () => {
    expect(isJsonParseStreamError("Unexpected end of JSON input")).toBe(true);
  });

  it("detects 'invalid character' JSON errors", () => {
    expect(isJsonParseStreamError("invalid character in JSON body")).toBe(true);
  });

  it("returns false for empty input", () => {
    expect(isJsonParseStreamError("")).toBe(false);
  });

  it("returns false for unrelated error messages", () => {
    expect(isJsonParseStreamError("rate_limit exceeded")).toBe(false);
    expect(isJsonParseStreamError("Authentication failed")).toBe(false);
    expect(isJsonParseStreamError("context_overflow")).toBe(false);
  });

  it("is case-insensitive", () => {
    expect(
      isJsonParseStreamError("BAD CONTROL CHARACTER IN STRING LITERAL IN JSON AT POSITION 42"),
    ).toBe(true);
  });
});
