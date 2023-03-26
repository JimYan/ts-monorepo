// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import { test } from "./book";

describe("Book Store Spec", () => {
  it("should be 42", () => {
    expect(1).toEqual(1);
  });
});

describe("Book Store Test", () => {
  it("1 + 2 should be 3", () => {
    expect(test(2)).toEqual(3);
  });
});
