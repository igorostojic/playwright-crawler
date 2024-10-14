import fs from "fs";

export async function writeTxtFile(pageIndex: number, jsonParsed: string) {
  fs.writeFile(
    `crawler-app/parsed/results-${pageIndex}.json`,
    "{ " + jsonParsed + " }",
    (err) => {
      if (err) {
        console.log("File was not written: " + err);
      } else {
        console.log("Successfully wrote a file!");
      }
    }
  );
}
