import { slugify, execCmd } from '../helper';

it("slugifies strings correctly", () => {
  const str = "To ße Sluğified";
  const expectedSlug = "to_sse_slugified";
  const slug = slugify(str);

  expect(slug).toEqual(expectedSlug);
});

it("throws an error for invalid cmd", async () => {
  const invalidCmd = "Invalid Cmd";
  await expect(execCmd([invalidCmd], "This will not run")).rejects.toThrow();
});
